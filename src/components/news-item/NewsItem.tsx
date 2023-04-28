import * as React from 'react';

import { editDate } from '../../utils/editDate';
import { Link, useParams } from 'react-router-dom';
import { CommentsTree } from '../comments/Comments';

import styles from './styles.module.css';
import { fetchComments } from '../../services/comments';

export interface INewsItemProps {
  newsItem: INewsItem,
}

export function NewsItem({ newsItem }: INewsItemProps) {
  const [date] = React.useState<string>(editDate(newsItem.time));
  const { id } = useParams();
  const [comments, setComments] = React.useState<ICommentItem[] | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (newsItem.kids) {
      fetchComments(newsItem.kids).then((res) => setComments(res));
    }
  }, [newsItem.kids])

  function refreshComments() {
    setLoading(true)

    if (newsItem.kids) {
      fetchComments(newsItem.kids).then((res) => {
        setLoading(false)
        setComments(res)
      })
    } else {
      setTimeout(() => setLoading(false), 1000)
    }
  }

  return (
    <div className={id ? styles.newsFullItem : styles.newsItem}>
      <div className={styles.flex}>
        <h2 className={styles.title}>
          {newsItem.title}
        </h2>

        <h3 className={styles.author}>

          {newsItem.by}
          <div className={styles.date}>{date}</div>
        </h3>
      </div>

      {id && <div >
        <Link className={styles.button} to='/'>
          BackPage
        </Link>

        <a className={styles.button} href={`${newsItem.url}`}>Link to news</a>

        <button onClick={refreshComments} className={styles.button}>Refresh comments</button>
      </div>}



      <div className={styles.flex}>
        {!id && <div className={styles.rating}> rating {newsItem.score}</div>}
        {!id ? `comments ${newsItem.descendants}` : comments ?
          <div>
            <CommentsTree comments={comments} loading={loading} />
          </div> : !loading ? <p className={styles.commentsEmpty}>
            Comments is empty
          </p> : <h1>Refreshing comments...</h1>}
      </div>
    </div>
  );
}

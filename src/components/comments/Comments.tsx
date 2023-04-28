import * as React from 'react';

import { fetchComments } from '../../services/comments';

import styles from './styles.module.css';
import { editDate } from '../../utils/editDate';


export interface ICommentsProps {
  comments: ICommentItem[],
  loading: boolean
}

function Comment({ comment }: { comment: ICommentItem }) {
  const [kids, setKids] = React.useState<ICommentItem[] | null>(null);
  const [open, setOpen] = React.useState(true);
  const [date] = React.useState<string>(editDate(comment.time));
  const [loading, setLoading] = React.useState<boolean>(false);

  const getKids = React.useCallback((ids: number[]) => {
    setLoading(true)
    fetchComments(ids).then((res) => {
      setKids(res)
      setLoading(false)
    });
  }, [setKids]);

  const handleClick = React.useCallback(() => {
    if (comment.kids) {
      getKids(comment.kids);
      setOpen(prev => !prev)
    }
  }, [comment.kids, getKids]);

  if (comment.deleted) {
    return <div className={styles.comment} style={{ color: 'red' }}>
      Sorry, this comment is deleted
    </div>
  }

  return (
    <div className={styles.comment}>
      <h3 className={styles.authorTitle}>
        author: <span className={styles.author}>{comment.by}</span>
      </h3>
      <p dangerouslySetInnerHTML={{ __html: comment.text }} className={styles.text} />
      <p className={styles.time}>
        date: {date}
      </p>

      {comment.kids && open && (
        <button className={styles.button} onClick={handleClick}>answers: {comment.kids.length}</button>
      )}

      {loading && <div className={styles.loading}>loading answers...</div>}

      {comment.kids && kids && (
        <div>
          {kids.map((item) => (
            <div style={{ marginLeft: '20px' }} key={item.id}>
              <Comment comment={item} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export function CommentsTree({ comments, loading }: ICommentsProps) {
  if (loading) {
    return <h1>Refreshing comments...</h1>
  }

  if (comments) {
    return (
      <>
        {comments.map((comment) => (
          <div key={comment.id}>
            <Comment comment={comment} />
          </div>
        ))}
      </>
    );
  }

  return <h1>Loading comments</h1>
}

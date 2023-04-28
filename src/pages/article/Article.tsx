import * as React from 'react';
import { useParams } from 'react-router-dom';
import { fetchData } from '../../services/articles';
import { NewsItem } from '../../components/news-item/NewsItem';
import { Preloader } from '../../components/preloader/preloader';

import styles from './styles.module.css';

export default function Article() {
  const { id } = useParams();
  const [article, setArticle] = React.useState<INewsItem | null>(null);

  React.useEffect(() => {
    if (id) {
      fetchData(id).then((res) => {
        if (res) {
          setArticle(res)
        }
      })
    }
  }, [id])

  if (!article) {
    return <Preloader />
  }

  return (
    <main className={styles.articleWrapper}>
      <NewsItem newsItem={article} />
    </main>
  );
}

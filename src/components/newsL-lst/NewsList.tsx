import { NewsItem } from '../news-item/NewsItem';
import { Link } from 'react-router-dom';

import styles from './styles.module.css';

export interface INewsListProps {
  newsItem: INewsItem[],
}

export default function NewsList({ newsItem }: INewsListProps) {
  return (
    <main>
      {newsItem.map((item) => {
        return (
          <Link className={styles.link} to={`/${item.id}`} key={item.id}>
            <NewsItem key={item.id} newsItem={item} />
          </Link>
        )
      })}
    </main>
  );
}

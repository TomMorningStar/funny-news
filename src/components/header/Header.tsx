import * as React from 'react';
import { fetchData } from '../../services/articles';

import styles from './styles.module.css';

export interface IHeaderProps {
  makeNews: React.Dispatch<React.SetStateAction<INewsItem[] | null>>,
  loadingNews: boolean,
  setLoadingNews: React.Dispatch<React.SetStateAction<boolean>>
}

export function Header({ makeNews, loadingNews, setLoadingNews }: IHeaderProps) {
  const makeNewsOnClick = () => {
    setLoadingNews(true)

    fetchData()
      .then((res) => {
        if (res) {
          makeNews(res)
          setLoadingNews(false)
        }
      }).catch((error) => {
        console.error(error)
      })
  }

  return (
    <header className={styles.header}>
      <div className={styles.flex}>
        {loadingNews && <div className={styles.refreshing}>Refreshing...</div>}
        <div className={styles.buttonContainer}>
          <button onClick={makeNewsOnClick} className={styles.button}>Refresh</button>
        </div>
      </div>
    </header>
  );
}

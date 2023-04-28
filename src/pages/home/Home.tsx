import * as React from 'react';

import NewsList from '../../components/newsL-lst/NewsList';
import { Header } from '../../components/header/Header';
import { fetchData } from '../../services/articles';
import { Preloader } from '../../components/preloader/preloader';

export function Home() {
  const [newsItems, setNewsItems] = React.useState<null | INewsItem[]>(null);
  const [loadingNews, setLoadingNews] = React.useState<boolean>(false);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setLoadingNews(true)

      fetchData().then((res) => {
        if (res) {
          setNewsItems(res)
          setLoadingNews(false)
        }
      })
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  if (!newsItems) {
    fetchData()
      .then((res) => setNewsItems(res ? res : null))
    return <Preloader />
  }

  return (
    <>
      <Header makeNews={setNewsItems} loadingNews={loadingNews} setLoadingNews={setLoadingNews} />
      <NewsList newsItem={newsItems} />
    </>
  );
}

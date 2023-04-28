const baseUrl = 'https://hacker-news.firebaseio.com';
const limit = 100;

export const fetchData = async (id?: string) => {
  if (id) {
    const article = fetch(`${baseUrl}/v0/item/${id}.json`)
      .then(data => data.json())
      .catch((error) => console.error(error))

    return article
  }

  const articleIds: number[] = await fetch(`${baseUrl}/v0/newstories.json?print=pretty&orderBy="$key"&limitToFirst=${limit}`)
    .then(data => data.json())
    .catch((error) => console.error(error))

  if (articleIds) {
    const articles: INewsItem[] = await Promise.all(
      articleIds.map(articleId => {
        return fetch(`${baseUrl}/v0/item/${articleId}.json`)
          .then(data => data.json())
          .catch((error) => console.error(error))
      })
    );
    return articles
  }
}

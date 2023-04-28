const baseUrl = 'https://hacker-news.firebaseio.com';

export const fetchComments = async (kids: number[]) => {

  const comments: ICommentItem[] = await Promise.all(
    kids.map(comment => {
      return fetch(`${baseUrl}/v0/item/${comment}.json?print=pretty`)
        .then(data => data.json())
        .catch((error) => console.error(error))
    })
  );

  return comments
}

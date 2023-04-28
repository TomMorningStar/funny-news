declare global {
  export type INewsItem = {
    by: string,
    descendants: number,
    id: number,
    score: number,
    time: number,
    kids: ?number[]
    title: string,
    type: string,
    url: string
  }

  export type ICommentItem = {
    by: string,
    id: number,
    kids: ?number[],
    parent: number,
    text: string,
    time: number,
    type: string,
    deleted?: boolean
  }
}

export { };

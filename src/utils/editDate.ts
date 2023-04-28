export const editDate = (date: number): string => {
  const dateFormat = new Date(date * 1000);
  const result = `${dateFormat.getDate()}.${dateFormat.getMonth() + 1}.${dateFormat.getFullYear()}`;
  return result;
}

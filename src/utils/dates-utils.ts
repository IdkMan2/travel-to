export function unixTimestampToDateFormat(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleDateString('pl-pl', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
}

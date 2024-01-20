import QueryString from 'query-string';

export function getTokenFromQuery(): string {
  const queries = QueryString.parse(window.location.search);
  if (!queries.token) {
    throw new Error('Token not present in the query body');
  }
  return queries.token as string;
}

export default getTokenFromQuery;

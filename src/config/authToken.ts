import * as QueryString from 'query-string';

export default function getTokenFromQuery(): string {
    const queries: { token: string } = QueryString.parse(location.search);
    if (!queries.token) {
        throw new Error("Token not present in the query body");
    }
    return queries.token;
}

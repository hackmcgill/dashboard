export interface ISearchOptions {
  sort?: 'asc' | 'desc';
  page?: number;
  limit?: number;
  sort_by?: string;
  expand?: boolean;
}

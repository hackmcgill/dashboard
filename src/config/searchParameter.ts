export enum StringOperations {
  EQUALS = 'equals',
  NOT_EQUALS = 'ne',
  REGEXP = 'regex',
  IN = 'in',
}
export enum NumberOperations {
  EQUALS = 'equals',
  NOT_EQUALS = 'ne',
  GREATER_THAN_OR_EQUAL = 'gte',
  LESS_THAN_OR_EQUAL = 'lte',
  GREATER_THAN = 'gt',
  LESS_THAN = 'lt',
  IN = 'in',
}
export enum BooleanOperations {
  EQUALS = 'equals',
  NOT_EQUALS = 'ne',
}
export interface ISearchParameter {
  parameter: string;
  operation: StringOperations | NumberOperations | BooleanOperations;
  value: string | boolean | number;
}

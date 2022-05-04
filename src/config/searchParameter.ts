export enum StringOperations {
  EQUALS = '=',
  NOT_EQUALS = '!=',
  REGEXP = 'regex',
  IN = 'IN',
}
export enum NumberOperations {
  EQUALS = '=',
  NOT_EQUALS = '!=',
  GREATER_THAN_OR_EQUAL = '>=',
  LESS_THAN_OR_EQUAL = '<=',
  GREATER_THAN = '>',
  LESS_THAN = '<',
  IN = 'IN',
}
export enum BooleanOperations {
  EQUALS = '=',
  NOT_EQUALS = '!=',
}
export interface ISearchParameter {
  param: string;
  operation: StringOperations | NumberOperations | BooleanOperations;
  value: string | boolean | number | string[] | number[];
}

export function isValidSearchParameter(parameter: any) {
  if (!parameter) {
    return false;
  }
  const { param, operation, value } = parameter;
  if (param && typeof param === 'string' && operation && value) {
    return true;
  }
  return false;
}

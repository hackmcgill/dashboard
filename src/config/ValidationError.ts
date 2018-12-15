export interface IValidationError {
  status: number;
  message: string;
  data: {
    [id: string]: IValidationErrorItem;
  };
}

export interface IValidationErrorItem {
  location: string;
  param: string;
  msg: string;
}

export function instanceOfIValidationErrorItem(
  object: any
): object is IValidationErrorItem {
  if (typeof object === 'object') {
    return 'location' in object && 'param' in object && 'msg' in object;
  } else {
    return false;
  }
}

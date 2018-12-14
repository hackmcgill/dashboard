// import * as React from 'react';
import { IValidationError, IValidationErrorItem, instanceOfIValidationErrorItem } from 'src/config';
import { toast } from 'react-toastify';
import { APIResponse } from 'src/api';

export default function ValidationErrorGenerator(response: APIResponse<IValidationError>) {
    if (!response) {
        return;
    }
    const errors = response.data;
    toast.error(response.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: false
    });

    for (const key in errors) {
        // check if the property/key is defined in the object itself, not in parent
        if (errors.hasOwnProperty(key) && instanceOfIValidationErrorItem(errors[key])) {
            toast.error(validationErrorItem(key, errors[key]), {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: false
            });
        }
    }
}
function validationErrorItem(key: string, errorItem: IValidationErrorItem) {
    return `Invalid ${key}: ${errorItem.msg}`;
}


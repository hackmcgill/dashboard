import { IValidationError, IValidationErrorItem, instanceOfIValidationErrorItem } from '../config';
import { toast } from 'react-toastify';
import { APIResponse } from '../api';
import 'react-toastify/dist/ReactToastify.css';

export default function ValidationErrorGenerator(response: APIResponse<IValidationError>) {
    if (!response) {
        return;
    }
    const errors: any = response.data;
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

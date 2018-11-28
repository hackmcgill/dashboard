import { debounce } from 'lodash';
import { FieldProps } from 'formik';

function DebouncedUpdate(props: FieldProps, delay: number) {
    return debounce((value: any) => {
        const field = props.field;
        const form = props.form;
        form.setFieldValue(field.name, value);
    }, delay);
}

export default DebouncedUpdate;
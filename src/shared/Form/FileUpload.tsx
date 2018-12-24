import { FieldProps } from 'formik';
import * as React from 'react';
import { FileInput } from './';

interface IUploadComponent {
  placeholder?: string;
}

export const FileUpload: React.StatelessComponent<
  IUploadComponent & FieldProps
> = (props) => {
  const placeholder = props.placeholder ? props.placeholder : '';
  return (
    <FileInput
      type="file"
      placeholder={placeholder}
      onChange={handleChange(props)}
    />
  );
};
/**
 * Function factory that generates function to handle changes in user's choice.
 * @param props The props passed into the Textarea component.
 * @returns the function that handles changes to the choices provided by the user.
 */
function handleChange(
  props: IUploadComponent & FieldProps
): (event: React.ChangeEvent<HTMLInputElement>) => void {
  return (event: React.ChangeEvent<HTMLInputElement>) => {
    const field = props.field;
    const form = props.form;
    if (event.target.files) {
      form.setFieldValue(field.name, event.target.files[0]);
    } else {
      form.setFieldValue(field.name, null);
    }
  };
}

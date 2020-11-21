import { FieldProps } from 'formik';
import { useState } from 'react';
import * as React from 'react';
import Dropzone from 'react-dropzone';
import { toast } from 'react-toastify';
import Upload from '../../assets/images/upload.svg';
import theme from '../Styles/theme';

interface IUploadComponent {
  placeholder?: string;
}

export const FileUpload: React.StatelessComponent<
  IUploadComponent & FieldProps
> = (props) => {
  const [fileName, setFileName] = useState('');
  const onUpload = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFileName(acceptedFiles[0].name);
      handleChange(props)(acceptedFiles);
    } else {
      toast.error('Invalid file!');
    }
  };
  return (
    <Dropzone
      onDrop={onUpload}
      multiple={false}
      maxSize={1000000}
      accept={'.pdf'}
    >
      {({ getRootProps, getInputProps }) => (
        <section
          style={{
            width: 'min(100vw, 960px)',
            height: '280px',
            border: '4px dashed #BCBCBC',
            borderRadius: '8px',
            boxSizing: 'border-box',
          }}
        >
          <div
            {...getRootProps()}
            style={{ textAlign: 'center', height: '100%' }}
          >
            <input {...getInputProps()} />
            <div
              style={{
                position: 'relative',
                transform: 'translateY(-50%)',
                top: '50%',
              }}
            >
              <img src={Upload} alt={'upload'} />
              <p>Drag and drop or click here to upload</p>
              <p style={{ color: theme.colors.black30 }}>
                {fileName || 'You can upload 1 PDF file up to 1MB'}
              </p>
            </div>
          </div>
        </section>
      )}
    </Dropzone>
  );
};
/**
 * Function factory that generates function to handle changes in user's choice.
 * @param props The props passed into the Textarea component.
 * @returns the function that handles changes to the choices provided by the user.
 */
function handleChange(props: IUploadComponent & FieldProps) {
  return (files: File[]) => {
    const field = props.field;
    const form = props.form;
    if (files) {
      form.setFieldValue(field.name, files[0]);
    } else {
      form.setFieldValue(field.name, null);
    }
  };
}

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
  const [fileName, setFileName] = useState(
    props.field.value != null ? props.field.value.name : ''
  );
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
      maxSize={4000000}
      accept={'.pdf'}
    >
      {({ getRootProps, getInputProps }) => (
        <section className="drop-zone">
          <div {...getRootProps()} className="container">
            <input {...getInputProps()} />
            <div className="drop-content">
              <img src={Upload} className="art" alt="upload" />
              <div className="title">Drag and drop or click here to upload</div>
              <div className="subtitle">
                {fileName || 'You can upload a PDF file up to 4MB'}
              </div>
            </div>
          </div>
          <style jsx>{`
            .container {
              text-align: center;
              height: 100%;
            }

            .container:focus {
              outline: none;
            }
            
            .drop-zone {
              width: min(100vw, 960px);
              height: 280px;
              border: 4px dashed ${theme.colors.black20};
              border-radius: 8px;
              box-sizing: border-box;
              cursor: pointer;
              transition: border-color 0.3s;
            }

            .art {
              margin-top: 8px;
              margin-bottom: 16px;
              opacity: 0.6;
              filter: invert(89%) sepia(11%) saturate(2206%) hue-rotate(187deg) brightness(98%) contrast(109%);
              transition: opacity 0.3s;
            }

            .title {
              margin-bottom: 8px;
              font-family: ${theme.fonts.header};
              color: ${theme.colors.black80};
            }
            
            .subtitle {
              font-family: ${theme.fonts.header};
              color: ${theme.colors.black40};
            }
            
            .drop-content {
              position: relative;
              transform: translateY(-50%);
              top: 50%;
            }

            .drop-zone:hover {
              filter: none;
              border-color: ${theme.colors.purple}66;
            }

            .drop-zone:hover .art {
              opacity: 1;
            }
          `}</style>
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

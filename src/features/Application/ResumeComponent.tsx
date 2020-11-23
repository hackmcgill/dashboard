import { Box } from '@rebass/grid';
import { FieldProps } from 'formik';
import * as React from 'react';
import ViewPDFComponent from '../../shared/Elements/ViewPDF';
import { FileUpload, Label, LabelText } from '../../shared/Form';
import { ManageApplicationModes } from './ManageApplicationForm';

export interface IResumeProps {
  label: string;
  mode: ManageApplicationModes;
  hackerId: string;
  value?: boolean;
  required?: boolean;
}
const ResumeComponent: React.FC<IResumeProps & FieldProps> = (props) => {
  const viewResume = <ViewPDFComponent {...props} />;
  return (
    <div style={{ marginBottom: '32px' }}>
      <Box mb={'8px'}>
        <Label>
          <LabelText label={props.label} required={props.required} />
        </Label>
      </Box>
      {
        props.mode === ManageApplicationModes.EDIT ?
          <Box mt="16px" mb="16px">{viewResume}</Box> :
          null
      }
      <FileUpload {...props} />
    </div>
  );
};
export { ResumeComponent };
export default ResumeComponent;

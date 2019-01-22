import { Box, Flex } from '@rebass/grid';
import { FieldProps } from 'formik';
import * as React from 'react';
import ViewPDFComponent from '../shared/Elements/ViewPDF';
import { FileUpload, Label, LabelText } from '../shared/Form';
import { ManageApplicationModes } from './ApplicationManagement';

export interface IResumeProps {
  label: string;
  mode: ManageApplicationModes;
  hackerId: string;
  value?: boolean;
  required?: boolean;
}
const ResumeComponent: React.StatelessComponent<IResumeProps & FieldProps> = (
  props
) => {
  const viewResume = <ViewPDFComponent {...props} />;
  return (
    <Flex mb={'20px'}>
      <Box>{props.mode === ManageApplicationModes.EDIT && viewResume}</Box>
      <Box>
        <Label>
          <LabelText label={props.label} required={props.required} />
          <FileUpload {...props} />
        </Label>
      </Box>
    </Flex>
  );
};
export { ResumeComponent };
export default ResumeComponent;

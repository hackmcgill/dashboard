import { Box, Flex } from '@rebass/grid';
import { FieldProps } from 'formik';
import * as React from 'react';
import { Label, FileUpload } from '../shared/Form';
import { ManageApplicationModes } from './ApplicationManagement';
import ViewPDFComponent from '../shared/Elements/ViewPDF';

export interface IResumeProps {
  label: string;
  mode: ManageApplicationModes;
  hackerId: string;
  value?: boolean;
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
          <span>{props.label}</span>
          <FileUpload {...props} />
        </Label>
      </Box>
    </Flex>
  );
};
export default ResumeComponent;

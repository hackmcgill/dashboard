import { Box, Flex } from '@rebass/grid';
import { FieldProps } from 'formik';
import * as React from 'react';
import ViewPDFComponent from '../../shared/Elements/ViewPDF';
import { FileUpload, Label, LabelText } from '../../shared/Form';
import { ManageApplicationModes } from './ManageApplicationContainer';

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
      <Box>
        <Label>
          <LabelText label={props.label} required={props.required} />
          <div style={{ marginLeft: '-10px' }}>
            <FileUpload {...props} />
          </div>
        </Label>
      </Box>
      <Box>{props.mode === ManageApplicationModes.EDIT && viewResume}</Box>
    </Flex>
  );
};
export { ResumeComponent };
export default ResumeComponent;

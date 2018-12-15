import { Box, Flex } from '@rebass/grid';
import { FieldProps } from 'formik';
import * as React from 'react';
import { Label } from '../shared';
import { ManageApplicationModes } from './applicationComponent';
import FileUploadComponent from './fileUploadComponent';
import ViewPDFComponent from './viewPDFComponent';

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
            <Box>
                {props.mode === ManageApplicationModes.EDIT && viewResume}
            </Box>
            <Box>
                <Label>
                    <span>{props.label}</span>
                    <FileUploadComponent {...props} />
                </Label>
            </Box>
        </Flex>
    );
};
export default ResumeComponent;

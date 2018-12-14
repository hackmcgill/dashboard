

import * as React from 'react';
import { Label } from 'src/shared';
import { FieldProps } from 'formik';
import FileUploadComponent from './fileUploadComponent';
import { ManageApplicationModes } from './applicationComponent';
import ViewPDFComponent from './viewPDFComponent';
import { Flex, Box } from '@rebass/grid';

export interface IResumeProps {
    label: string;
    mode: ManageApplicationModes;
    hackerId: string;
    value?: boolean;
}
const ResumeComponent: React.StatelessComponent<IResumeProps & FieldProps> = (props) => {
    const viewResume = <ViewPDFComponent {...props} />;
    return (
        <Flex mb={'20px'}>
            <Box>
                {(props.mode === ManageApplicationModes.EDIT) && viewResume}
            </Box>
            <Box>
                <Label>
                    <span>{props.label}</span>
                    <FileUploadComponent {...props} />
                </Label>
            </Box>
        </Flex>
    )
}
export default ResumeComponent;

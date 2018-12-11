

import * as React from 'react';
import Label from 'src/shared/Label';
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
        <Flex>
            {(props.mode === ManageApplicationModes.EDIT) && viewResume}
            <Label>
                <span>{props.label}</span>
                <Flex flexDirection={'column'}>
                    <Box>
                        <Label>
                            <FileUploadComponent {...props} />
                        </Label>
                    </Box>
                </Flex>
            </Label>
        </Flex>
    )
}
export default ResumeComponent;

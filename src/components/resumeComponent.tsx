

import * as React from 'react';
import Label from 'src/shared/Label';
import { FieldProps } from 'formik';
import FileUploadComponent from './fileUploadComponent';
import { RESUME_REQUEST_LABEL } from 'src/config/constants';
import { ManageApplicationModes } from './applicationComponent';
import DownloadResumeComponent from './downloadResumeComponent';
import { Flex, Box } from '@rebass/grid';

export interface IResumeProps {
    label: string;
    mode: ManageApplicationModes;
    hackerId: string;
    value?: boolean;
}
const ResumeComponent: React.StatelessComponent<IResumeProps & FieldProps> = (props) => {
    console.log(props);
    const viewResume = (props.mode === ManageApplicationModes.EDIT) ?
        (<Box>
            <DownloadResumeComponent {...props} />
        </Box>) : '';
    return (
        <Label>
            <span>{props.label}</span>
            <Flex>
                {viewResume}
                <Box>
                    <Label>
                        <span>{RESUME_REQUEST_LABEL}</span>
                        <FileUploadComponent {...props} />
                    </Label>
                </Box>
            </Flex>

        </Label>
    )
}
export default ResumeComponent;

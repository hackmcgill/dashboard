import * as React from 'react';
import { AxiosResponse } from 'axios';
import { Formik, Field, FormikActions, FormikProps } from 'formik';
import { Flex, Box } from '@rebass/grid'

import * as CONSTANTS from 'src/config/constants';


import Account from 'src/api/account';
import Hacker from 'src/api/hacker';
import { IAccount, IHacker } from 'src/config/userTypes';
import HackerStatus from 'src/config/hackerStatus';
import SchoolComponent from 'src/components/schoolComponent';
import GenderComponent from 'src/components/genderInputComponent';
import CheckboxComponent from 'src/components/checkboxComponent';
import LinkComponent from 'src/components/linkComponent';

import Button from 'src/shared/Button';
import jobInterestComponent from './jobInterestComponent';
// const hackerSchema = {

// }


const CreateApplicationForm: React.StatelessComponent<{}> = ({ }) => {
    return (
        <Formik
            initialValues={{
                school: '',
                gender: '',
                needsBus: false,
                github: '',
                dropler: '',
                linkedIn: '',
                personal: '',
                other: '',
            }}
            onSubmit={handleSubmit}
            render={renderFormik}
        // validationSchema={hackerSchema}
        />
    )
}

function renderFormik(props: FormikProps<any>): JSX.Element {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field
                id='schoolName'
                name={'school'}
                component={SchoolComponent}
            />
            <Field
                id='gender'
                name={'gender'}
                component={GenderComponent}
            />
            <Field
                id='needsBus'
                name={'bus'}
                component={CheckboxComponent}
                label={CONSTANTS.BUS_REQUEST_LABEL}
            />
            <Field
                id='github'
                name={'github'}
                component={LinkComponent}
                label={CONSTANTS.GITHUB_LINK_LABEL}
                placeholder={CONSTANTS.GITHUB_LINK_PLACEHOLDER}
            />
            <Field
                id='dropler'
                name={'dropler'}
                component={LinkComponent}
                label={CONSTANTS.DROPLER_LINK_LABEL}
                placeholder={CONSTANTS.DROPLER_LINK_PLACEHOLDER}
            />
            <Field
                id='linkedIn'
                name={'linkedIn'}
                component={LinkComponent}
                label={CONSTANTS.LINKEDIN_LINK_LABEL}
                placeholder={CONSTANTS.LINKEDIN_LINK_PLACEHOLDER}
            />
            <Field
                id='personal'
                name={'personal'}
                component={LinkComponent}
                label={CONSTANTS.PERSONAL_LINK_LABEL}
                placeholder={CONSTANTS.PERSONAL_LINK_PLACEHOLDER}
            />
            <Field
                id='other'
                name={'other'}
                component={LinkComponent}
                label={CONSTANTS.OTHER_LINK_LABEL}
                placeholder={CONSTANTS.OTHER_LINK_PLACEHOLDER}
            />
            <Field
                id='jobInterest'
                name={'jobInterest'}
                component={jobInterestComponent}
                placeholder={CONSTANTS.JOBINTEREST_REQUEST_LABEL}
            />
            {/* <Field id='skills' name={'skills'} component={} />
            <Field id='comments' name={'comments'} component={} />
            <Field id='essay' name={'essay'} component={} />
            <Field id='team' name={'team'} component={} /> */}
            <Flex justifyContent={'center'}>
                <Box>
                    <Button type='button' disabled={props.isSubmitting}>Submit</Button>
                </Box>
            </Flex>
        </form>
    );
}

async function handleSubmit(values: any, actions: FormikActions<any>) {
    const acctResponse: AxiosResponse<IAccount> = await Account.getSelf();
    if (acctResponse.status !== 200) {
        console.error("Error while getting current user");
        return;
    }
    const hackerResponse: AxiosResponse<IHacker> = await Hacker.create(
        {
            id: "",
            accountId: acctResponse.data.id,
            status: HackerStatus.HACKER_STATUS_NONE,
            school: values.school,
            gender: values.gender,
            needsBus: values.needsBus,
            application: values.application
        });
    if (hackerResponse.status !== 200) {
        console.error("Error while creating account");
        return;
    }
    const resumeResponse: AxiosResponse = await Hacker.uploadResume(values.resumeFile, hackerResponse.data.id);
    if (resumeResponse.status !== 200) {
        console.error("Could not upload resume properly");
    } else {
        console.log("Uploaded application properly!");
    }
}

export default CreateApplicationForm
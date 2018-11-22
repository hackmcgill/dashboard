import * as React from 'react';
import { AxiosResponse } from 'axios';
import { Formik, Field, FormikActions, FormikProps } from 'formik';
import { Flex, Box } from '@rebass/grid'

import Account from 'src/api/account';
import Hacker from 'src/api/hacker';
import { IAccount, IHacker } from 'src/config/userTypes';
import HackerStatus from 'src/config/hackerStatus';
import SchoolComponent from 'src/components/schoolComponent';
import GenderComponent from 'src/components/genderInputComponent';
import CheckboxComponent from 'src/components/checkboxComponent';
import LinkComponent from 'src/components/linkComponent';

import Button from 'src/shared/Button';
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
                component={SchoolComponent} />
            <Field
                id='gender'
                name={'gender'}
                component={GenderComponent} />
            <Field
                id='needsBus'
                name={'bus'}
                component={CheckboxComponent}
                label={'Do you need a bus?'}
            />
            <Field
                id='github'
                name={'github'}
                component={LinkComponent}
                label='GitHub Username'
                placeholder='https://www.github.com/'
            />
            <Field
                id='dropler' name={'dropler'}
                component={LinkComponent}
                label='Dropler Username'
                placeholder='https://droplr.com/'
            />
            <Field
                id='linkedIn'
                name={'linkedIn'}
                component={LinkComponent}
                label='linkedIn'
                placeholder='http://linkedin.com/in/'
            />
            <Field
                id='personal'
                name={'personal'}
                component={LinkComponent}
                label='Personal'
                placeholder='your website here...'
            />
            <Field
                id='other'
                name={'other'}
                component={LinkComponent}
                label='other'
                placeholder='anything else!'
            />
            {/* <Field id='jobInterest' name={'jobInterest'} component={} />
            <Field id='skills' name={'skills'} component={} />
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
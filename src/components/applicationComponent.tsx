import * as React from 'react';
import { AxiosResponse } from 'axios';
import { Formik, Field, FormikActions, FormikProps } from 'formik';
import { Flex, Box } from '@rebass/grid'
import * as Yup from "yup";

import * as CONSTANTS from 'src/config/constants';

import ErrorMessage from 'src/shared/ErrorMessage';

import Account from 'src/api/account';
import Hacker from 'src/api/hacker';
import { IAccount, IHacker } from 'src/config/userTypes';
import HackerStatus from 'src/config/hackerStatus';
import SchoolComponent from 'src/components/schoolComponent';
import GenderComponent from 'src/components/genderInputComponent';
import CheckboxComponent from 'src/components/checkboxComponent';
import InputFormikComponent from 'src/components/InputFormikComponent';
import NumberFormat from 'src/components/numberFormatFormikComponent';

import Button from 'src/shared/Button';
import jobInterestComponent from './jobInterestComponent';
import SkillsComponent from './skillsComponent';
import TextareaComponent from './textAreaComponent';
import FileUploadComponent from './fileUploadComponent';
import APIResponse from 'src/api/APIResponse';
import EthnicityComponent from './ethnicityComponent';


const hackerSchema = Yup.object().shape({
    school: Yup.string()
        .min(1, 'Select a school')
        .required('Required'),
    github: Yup.string().url('Must be a valid url').required(),
    dropler: Yup.string().url('Must be a valid url'),
    linkedIn: Yup.string().url('Must be a valid url'),
    personal: Yup.string().url('Must be a valid url'),
    other: Yup.string().url('Must be a valid url'),
    jobInterest: Yup.string().required(),
    resumeFile: Yup.mixed()
        .required("A resume is required")
        .test(
            "fileSize",
            "File too large",
            value => value && value.size <= 4000000 // 4MB
        )
        .test(
            "fileFormat",
            "Unsupported Format",
            value => value && value.type === "application/pdf"),
    ethnicity: Yup.array().required('Required'),
    major: Yup.string().required('Required'),
    graduationYear: Yup.number().required('Required').min(2018).max(2025),
    codeOfConduct: Yup.boolean().required('Required')


});



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
                jobInterest: '',
                skills: [],
                ethnicity: '',
                major: '',
                graduationYear: 0,
                codeOfConduct: false

            }}
            onSubmit={handleSubmit}
            render={renderFormik}
            validationSchema={hackerSchema}
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
            <ErrorMessage
                name='school'
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
                inputType='url'
                component={InputFormikComponent}
                label={CONSTANTS.GITHUB_LINK_LABEL}
                placeholder={CONSTANTS.GITHUB_LINK_PLACEHOLDER}
            />
            <ErrorMessage
                name='github'
            />

            <Field
                id='dropler'
                name={'dropler'}
                inputType='url'
                component={InputFormikComponent}
                label={CONSTANTS.DROPLER_LINK_LABEL}
                placeholder={CONSTANTS.DROPLER_LINK_PLACEHOLDER}
            />
            <ErrorMessage
                name='dropler'
            />
            <Field
                id='linkedIn'
                name={'linkedIn'}
                inputType='url'
                component={InputFormikComponent}
                label={CONSTANTS.LINKEDIN_LINK_LABEL}
                placeholder={CONSTANTS.LINKEDIN_LINK_PLACEHOLDER}
            />
            <ErrorMessage
                name='linkedIn'
            />

            <Field
                id='personal'
                name={'personal'}
                inputType='url'
                component={InputFormikComponent}
                label={CONSTANTS.PERSONAL_LINK_LABEL}
                placeholder={CONSTANTS.PERSONAL_LINK_PLACEHOLDER}
            />
            <ErrorMessage
                name='personal'
            />
            <Field
                id='other'
                name={'other'}
                inputType='url'
                component={InputFormikComponent}
                label={CONSTANTS.OTHER_LINK_LABEL}
                placeholder={CONSTANTS.OTHER_LINK_PLACEHOLDER}
            />
            <ErrorMessage
                name='other'
            />
            <Field
                id='jobInterest'
                name={'jobInterest'}
                component={jobInterestComponent}
                placeholder={CONSTANTS.JOBINTEREST_REQUEST_PLACEHOLDER}
            />
            <ErrorMessage
                name='jobInterest'
            />
            <Field
                id='skills'
                name={'skills'}
                component={SkillsComponent}
                placeholder={CONSTANTS.SKILLS_REQUEST_PLACEHOLDER}
            />
            <Field
                id='comments'
                name={'comments'}
                component={TextareaComponent}
                label={CONSTANTS.COMMENTS_REQUEST_LABEL}
            />
            <Field
                id='essay'
                name={'essay'}
                component={TextareaComponent}
                label={CONSTANTS.ESSAY_REQUEST_LABEL}
            />
            <Field
                id='graduationYear'
                name='graduationYear'
                label="Graduation year:"
                placeholder="YYYY"
                format="####"
                component={NumberFormat}
            />
            <ErrorMessage
                name='graduationYear'
            />
            <Field
                id='ethnicity'
                name={'ethnicity'}
                component={EthnicityComponent}
                label={CONSTANTS.ETHNICITY_REQUEST_LABEL}
            />
            <ErrorMessage
                name='ethnicity'
            />
            <Field
                id='major'
                name={'major'}
                inputType='major'
                component={InputFormikComponent}
                label={CONSTANTS.MAJOR_REQUEST_LABEL}
                placeholder={CONSTANTS.MAJOR_PLACEHOLDER}
            />
            <ErrorMessage
                name='major'
            />
            <Field
                id='resumeFile'
                name='resumeFile'
                component={FileUploadComponent}
                label={CONSTANTS.RESUME_REQUEST_LABEL}
            />
            <ErrorMessage
                name='resumeFile'
            />

            <Field
                id='codeOfConduct'
                name={'codeOfConduct'}
                component={CheckboxComponent}
                label={CONSTANTS.COC_REQUEST_LABEL}
            />
            <ErrorMessage
                name='codeOfConduct'
            />

            <Flex justifyContent={'center'}>
                <Box>
                    <Button type='submit'>Submit</Button>
                </Box>
            </Flex>
        </form>
    );
}

async function handleSubmit(values: any, actions: FormikActions<any>) {
    console.log(values);
    const acctResponse: AxiosResponse<APIResponse<IAccount>> = await Account.getSelf();
    if (acctResponse.status !== 200) {
        console.error("Error while getting current user");
        return;
    }
    const account = acctResponse.data.data;

    const hackerResponse: AxiosResponse<APIResponse<IHacker>> = await Hacker.create(
        {
            id: '',
            accountId: account.id,
            status: HackerStatus.HACKER_STATUS_NONE,
            school: values.school,
            gender: values.gender,
            needsBus: values.needsBus,
            application: {
                portfolioURL: {
                    resume: '',
                    github: values.github,
                    dropler: values.dropler,
                    personal: values.personal,
                    linkedIn: values.linkedIn,
                    other: values.other
                },
                jobInterest: values.jobInterest,
                skills: values.skills,
                comments: values.comments,
                essay: values.essay,
            },
            ethnicity: values.ethnicity,
            major: values.major,
            graduationYear: values.graduationYear,
            codeOfConduct: values.codeOfConduct,
        });
    if (hackerResponse.status !== 200) {
        console.error("Error while creating account");
        return;
    }
    const hacker = hackerResponse.data.data;
    const resumeResponse: AxiosResponse<APIResponse<{}>> = await Hacker.uploadResume(values.resumeFile, hacker.id);
    if (resumeResponse.status !== 200) {
        console.error("Could not upload resume properly");
    } else {
        console.log("Uploaded application properly!");
    }
}

export default CreateApplicationForm
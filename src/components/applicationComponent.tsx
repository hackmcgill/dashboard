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
import LinkComponent from 'src/components/linkComponent';

import Button from 'src/shared/Button';
import jobInterestComponent from './jobInterestComponent';
import SkillsComponent from './skillsComponent';
import TextareaComponent from './textAreaComponent';
import FileUploadComponent from './fileUploadComponent';


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
        value => value && value.type === "application/pdf"
        )
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
                component={LinkComponent}
                label={CONSTANTS.GITHUB_LINK_LABEL}
                placeholder={CONSTANTS.GITHUB_LINK_PLACEHOLDER}
            />
            <ErrorMessage
                name='github'
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
                id='resumeFile'
                name='resumeFile'
                component={FileUploadComponent}
                label={CONSTANTS.RESUME_REQUEST_LABEL}
            />
            <ErrorMessage 
                name='resumeFile'
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
    const acctResponse: AxiosResponse<IAccount> = await Account.getSelf();
    if (acctResponse.status !== 200) {
        console.error("Error while getting current user");
        return;
    }
    const hackerResponse: AxiosResponse<IHacker> = await Hacker.create(
        {
            id: '',
            accountId: acctResponse.data.id,
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
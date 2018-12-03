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
import CheckboxComponent from 'src/components/checkboxFormikComponent';
import InputFormikComponent from 'src/components/InputFormikComponent';
import NumberFormat from 'src/components/numberFormatFormikComponent';

import Button from 'src/shared/Button';
import jobInterestComponent from './jobInterestComponent';
import TextareaComponent from './textAreaComponent';
import FileUploadComponent from './fileUploadComponent';
import APIResponse from 'src/api/APIResponse';
import Ethnicity from 'src/config/ethnicity';
import Genders from 'src/config/genders';
import Degrees from 'src/config/degrees';
import StylizedSelectFormikComponent from './StylizedSelectFormikComponent';
import Majors from 'src/config/Majors';
import Skills from 'src/config/skills';
import Form from 'src/shared/Form';
import ValidationErrorGenerator from './ValidationErrorGenerator';


const hackerSchema = Yup.object().shape({
    school: Yup.string()
        .min(1, 'Select a school')
        .required('Required'),
    degree: Yup.string().required(),
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
                degree: '',
                gender: '',
                needsBus: false,
                github: 'https://github.com/',
                dropler: 'https://droplr.com/',
                linkedIn: 'https://linkedin.com/in/',
                personal: '',
                other: '',
                jobInterest: '',
                skills: [],
                ethnicity: '',
                major: '',
                graduationYear: 0,
                codeOfConduct: false

            }}
            onSubmit={handleSubmitSync}
            render={renderFormik}
            validationSchema={hackerSchema}
        />
    )
}

function renderFormik(props: FormikProps<any>): JSX.Element {
    return (
        <Form onSubmit={props.handleSubmit}>
            <Field
                id='schoolName'
                name={'school'}
                component={SchoolComponent}
            />
            <ErrorMessage
                name='school'
            />
            <Field
                id='degree'
                name={'degree'}
                selectId={'degreeSelect'}
                label={CONSTANTS.DEGREE_REQUEST_LABEL}
                placeholder={CONSTANTS.DEGREE_REQUEST_PLACEHOLDER}
                options={[
                    { label: Degrees.UNDERGRADUATE, value: Degrees.UNDERGRADUATE },
                    { label: Degrees.MASTERS, value: Degrees.MASTERS },
                    { label: Degrees.PHD, value: Degrees.PHD },
                    { label: Degrees.HIGHSCHOOL, value: Degrees.HIGHSCHOOL },
                    { label: Degrees.OTHER, value: Degrees.OTHER },
                ]}
                component={StylizedSelectFormikComponent}
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
                id='major'
                name={'major'}
                inputType='major'
                options={Majors}
                isMulti={true}
                component={StylizedSelectFormikComponent}
                label={CONSTANTS.MAJOR_REQUEST_LABEL}
                placeholder={CONSTANTS.MAJOR_PLACEHOLDER}
            />
            <ErrorMessage
                name='major'
            />
            <Field
                id='gender'
                name={'gender'}
                selectId={'genderSelect'}
                label={CONSTANTS.GENDER_REQUEST_LABEL}
                placeholder={CONSTANTS.GENDER_REQUEST_PLACEHOLDER}
                options={[
                    { label: Genders.MALE, value: Genders.MALE },
                    { label: Genders.FEMALE, value: Genders.FEMALE },
                    { label: Genders.PREFER_NOT_TO_SAY, value: Genders.PREFER_NOT_TO_SAY },
                    { label: Genders.NON_BINARY, value: Genders.NON_BINARY },
                ]}
                component={StylizedSelectFormikComponent}
            />
            <Field
                id='ethnicity'
                name={'ethnicity'}
                selectId={'ethnicitySelect'}
                isMulti={true}
                options={[
                    { label: Ethnicity.AFRO_AMER, value: Ethnicity.AFRO_AMER },
                    { label: Ethnicity.ASIAN_PI, value: Ethnicity.ASIAN_PI },
                    { label: Ethnicity.EUROPEAN, value: Ethnicity.EUROPEAN },
                    { label: Ethnicity.HISP, value: Ethnicity.HISP },
                    { label: Ethnicity.NO_ANS, value: Ethnicity.NO_ANS },
                ]}
                label={CONSTANTS.ETHNICITY_REQUEST_LABEL}
                placeholder={CONSTANTS.ETHNICITY_REQUEST_PLACEHOLDER}
                component={StylizedSelectFormikComponent}
            />
            <ErrorMessage
                name='ethnicity'
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
                id='resumeFile'
                name='resumeFile'
                component={FileUploadComponent}
                label={CONSTANTS.RESUME_REQUEST_LABEL}
            />
            <ErrorMessage
                name='resumeFile'
            />

            <Field
                id='jobInterest'
                name={'jobInterest'}
                component={jobInterestComponent}
                label={CONSTANTS.JOBINTEREST_REQUEST_LABEL}
                placeholder={CONSTANTS.JOBINTEREST_REQUEST_PLACEHOLDER}
            />
            <ErrorMessage
                name='jobInterest'
            />
            <Field
                id='skills'
                name={'skills'}
                selectId={'skillsSelect'}
                isMulti={true}
                options={[
                    { label: Skills.HTML, value: Skills.HTML },
                    { label: Skills.CSS, value: Skills.CSS },
                    { label: Skills.JS, value: Skills.JS },
                    { label: Skills.TS, value: Skills.TS },
                ]}
                label={CONSTANTS.SKILLS_REQUEST_LABEL}
                placeholder={CONSTANTS.SKILLS_REQUEST_PLACEHOLDER}
                component={StylizedSelectFormikComponent}
            />
            <Field
                id='essay'
                name={'essay'}
                component={TextareaComponent}
                label={CONSTANTS.ESSAY_REQUEST_LABEL}
            />
            <Field
                id='comments'
                name={'comments'}
                component={TextareaComponent}
                label={CONSTANTS.COMMENTS_REQUEST_LABEL}
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
        </Form>
    );
}

function handleSubmitSync(values: any, actions: FormikActions<any>) {
    handleSubmit(values, actions).then((success: boolean) => {
        if (success) {
            console.log("Submtted application");
        } else {
            console.error("Issue with submission of application");
        }
    }).catch((response: AxiosResponse<APIResponse<any>> | undefined) => {
        if (response) {
            ValidationErrorGenerator(response.data);
        }
    });
}

async function handleSubmit(values: any, actions: FormikActions<any>): Promise<boolean> {
    const acctResponse: AxiosResponse<APIResponse<IAccount>> = await Account.getSelf();
    if (acctResponse.status !== 200) {
        console.error("Error while getting current user");
        return false;
    }
    const account = acctResponse.data.data;

    const hackerResponse: AxiosResponse<APIResponse<IHacker>> = await Hacker.create(
        {
            id: '',
            accountId: account.id,
            status: HackerStatus.HACKER_STATUS_NONE,
            school: values.school,
            degree: values.degree,
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
        return false;
    }
    const hacker = hackerResponse.data.data;
    const resumeResponse: AxiosResponse<APIResponse<{}>> = await Hacker.uploadResume(values.resumeFile, hacker.id);
    if (resumeResponse.status !== 200) {
        console.error("Could not upload resume properly");
        return false;
    } else {
        console.log("Uploaded application properly!");
    }
    return true;
}

export default CreateApplicationForm
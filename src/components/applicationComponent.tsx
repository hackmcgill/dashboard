import * as React from 'react';
import { AxiosResponse } from 'axios';
import { Formik, FormikActions, FormikProps, FastField } from 'formik';
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
import TextareaComponent from './textAreaComponent';
import FileUploadComponent from './fileUploadComponent';
import APIResponse from 'src/api/APIResponse';
import Ethnicity from 'src/config/ethnicity';
import Genders from 'src/config/genders';
import Degrees from 'src/config/degrees';
import StylizedSelectFormikComponent from './StylizedSelectFormikComponent';
import Majors from 'src/config/Majors';
import Skills from 'src/config/skills';
import jobInterests from 'src/config/jobInterests';
import Form from 'src/shared/Form';
import ValidationErrorGenerator from './ValidationErrorGenerator';
import JobInterest from 'src/config/jobInterests';
import MaxWidthBox from 'src/shared/MaxWidthBox';
import H1 from 'src/shared/H1';
import Paragraph from 'src/shared/Paragraph';
import { toast } from 'react-toastify';
import WithToasterContainer from 'src/hoc/withToaster';


export enum ManageApplicationModes {
    CREATE,
    EDIT
}
interface IManageApplicationState {
    mode: ManageApplicationModes;
    hackerDetails: IHacker;
}

interface IManageApplicationProps {
    mode: ManageApplicationModes
}
class ManageApplicationContainer extends React.Component<IManageApplicationProps, IManageApplicationState>{
    constructor(props: IManageApplicationProps) {
        super(props);
        this.state = {
            mode: props.mode,
            hackerDetails: {
                id: '',
                accountId: '',
                school: '',
                degree: '',
                status: HackerStatus.HACKER_STATUS_NONE,
                graduationYear: 2019,
                major: '',
                gender: '',
                ethnicity: [],
                needsBus: false,
                application: {
                    portfolioURL: {
                        resume: '',
                        github: 'https://github.com/',
                        dropler: 'https://dribbble.com/',
                        linkedIn: 'https://linkedin.com/in/',
                        personal: 'https://my.website.com/',
                        other: 'https://my.other.website.com/',
                    },
                    jobInterest: JobInterest.NONE,
                    skills: [],
                    essay: '',
                    comments: '',
                },
                codeOfConduct: false,
            },
        }
        this.renderFormik = this.renderFormik.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getValidationSchema = this.getValidationSchema.bind(this);
    }
    public async componentDidMount() {
        const { mode } = this.state;
        if (mode === ManageApplicationModes.EDIT) {
            try {
                const response = await Hacker.getSelf();
                const hackerDetails = response.data.data;
                this.setState({ hackerDetails });
            } catch (e) {
                if (e && e.data) {
                    ValidationErrorGenerator(e.data);
                }
                // For some reason we could not get self. We should switch our state to CREATE.
                this.setState({ mode: ManageApplicationModes.CREATE });
            }
        }
    }

    public render() {
        const { mode, hackerDetails } = this.state;
        return (
            <MaxWidthBox m={'auto'} maxWidth={'500px'}>
                <MaxWidthBox maxWidth={'500px'} m={'auto'}>
                    <H1 color={'#F2463A'} fontSize={'30px'} textAlign={'left'} marginTop={'0px'} marginBottom={'20px'} marginLeft={'0px'}>
                        Your Application
                    </H1>
                </MaxWidthBox>
                <MaxWidthBox maxWidth={'500px'} m={'auto'}>
                    <Paragraph color={'#4D4D4D'} fontSize={'18px'} textAlign={'left'} marginTop={'0px'} marginBottom={'20px'}>
                        {mode === ManageApplicationModes.CREATE ? 'Create' : 'Edit'} your application
                    </Paragraph>
                </MaxWidthBox>
                <Formik
                    enableReinitialize={true}
                    initialValues={{
                        school: hackerDetails.school,
                        degree: hackerDetails.degree,
                        graduationYear: hackerDetails.graduationYear,
                        major: hackerDetails.major,
                        gender: hackerDetails.gender,
                        ethnicity: hackerDetails.ethnicity,
                        needsBus: hackerDetails.needsBus,
                        github: hackerDetails.application.portfolioURL.github,
                        dropler: hackerDetails.application.portfolioURL.dropler,
                        linkedIn: hackerDetails.application.portfolioURL.linkedIn,
                        personal: hackerDetails.application.portfolioURL.personal,
                        other: hackerDetails.application.portfolioURL.other,
                        resumeFile: undefined,
                        jobInterest: hackerDetails.application.jobInterest,
                        skills: hackerDetails.application.skills,
                        essay: hackerDetails.application.essay,
                        comments: hackerDetails.application.comments,
                        codeOfConduct: hackerDetails.codeOfConduct
                    }}
                    onSubmit={this.handleSubmit}
                    render={this.renderFormik}
                    validationSchema={this.getValidationSchema(mode)}
                />
            </MaxWidthBox>
        );
    }

    private getValidationSchema(mode: ManageApplicationModes) {
        const resumeSchema = (mode === ManageApplicationModes.CREATE) ? Yup.mixed().required("A resume is required") : Yup.mixed();

        return Yup.object().shape({
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
            resumeFile: resumeSchema
                .test(
                    "fileSize",
                    "File too large (<4MB only)",
                    value => !value || value.size <= 4000000 // 4MB
                )
                .test(
                    "fileFormat",
                    "Unsupported Format (PDF only)",
                    value => !value || value.type === "application/pdf"),
            ethnicity: Yup.array().required('Required'),
            major: Yup.string().required('Required'),
            graduationYear: Yup.number().required('Required').min(2018).max(2025),
            codeOfConduct: Yup.boolean().required('Required')
        });
    }

    private renderFormik(fp: FormikProps<any>) {
        return (
            <Form onSubmit={fp.handleSubmit}>
                <FastField
                    id='schoolName'
                    name={'school'}
                    component={SchoolComponent}
                    value={fp.values.school}
                />
                <ErrorMessage
                    name='school'
                />
                <FastField
                    id='degree'
                    name={'degree'}
                    selectId={'degreeSelect'}
                    label={CONSTANTS.DEGREE_REQUEST_LABEL}
                    placeholder={CONSTANTS.DEGREE_REQUEST_PLACEHOLDER}
                    creatable={true}
                    options={[
                        { label: Degrees.UNDERGRADUATE, value: Degrees.UNDERGRADUATE },
                        { label: Degrees.MASTERS, value: Degrees.MASTERS },
                        { label: Degrees.PHD, value: Degrees.PHD },
                        { label: Degrees.HIGHSCHOOL, value: Degrees.HIGHSCHOOL },
                        { label: Degrees.OTHER, value: Degrees.OTHER },
                    ]}
                    component={StylizedSelectFormikComponent}
                    value={fp.values.degree}
                />
                <FastField
                    id='graduationYear'
                    name='graduationYear'
                    label="Graduation year:"
                    placeholder="YYYY"
                    format="####"
                    component={NumberFormat}
                    value={fp.values.graduationYear}
                />
                <ErrorMessage
                    name='graduationYear'
                />
                <FastField
                    id='major'
                    name={'major'}
                    inputType='major'
                    options={Majors}
                    isMulti={true}
                    creatable={true}
                    component={StylizedSelectFormikComponent}
                    label={CONSTANTS.MAJOR_REQUEST_LABEL}
                    placeholder={CONSTANTS.MAJOR_PLACEHOLDER}
                    value={fp.values.major}
                />
                <ErrorMessage
                    name='major'
                />
                <FastField
                    id='gender'
                    name={'gender'}
                    selectId={'genderSelect'}
                    label={CONSTANTS.GENDER_REQUEST_LABEL}
                    placeholder={CONSTANTS.GENDER_REQUEST_PLACEHOLDER}
                    creatable={true}
                    options={[
                        { label: Genders.MALE, value: Genders.MALE },
                        { label: Genders.FEMALE, value: Genders.FEMALE },
                        { label: Genders.PREFER_NOT_TO_SAY, value: Genders.PREFER_NOT_TO_SAY },
                        { label: Genders.NON_BINARY, value: Genders.NON_BINARY },
                    ]}
                    component={StylizedSelectFormikComponent}
                    value={fp.values.gender}
                />
                <FastField
                    id='ethnicity'
                    name={'ethnicity'}
                    selectId={'ethnicitySelect'}
                    isMulti={true}
                    creatable={true}
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
                    value={fp.values.ethnicity}
                />
                <ErrorMessage
                    name='ethnicity'
                />
                <FastField
                    id='needsBus'
                    name={'bus'}
                    component={CheckboxComponent}
                    label={CONSTANTS.BUS_REQUEST_LABEL}
                    value={fp.values.needsBus}
                />

                <FastField
                    id='github'
                    name={'github'}
                    inputType='url'
                    component={InputFormikComponent}
                    label={CONSTANTS.GITHUB_LINK_LABEL}
                    placeholder={CONSTANTS.GITHUB_LINK_PLACEHOLDER}
                    value={fp.values.github}
                />
                <ErrorMessage
                    name='github'
                />

                <FastField
                    id='dropler'
                    name={'dropler'}
                    inputType='url'
                    component={InputFormikComponent}
                    label={CONSTANTS.DROPLER_LINK_LABEL}
                    placeholder={CONSTANTS.DROPLER_LINK_PLACEHOLDER}
                    value={fp.values.dropler}
                />
                <ErrorMessage
                    name='dropler'
                />
                <FastField
                    id='linkedIn'
                    name={'linkedIn'}
                    inputType='url'
                    component={InputFormikComponent}
                    label={CONSTANTS.LINKEDIN_LINK_LABEL}
                    placeholder={CONSTANTS.LINKEDIN_LINK_PLACEHOLDER}
                    value={fp.values.linkedIn}
                />
                <ErrorMessage
                    name='linkedIn'
                />

                <FastField
                    id='personal'
                    name={'personal'}
                    inputType='url'
                    component={InputFormikComponent}
                    label={CONSTANTS.PERSONAL_LINK_LABEL}
                    placeholder={CONSTANTS.PERSONAL_LINK_PLACEHOLDER}
                    value={fp.values.personal}
                />
                <ErrorMessage
                    name='personal'
                />
                <FastField
                    id='other'
                    name={'other'}
                    inputType='url'
                    component={InputFormikComponent}
                    label={CONSTANTS.OTHER_LINK_LABEL}
                    placeholder={CONSTANTS.OTHER_LINK_PLACEHOLDER}
                    value={fp.values.other}
                />
                <ErrorMessage
                    name='other'
                />
                <FastField
                    id='resumeFile'
                    name='resumeFile'
                    component={FileUploadComponent}
                    label={CONSTANTS.RESUME_REQUEST_LABEL}
                />
                <ErrorMessage
                    name='resumeFile'
                />

                <FastField
                    id='jobInterest'
                    name={'jobInterest'}
                    options={[
                        { label: jobInterests.NONE, value: jobInterests.NONE },
                        { label: jobInterests.INTERNSHIP, value: jobInterests.INTERNSHIP },
                        { label: jobInterests.FULL_TIME, value: jobInterests.FULL_TIME },
                    ]}
                    component={StylizedSelectFormikComponent}
                    label={CONSTANTS.JOBINTEREST_REQUEST_LABEL}
                    placeholder={CONSTANTS.JOBINTEREST_REQUEST_PLACEHOLDER}
                    value={fp.values.jobInterest}
                />
                <ErrorMessage
                    name='jobInterest'
                />
                <FastField
                    id='skills'
                    name={'skills'}
                    selectId={'skillsSelect'}
                    isMulti={true}
                    creatable={true}
                    options={[
                        { label: Skills.HTML, value: Skills.HTML },
                        { label: Skills.CSS, value: Skills.CSS },
                        { label: Skills.JS, value: Skills.JS },
                        { label: Skills.TS, value: Skills.TS },
                    ]}
                    label={CONSTANTS.SKILLS_REQUEST_LABEL}
                    placeholder={CONSTANTS.SKILLS_REQUEST_PLACEHOLDER}
                    component={StylizedSelectFormikComponent}
                    value={fp.values.skills}
                />
                <FastField
                    id='essay'
                    name={'essay'}
                    component={TextareaComponent}
                    label={CONSTANTS.ESSAY_REQUEST_LABEL}
                    value={fp.values.essay}
                />
                <FastField
                    id='comments'
                    name={'comments'}
                    component={TextareaComponent}
                    label={CONSTANTS.COMMENTS_REQUEST_LABEL}
                    value={fp.values.comments}
                />

                <FastField
                    id='codeOfConduct'
                    name={'codeOfConduct'}
                    component={CheckboxComponent}
                    label={CONSTANTS.COC_REQUEST_LABEL}
                    value={fp.values.codeOfConduct}
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

    private handleSubmit(values: any, actions: FormikActions<any>) {
        const { mode } = this.state;
        let handler: Promise<boolean>;
        switch (mode) {
            case ManageApplicationModes.EDIT:
                handler = this.handleEdit(values, actions);
                break;
            default:
                handler = this.handleCreate(values, actions);
                break;
        }
        handler.then((success: boolean) => {
            if (success) {
                console.log("Submtted application");
                toast.success(`Account ${(mode === ManageApplicationModes.EDIT) ? 'edited'! : 'created!'}`)
            } else {
                toast.error(`There was an error when submitting the application.`);
            }
        }).catch((response: AxiosResponse<APIResponse<any>> | undefined) => {
            if (response) {
                ValidationErrorGenerator(response.data);
            }
        });
    }
    private async handleCreate(values: any, actions: FormikActions<any>): Promise<boolean> {
        const acctResponse: AxiosResponse<APIResponse<IAccount>> = await Account.getSelf();
        if (acctResponse.status !== 200) {
            console.error("Error while getting current user");
            return false;
        }
        const account = acctResponse.data.data;
        const application = this.convertFormikToHacker(values, '', '', account.id);
        console.log(values, application);
        const hackerResponse: AxiosResponse<APIResponse<IHacker>> = await Hacker.create(application);
        if (hackerResponse.status !== 200) {
            console.error("Error while creating account");
            return false;
        }
        const hacker = hackerResponse.data.data;
        const resumeResponse: AxiosResponse<APIResponse<{}>> = await Hacker.uploadResume(hacker.id, values.resumeFile);
        if (resumeResponse.status !== 200) {
            console.error("Could not upload resume properly");
            return false;
        } else {
            console.log("Uploaded application properly!");
        }
        return true;
    }
    private async handleEdit(values: any, actions: FormikActions<any>): Promise<boolean> {
        const acctResponse: AxiosResponse<APIResponse<IAccount>> = await Account.getSelf();
        if (acctResponse.status !== 200) {
            console.error("Error while getting current user");
            return false;
        }
        const account = acctResponse.data.data;
        const resumeLink = this.state.hackerDetails.application.portfolioURL.resume;
        const hackerId = this.state.hackerDetails.id;
        const application = this.convertFormikToHacker(values, resumeLink, hackerId, account.id);
        const hackerResponse: AxiosResponse<APIResponse<IHacker>> = await Hacker.update(application);
        if (hackerResponse.status !== 200) {
            console.error("Error while updating account");
            return false;
        }
        if (values.resumeFile) {
            const resumeResponse: AxiosResponse<APIResponse<{}>> = await Hacker.uploadResume(hackerId, values.resumeFile);
            if (resumeResponse.status !== 200) {
                console.error("Could not upload resume properly");
                return false;
            } else {
                console.log("Uploaded application properly!");
            }
        }
        return true;
    }

    private convertFormikToHacker(values: any, resumeLink: string, hackerId: string, accountId: string): IHacker {
        return {
            id: hackerId,
            accountId,
            status: HackerStatus.HACKER_STATUS_NONE,
            school: values.school,
            degree: values.degree,
            gender: values.gender,
            needsBus: values.needsBus,
            application: {
                portfolioURL: {
                    resume: resumeLink,
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
        }
    }

}

export default WithToasterContainer(ManageApplicationContainer);
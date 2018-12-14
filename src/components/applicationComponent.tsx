import * as React from 'react';
import { AxiosResponse } from 'axios';
import { Formik, FormikActions, FormikProps, FastField, ErrorMessage, Field } from 'formik';
import { Flex, Box } from '@rebass/grid'
import * as Yup from "yup";
import { toast } from 'react-toastify';

import * as CONSTANTS from '../config/constants';
import Ethnicity from '../config/ethnicity';
import Genders from '../config/genders';
import Degrees from '../config/degrees';
import Majors from '../config/Majors';
import Skills from '../config/skills';
import jobInterests from '../config/jobInterests';

import FormikError from '../shared/FormikError';
import Form from '../shared/Form';
import Button from '../shared/Button';
import MaxWidthBox from '../shared/MaxWidthBox';
import H1 from '../shared/H1';
import { FormDescription } from '../shared/Paragraph';

import Account from '../api/account';
import Hacker from '../api/hacker';
import APIResponse from '../api/APIResponse';

import { IAccount, IHacker } from '../config/userTypes';
import HackerStatus from '../config/hackerStatus';
import SchoolComponent from '../components/schoolComponent';
import CheckboxComponent from '../components/checkboxFormikComponent';
import InputFormikComponent from '../components/InputFormikComponent';
import NumberFormat from '../components/numberFormatFormikComponent';
import TextareaComponent from '../components/textAreaComponent';
import StylizedSelectFormikComponent from '../components/StylizedSelectFormikComponent';
import ValidationErrorGenerator from '../components/ValidationErrorGenerator';
import ResumeComponent from './resumeComponent';

import WithToasterContainer from '../hoc/withToaster';
import { Redirect } from 'react-router';
import FrontendRoute from '../config/FrontendRoute';

export enum ManageApplicationModes {
    CREATE,
    EDIT
}
interface IManageApplicationState {
    mode: ManageApplicationModes;
    submitted: boolean;
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
            submitted: false,
            hackerDetails: {
                id: '',
                accountId: '',
                school: '',
                degree: '',
                status: HackerStatus.HACKER_STATUS_NONE,
                graduationYear: NaN,
                major: '',
                gender: '',
                ethnicity: [],
                needsBus: false,
                application: {
                    portfolioURL: {
                        resume: '',
                        github: '',
                        dropler: '',
                        linkedIn: '',
                        personal: '',
                        other: '',
                    },
                    jobInterest: jobInterests.NONE,
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
        const { mode, hackerDetails, submitted } = this.state;
        return (
            submitted ? <Redirect to={FrontendRoute.HOME_PAGE} /> :
                <MaxWidthBox m={'auto'} maxWidth={'500px'}>
                    <MaxWidthBox maxWidth={'500px'} m={'auto'}>
                        <H1 color={'#F2463A'} fontSize={'30px'} textAlign={'left'} marginTop={'0px'} marginBottom={'20px'} marginLeft={'0px'}>
                            {mode === ManageApplicationModes.CREATE ? 'Create' : 'Edit'} your Application
                        </H1>
                        <FormDescription>
                            {CONSTANTS.REQUIRED_DESCRIPTION}
                        </FormDescription>
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
                            codeOfConduct_MCHACKS: hackerDetails.codeOfConduct,
                            codeOfConduct_MLH: hackerDetails.codeOfConduct
                        }}
                        onSubmit={this.handleSubmit}
                        render={this.renderFormik}
                        validationSchema={this.getValidationSchema(mode)}
                    />
                </MaxWidthBox>
        );
    }

    /**
     * Returns a yup object that is conditional based on what mode we're in.
     * @param mode What management of the application we're doing.
     */
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
            codeOfConduct_MLH: Yup.boolean().required('Required').test(
                "true",
                "You must accept the MLH policies",
                value => value
            ),
            codeOfConduct_MCHACKS: Yup.boolean().required('Required').test(
                "true",
                "You must accept the McHacks policies",
                value => value
            )
        });
    }

    /**
     * The function to pass into the formik component to render the form.
     * @param fp the formik props.
     */
    private renderFormik(fp: FormikProps<any>) {
        return (
            <Form onSubmit={fp.handleSubmit}>
                <FastField
                    id='schoolName'
                    name={'school'}
                    component={SchoolComponent}
                    value={fp.values.school}
                    required={true}
                    label={CONSTANTS.SCHOOL_REQUEST_LABEL}
                />
                <ErrorMessage
                    component={FormikError}
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
                    required={true}
                />
                <FastField
                    id='graduationYear'
                    name='graduationYear'
                    label="Graduation year:"
                    placeholder="YYYY"
                    format="####"
                    component={NumberFormat}
                    value={fp.values.graduationYear}
                    required={true}
                />
                <ErrorMessage
                    component={FormikError}
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
                    required={true}
                />
                <ErrorMessage
                    component={FormikError}
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
                    required={true}
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
                    required={true}
                />
                <ErrorMessage
                    component={FormikError}
                    name='ethnicity'
                />
                <FastField
                    id='needsBus'
                    name={'needsBus'}
                    component={CheckboxComponent}
                    label={CONSTANTS.BUS_REQUEST_LABEL}
                    subtitle={CONSTANTS.BUS_REQUEST_SUBTITLE}
                    value={fp.values.needsBus}
                    required={false}
                />
                <FastField
                    id='github'
                    name={'github'}
                    inputType='url'
                    component={InputFormikComponent}
                    label={CONSTANTS.GITHUB_LINK_LABEL}
                    placeholder={CONSTANTS.GITHUB_LINK_PLACEHOLDER}
                    value={fp.values.github}
                    required={true}
                />
                <ErrorMessage
                    component={FormikError}
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
                    component={FormikError}
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
                    component={FormikError}
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
                    component={FormikError}
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
                <ErrorMessage component={FormikError}
                    name='other'
                />
                <Field
                    id='resumeFile'
                    name='resumeFile'
                    component={ResumeComponent}
                    label={CONSTANTS.RESUME_REQUEST_LABEL}
                    mode={this.state.mode}
                    hackerId={this.state.hackerDetails.id}
                    required={this.props.mode === ManageApplicationModes.CREATE}
                />
                <ErrorMessage
                    component={FormikError}
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
                    required={true}
                />
                <ErrorMessage
                    component={FormikError}
                    name='jobInterest'
                />
                <FastField
                    id='skills'
                    name={'skills'}
                    selectId={'skillsSelect'}
                    isMulti={true}
                    creatable={true}
                    options={[
                        { label: Skills.Android, value: Skills.Android },
                        { label: Skills.ArtificialIntelligence, value: Skills.ArtificialIntelligence },
                        { label: Skills.BackEnd, value: Skills.BackEnd },
                        { label: Skills.C, value: Skills.C },
                        { label: Skills.CSharp, value: Skills.CSharp },
                        { label: Skills.CPlusPlus, value: Skills.CPlusPlus },
                        { label: Skills.CSS, value: Skills.CSS },
                        { label: Skills.DataScience, value: Skills.DataScience },
                        { label: Skills.DesktopApps, value: Skills.DesktopApps },
                        { label: Skills.Django, value: Skills.Django },
                        { label: Skills.Excel, value: Skills.Excel },
                        { label: Skills.FrontEnd, value: Skills.FrontEnd },
                        { label: Skills.HTML, value: Skills.HTML },
                        { label: Skills.iOS, value: Skills.iOS },
                        { label: Skills.Java, value: Skills.Java },
                        { label: Skills.Javascript, value: Skills.Javascript },
                        { label: Skills.MachineLearning, value: Skills.MachineLearning },
                        { label: Skills.MobileApps, value: Skills.MobileApps },
                        { label: Skills.MongoDB, value: Skills.MongoDB },
                        { label: Skills.NaturalLanguageProcessing, value: Skills.NaturalLanguageProcessing },
                        { label: Skills.NodeJS, value: Skills.NodeJS },
                        { label: Skills.PHP, value: Skills.PHP },
                        { label: Skills.ProductManagement, value: Skills.ProductManagement },
                        { label: Skills.Python, value: Skills.Python },
                        { label: Skills.React, value: Skills.React },
                        { label: Skills.Robotics, value: Skills.Robotics },
                        { label: Skills.Ruby, value: Skills.Ruby },
                        { label: Skills.RubyonRails, value: Skills.RubyonRails },
                        { label: Skills.Swift, value: Skills.Swift },
                        { label: Skills.Typescript, value: Skills.Typescript },
                        { label: Skills.UIDesign, value: Skills.UIDesign },
                        { label: Skills.UXDesign, value: Skills.UXDesign },
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
                    required={true}
                />
                <FastField
                    id='comments'
                    name={'comments'}
                    component={TextareaComponent}
                    label={CONSTANTS.COMMENTS_REQUEST_LABEL}
                    value={fp.values.comments}
                    required={false}
                />

                <FastField
                    id='codeOfConduct_MCHACKS'
                    name={'codeOfConduct_MCHACKS'}
                    component={CheckboxComponent}
                    label={<span>
                        {CONSTANTS.COC_ACCEPTANCE_PHRASE} <a href="https://mchacks.ca/code-of-conduct" target="_blank">{CONSTANTS.COC_MCHACKS_REQUEST_LABEL}</a>
                    </span>}
                    value={fp.values.codeOfConduct_MCHACKS}
                    required={true}
                />
                <ErrorMessage
                    component={FormikError}
                    name='codeOfConduct_MCHACKS'
                />
                <FastField
                    id='codeOfConduct_MLH'
                    name={'codeOfConduct_MLH'}
                    component={CheckboxComponent}
                    label={<span>
                        {CONSTANTS.COC_ACCEPTANCE_PHRASE} <a href="https://github.com/MLH/mlh-policies" target="_blank">{CONSTANTS.COC_MLH_REQUEST_LABEL}</a>
                    </span>}
                    value={fp.values.codeOfConduct_MLH}
                    required={true}
                />
                <ErrorMessage
                    component={FormikError}
                    name='codeOfConduct_MLH'
                />
                <Flex justifyContent={'center'}>
                    <Box>
                        <Button type='submit'>Submit</Button>
                    </Box>
                </Flex>
            </Form>
        );
    }

    /**
     * Function called when formik form is submitted.
     * @param values the formik values
     * @param actions the formik actions
     */
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
                console.log("Submitted application");
                toast.success(`Account ${(mode === ManageApplicationModes.EDIT) ? 'edited'! : 'created!'}`);
                this.setState({ submitted: true });
            } else {
                toast.error(`There was an error when submitting the application.`);
            }

        }).catch((response: AxiosResponse<APIResponse<any>> | undefined) => {
            if (response) {
                ValidationErrorGenerator(response.data);
            }
        });
    }
    /**
     * Handles the creation of the application.
     * @param values the formik values
     * @param actions the formik actions
     */
    private async handleCreate(values: any, actions: FormikActions<any>): Promise<boolean> {
        const acctResponse: AxiosResponse<APIResponse<IAccount>> = await Account.getSelf();
        if (acctResponse.status !== 200) {
            console.error("Error while getting current user");
            return false;
        }
        const account = acctResponse.data.data;
        const application = this.convertFormikToHacker(values, account.id);
        const hackerResponse: AxiosResponse<APIResponse<IHacker>> = await Hacker.create(application);
        if (hackerResponse.status !== 200) {
            console.error("Error while creating application");
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
    /**
     * Handles the editing of the application.
     * @param values Formik values
     * @param actions Formik actions
     */
    private async handleEdit(values: any, actions: FormikActions<any>): Promise<boolean> {
        const acctResponse: AxiosResponse<APIResponse<IAccount>> = await Account.getSelf();
        if (acctResponse.status !== 200) {
            console.error("Error while getting current user");
            return false;
        }
        const account = acctResponse.data.data;
        const resumeLink = this.state.hackerDetails.application.portfolioURL.resume;
        const hackerId = this.state.hackerDetails.id;

        // convert the formik values to the application object.
        const application = this.convertFormikToHacker(values, account.id, resumeLink, hackerId);
        const hackerResponse: AxiosResponse<APIResponse<IHacker>> = await Hacker.update(application);
        if (hackerResponse.status !== 200) {
            console.error("Error while updating application");
            return false;
        }
        if (values.resumeFile) {
            // only upload a resume if they have added a resume to the form.
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

    /**
     * This converts the formik values object into the IHacker object.
     * @param values Formik values
     * @param resumeLink the link to the resume. Used only when the hacker is updating their application.
     * @param hackerId the hacker id. Used only when the hacker is updating their application.
     * @param accountId the account id associated with this hacker.
     */
    private convertFormikToHacker(values: any, accountId: string, resumeLink: string = '', hackerId: string = ''): IHacker {
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
            codeOfConduct: values.codeOfConduct_MLH && values.codeOfConduct_MCHACKS,
        }
    }

}
export default WithToasterContainer(ManageApplicationContainer);

import { Box, Flex } from '@rebass/grid';
import { AxiosResponse } from 'axios';
import {
  ErrorMessage,
  FastField,
  Field,
  Formik,
  FormikProps,
  FormikValues,
} from 'formik';
import * as React from 'react';
import { Redirect } from 'react-router';
import { toast } from 'react-toastify';

import * as CONSTANTS from '../config/constants';
import { getOptionsFromEnum } from '../util';
import getValidationSchema from './validationSchema';

import {
  Degrees,
  FrontendRoute,
  Genders,
  HackerStatus,
  IEthnicity,
  IHacker,
  JobInterest,
  Majors,
  Skills,
} from '../config';

import { Button, FormDescription, H1, MaxWidthBox } from '../shared/Elements';

import { Form } from '../shared/Form/';
import * as FormikElements from '../shared/Form/FormikElements';

import { Account, APIResponse, Hacker } from '../api';

import ValidationErrorGenerator from '../shared/Form/validationErrorGenerator';

import ResumeComponent from './Resume';
import SchoolComponent from './SchoolSelect';

import WithToasterContainer from '../shared/HOC/withToaster';

export enum ManageApplicationModes {
  CREATE,
  EDIT,
}
interface IManageApplicationState {
  mode: ManageApplicationModes;
  submitted: boolean;
  hackerDetails: IHacker;
}

interface IManageApplicationProps {
  mode: ManageApplicationModes;
}
class ManageApplicationContainer extends React.Component<
  IManageApplicationProps,
  IManageApplicationState
> {
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
          jobInterest: JobInterest.NONE,
          skills: [],
          essay: '',
          comments: '',
        },
        codeOfConduct: false,
      },
    };
    this.renderFormik = this.renderFormik.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
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
    return submitted ? (
      <Redirect to={FrontendRoute.HOME_PAGE} />
    ) : (
      <MaxWidthBox m={'auto'} maxWidth={'500px'}>
        <MaxWidthBox maxWidth={'500px'} m={'auto'}>
          <H1
            color={'#F2463A'}
            fontSize={'30px'}
            textAlign={'left'}
            marginTop={'0px'}
            marginBottom={'20px'}
            marginLeft={'0px'}
          >
            {mode === ManageApplicationModes.CREATE ? 'Create' : 'Edit'} your
            Application
          </H1>
          <FormDescription>{CONSTANTS.REQUIRED_DESCRIPTION}</FormDescription>
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
            application: hackerDetails.application,
            codeOfConduct_MCHACKS: hackerDetails.codeOfConduct,
            codeOfConduct_MLH: hackerDetails.codeOfConduct,
            resumeFile: undefined,
          }}
          onSubmit={this.handleSubmit}
          render={this.renderFormik}
          validationSchema={getValidationSchema(
            mode === ManageApplicationModes.CREATE
          )}
        />
      </MaxWidthBox>
    );
  }

  /**
   * The function to pass into the formik component to render the form.
   * @param fp the formik props.
   */
  private renderFormik(fp: FormikProps<any>) {
    return (
      <Form onSubmit={fp.handleSubmit}>
        <FastField
          id="schoolName"
          name={'school'}
          component={SchoolComponent}
          value={fp.values.school}
          required={true}
          label={CONSTANTS.SCHOOL_REQUEST_LABEL}
        />
        <ErrorMessage component={FormikElements.Error} name="school" />
        <FastField
          name={'degree'}
          label={CONSTANTS.DEGREE_REQUEST_LABEL}
          placeholder={CONSTANTS.DEGREE_REQUEST_PLACEHOLDER}
          creatable={true}
          options={getOptionsFromEnum(Degrees)}
          component={FormikElements.Select}
          value={fp.values.degree}
          required={true}
        />
        <FastField
          name="graduationYear"
          label="Graduation year:"
          placeholder="YYYY"
          format="####"
          component={FormikElements.FormattedNumber}
          value={fp.values.graduationYear}
          required={true}
        />
        <ErrorMessage component={FormikElements.Error} name="graduationYear" />
        <FastField
          name={'major'}
          options={Majors}
          isMulti={true}
          creatable={true}
          component={FormikElements.Select}
          label={CONSTANTS.MAJOR_REQUEST_LABEL}
          placeholder={CONSTANTS.MAJOR_PLACEHOLDER}
          value={fp.values.major}
          required={true}
        />
        <ErrorMessage component={FormikElements.Error} name="major" />
        <FastField
          name={'gender'}
          label={CONSTANTS.GENDER_REQUEST_LABEL}
          placeholder={CONSTANTS.GENDER_REQUEST_PLACEHOLDER}
          creatable={true}
          options={getOptionsFromEnum(Genders)}
          component={FormikElements.Select}
          value={fp.values.gender}
          required={true}
        />
        <FastField
          name={'ethnicity'}
          isMulti={true}
          creatable={true}
          options={getOptionsFromEnum(IEthnicity)}
          label={CONSTANTS.ETHNICITY_REQUEST_LABEL}
          placeholder={CONSTANTS.ETHNICITY_REQUEST_PLACEHOLDER}
          component={FormikElements.Select}
          value={fp.values.ethnicity}
          required={true}
        />
        <ErrorMessage component={FormikElements.Error} name="ethnicity" />
        <FastField
          name={'needsBus'}
          component={FormikElements.Checkbox}
          label={CONSTANTS.BUS_REQUEST_LABEL}
          subtitle={CONSTANTS.BUS_REQUEST_SUBTITLE}
          required={false}
        />
        <FastField
          name={'application.portfolioURL.github'}
          inputType="url"
          component={FormikElements.Input}
          label={CONSTANTS.GITHUB_LINK_LABEL}
          placeholder={CONSTANTS.GITHUB_LINK_PLACEHOLDER}
        />
        <ErrorMessage
          component={FormikElements.Error}
          name="application.portfolioURL.github"
        />

        <FastField
          name={'application.portfolioURL.dropler'}
          inputType="url"
          component={FormikElements.Input}
          label={CONSTANTS.DROPLER_LINK_LABEL}
          placeholder={CONSTANTS.DROPLER_LINK_PLACEHOLDER}
        />
        <ErrorMessage
          component={FormikElements.Error}
          name="application.portfolioURL.dropler"
        />
        <FastField
          name={'application.portfolioURL.linkedIn'}
          inputType="url"
          component={FormikElements.Input}
          label={CONSTANTS.LINKEDIN_LINK_LABEL}
          placeholder={CONSTANTS.LINKEDIN_LINK_PLACEHOLDER}
          value={fp.values.application.portfolioURL.linkedIn}
        />
        <ErrorMessage
          component={FormikElements.Error}
          name="application.portfolioURL.linkedIn"
        />

        <FastField
          name={'application.portfolioURL.personal'}
          inputType="url"
          component={FormikElements.Input}
          label={CONSTANTS.PERSONAL_LINK_LABEL}
          placeholder={CONSTANTS.PERSONAL_LINK_PLACEHOLDER}
          value={fp.values.application.portfolioURL.personal}
        />
        <ErrorMessage
          component={FormikElements.Error}
          name="application.portfolioURL.personal"
        />
        <FastField
          name={'application.portfolioURL.other'}
          inputType="url"
          component={FormikElements.Input}
          label={CONSTANTS.OTHER_LINK_LABEL}
          placeholder={CONSTANTS.OTHER_LINK_PLACEHOLDER}
          value={fp.values.application.portfolioURL.other}
        />
        <ErrorMessage
          component={FormikElements.Error}
          name="application.portfolioURL.other"
        />
        <Field
          name="resumeFile"
          component={ResumeComponent}
          label={CONSTANTS.RESUME_REQUEST_LABEL}
          mode={this.state.mode}
          hackerId={this.state.hackerDetails.id}
          required={this.props.mode === ManageApplicationModes.CREATE}
        />
        <ErrorMessage component={FormikElements.Error} name="resumeFile" />
        <FastField
          name={'application.jobInterest'}
          options={getOptionsFromEnum(JobInterest)}
          component={FormikElements.Select}
          label={CONSTANTS.JOBINTEREST_REQUEST_LABEL}
          placeholder={CONSTANTS.JOBINTEREST_REQUEST_PLACEHOLDER}
          value={fp.values.application.jobInterest}
          required={true}
        />
        <ErrorMessage
          component={FormikElements.Error}
          name="application.jobInterest"
        />
        <FastField
          name={'application.skills'}
          isMulti={true}
          creatable={true}
          options={getOptionsFromEnum(Skills)}
          label={CONSTANTS.SKILLS_REQUEST_LABEL}
          placeholder={CONSTANTS.SKILLS_REQUEST_PLACEHOLDER}
          component={FormikElements.Select}
          value={fp.values.application.skills}
        />
        <FastField
          name={'application.essay'}
          component={FormikElements.LongTextInput}
          label={CONSTANTS.ESSAY_REQUEST_LABEL}
          value={fp.values.application.essay}
          maxLength={2000}
          required={true}
        />
        <ErrorMessage
          component={FormikElements.Error}
          name="application.essay"
        />
        <FastField
          name={'application.comments'}
          component={FormikElements.LongTextInput}
          label={CONSTANTS.COMMENTS_REQUEST_LABEL}
          value={fp.values.application.comments}
          maxLength={500}
          required={false}
        />
        <ErrorMessage
          component={FormikElements.Error}
          name="application.comments"
        />
        <FastField
          name={'codeOfConduct_MCHACKS'}
          component={FormikElements.Checkbox}
          label={
            <span>
              {CONSTANTS.COC_ACCEPTANCE_PHRASE}{' '}
              <a href="https://mchacks.ca/code-of-conduct" target="_blank">
                {CONSTANTS.COC_MCHACKS_REQUEST_LABEL}
              </a>
            </span>
          }
          value={fp.values.codeOfConduct_MCHACKS}
          required={true}
        />
        <ErrorMessage
          component={FormikElements.Error}
          name="codeOfConduct_MCHACKS"
        />
        <FastField
          name={'codeOfConduct_MLH'}
          component={FormikElements.Checkbox}
          label={
            <span>
              {CONSTANTS.COC_ACCEPTANCE_PHRASE}{' '}
              <a href="https://github.com/MLH/mlh-policies" target="_blank">
                {CONSTANTS.COC_MLH_REQUEST_LABEL}
              </a>
            </span>
          }
          value={fp.values.codeOfConduct_MLH}
          required={true}
        />
        <ErrorMessage
          component={FormikElements.Error}
          name="codeOfConduct_MLH"
        />
        <Flex justifyContent={'center'}>
          <Box>
            <Button type="submit">Submit</Button>
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
  private handleSubmit(values: any) {
    const { mode } = this.state;
    let handler;
    switch (mode) {
      case ManageApplicationModes.EDIT:
        handler = this.handleEdit;
        break;
      case ManageApplicationModes.CREATE:
        handler = this.handleCreate;
        break;
      default:
        return;
    }

    handler(values)
      .then((success: boolean) => {
        if (success) {
          console.log('Submitted application');
          toast.success(
            `Account ${
              mode === ManageApplicationModes.EDIT ? 'edited'! : 'created!'
            }`
          );
          this.setState({ submitted: true });
        } else {
          toast.error(`There was an error when submitting the application.`);
        }
      })
      .catch((response: AxiosResponse<APIResponse<any>> | undefined) => {
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
  private async handleCreate(values: any): Promise<boolean> {
    const acctResponse = await Account.getSelf();

    if (acctResponse.status !== 200) {
      console.error('Error while getting current user');
      return false;
    }
    const account = acctResponse.data.data;
    const application = this.convertFormikToHacker(values, account.id);
    const hackerResponse = await Hacker.create(application);

    if (hackerResponse.status !== 200) {
      console.error('Error while creating application');
      return false;
    }
    const hacker = hackerResponse.data.data;
    const resumeResponse = await Hacker.uploadResume(
      hacker.id,
      values.resumeFile
    );
    if (resumeResponse.status !== 200) {
      console.error('Could not upload resume properly');
      return false;
    } else {
      console.log('Uploaded application properly!');
    }
    return true;
  }
  /**
   * Handles the editing of the application.
   * @param values Formik values
   * @param actions Formik actions
   */
  private async handleEdit(values: any): Promise<boolean> {
    const acctResponse = await Account.getSelf();

    if (acctResponse.status !== 200) {
      console.error('Error while getting current user');
      return false;
    }

    const account = acctResponse.data.data;
    const hackerId = this.state.hackerDetails.id;

    // convert the formik values to the application object.
    const application = this.convertFormikToHacker(
      values,
      account.id,
      hackerId
    );
    const hackerResponse = await Hacker.update(application);

    if (hackerResponse.status !== 200) {
      console.error('Error while updating application');
      return false;
    }
    if (values.resumeFile) {
      // only upload a resume if they have added a resume to the form.
      const resumeResponse = await Hacker.uploadResume(
        hackerId,
        values.resumeFile
      );

      if (resumeResponse.status !== 200) {
        console.error('Could not upload resume properly');
        return false;
      } else {
        console.log('Uploaded application properly!');
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
  private convertFormikToHacker(
    values: FormikValues,
    accountId: string,
    hackerId: string = ''
  ): IHacker {
    return {
      id: hackerId,
      accountId,
      status: HackerStatus.HACKER_STATUS_NONE,
      school: values.school,
      degree: values.degree,
      gender: values.gender,
      needsBus: values.needsBus,
      application: values.application,
      ethnicity: values.ethnicity,
      major: values.major,
      graduationYear: values.graduationYear,
      codeOfConduct: values.codeOfConduct_MLH && values.codeOfConduct_MCHACKS,
    };
  }
}
export default WithToasterContainer(ManageApplicationContainer);

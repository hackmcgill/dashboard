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
import Helmet from 'react-helmet';
import { Redirect } from 'react-router';
import { toast } from 'react-toastify';

import * as CONSTANTS from '../../config/constants';
import { getOptionsFromEnum } from '../../util';
import getValidationSchema from './validationSchema';

import {
  Degrees,
  FrontendRoute,
  HackerStatus,
  IEthnicity,
  IHacker,
  JobInterest,
  Majors,
  ShirtSize,
  Skills,
} from '../../config';

import {
  FormDescription,
  H1,
  HorizontalSpacer,
  MaxWidthBox,
} from '../../shared/Elements';

import { Form, SubmitBtn } from '../../shared/Form';
import * as FormikElements from '../../shared/Form/FormikElements';

import { Account, APIResponse, Hacker } from '../../api';

import ValidationErrorGenerator from '../../shared/Form/validationErrorGenerator';

import ResumeComponent from './ResumeComponent';
import SchoolComponent from './SchoolComponent';

import { Flex } from '@rebass/grid';
import { ResetBtn } from '../../shared/Form/ResetBtn';
import WithToasterContainer from '../../shared/HOC/withToaster';
import Sidebar from '../Sidebar/Sidebar';

export enum ManageApplicationModes {
  CREATE,
  EDIT,
}
interface IManageApplicationState {
  mode: ManageApplicationModes;
  submitted: boolean;
  submitting: boolean;
  hackerDetails: IHacker;
  pageNumber: number;
  resume: any;
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
      submitting: false,
      pageNumber: 1,
      hackerDetails: {
        id: '',
        accountId: '',
        status: HackerStatus.HACKER_STATUS_NONE,
        application: {
          general: {
            school: '',
            degree: '',
            fieldOfStudy: '',
            graduationYear: NaN,
            jobInterest: JobInterest.NONE,
            URL: {
              resume: '',
              github: '',
              dribbble: '',
              linkedIn: '',
              personal: '',
              other: '',
            },
          },
          shortAnswer: {
            skills: [],
            question1: '',
            question2: '',
            comments: '',
          },
          other: {
            ethnicity: [],
            privacyPolicy: false,
            codeOfConduct: false,
          },
          accommodation: {
            shirtSize: '',
            impairments: '',
            barriers: '',
            travel: 0,
          },
        },
      },
      resume: undefined,
    };
    this.renderFormik = this.renderFormik.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
  }
  public async componentDidMount() {
    const { mode } = this.state;
    if (mode === ManageApplicationModes.EDIT) {
      try {
        const response = await Hacker.getSelf();
        const hackerDetails = response.data.data;
        this.setState({
          hackerDetails,
        });
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
    const { mode, hackerDetails, submitted, pageNumber } = this.state;
    return submitted ? (
      <Redirect to={FrontendRoute.HOME_PAGE} />
    ) : (
      <HorizontalSpacer paddingLeft={'20%'}>
        <MaxWidthBox m={'auto'} maxWidth={'500px'}>
          <Sidebar
            currentPage="Application"
            status={this.state.hackerDetails.status}
            confirmed={true}
          />
          <Helmet>
            <title>
              {mode === ManageApplicationModes.CREATE ? 'Create' : 'Edit'}
              Application | McHacks 6
            </title>
          </Helmet>
          <MaxWidthBox maxWidth={'500px'} m={'auto'}>
            <H1
              color={'#F2463A'}
              fontSize={'30px'}
              textAlign={'left'}
              marginTop={'0px'}
              marginBottom={'20px'}
              marginLeft={'0px'}
              paddingBottom={'20px'}
              paddingTop={'70px'}
            >
              {mode === ManageApplicationModes.CREATE ? 'Create' : 'Edit'} your
              Application
            </H1>
            <FormDescription>{CONSTANTS.REQUIRED_DESCRIPTION}</FormDescription>
          </MaxWidthBox>
          <Formik
            enableReinitialize={true}
            initialValues={{
              hacker: hackerDetails,
              needsBus: false,
              resume: this.state.resume ? this.state.resume : undefined,
              pageNumber,
            }}
            onSubmit={this.handleSubmit}
            onReset={this.previousPage}
            render={this.renderFormik}
            validationSchema={getValidationSchema(
              mode === ManageApplicationModes.CREATE,
              this.state.pageNumber
            )}
          />
        </MaxWidthBox>
      </HorizontalSpacer>
    );
  }

  /**
   * The function to pass into the formik component to render the form.
   * @param fp the formik props.
   */
  private renderFormik(fp: FormikProps<any>) {
    switch (fp.values.pageNumber) {
      case 2:
        return this.renderShortAnswerFormik(fp);
      case 3:
        return this.renderAccommodationFormik(fp);
      case 4:
        return this.renderOtherFormik(fp);
      default:
        return this.renderGeneralFormik(fp);
    }
  }

  /**
   * Renders the general section of the application.
   * @param fp the formik props.
   */
  private renderGeneralFormik(fp: FormikProps<any>) {
    return (
      <Form onKeyDown={this.onKeyDown} onSubmit={fp.handleSubmit}>
        <FastField
          id="schoolName"
          name={'hacker.application.general.school'}
          component={SchoolComponent}
          value={fp.values.hacker.application.general.school}
          required={true}
          label={CONSTANTS.SCHOOL_REQUEST_LABEL}
        />
        <ErrorMessage
          component={FormikElements.Error}
          name="hacker.application.general.school"
        />
        <FastField
          name={'hacker.application.general.degree'}
          label={CONSTANTS.DEGREE_REQUEST_LABEL}
          placeholder={CONSTANTS.DEGREE_REQUEST_PLACEHOLDER}
          creatable={true}
          options={getOptionsFromEnum(Degrees)}
          component={FormikElements.Select}
          value={fp.values.hacker.application.general.degree}
          required={true}
        />
        <ErrorMessage
          component={FormikElements.Error}
          name="hacker.application.general.degree"
        />
        <FastField
          name={'hacker.application.general.graduationYear'}
          label="Graduation year:"
          placeholder="YYYY"
          format="####"
          component={FormikElements.FormattedNumber}
          value={fp.values.hacker.application.general.graduationYear}
          required={true}
        />
        <ErrorMessage
          component={FormikElements.Error}
          name="hacker.application.general.graduationYear"
        />
        <FastField
          name={'hacker.application.general.fieldOfStudy'}
          options={Majors}
          isMulti={true}
          creatable={true}
          component={FormikElements.Select}
          label={CONSTANTS.FIELD_OF_STUDY_REQUEST_LABEL}
          placeholder={CONSTANTS.FIELD_OF_STUDY_PLACEHOLDER}
          value={fp.values.hacker.application.general.fieldOfStudy}
          required={true}
        />
        <ErrorMessage
          component={FormikElements.Error}
          name="hacker.application.general.fieldOfStudy"
        />
        <FastField
          name={'hacker.application.general.URL.github'}
          inputType="url"
          component={FormikElements.Input}
          label={CONSTANTS.GITHUB_LINK_LABEL}
          placeholder={CONSTANTS.GITHUB_LINK_PLACEHOLDER}
        />
        <ErrorMessage
          component={FormikElements.Error}
          name="hacker.application.general.URL.github"
        />

        <FastField
          name={'hacker.application.general.URL.dribbble'}
          inputType="url"
          component={FormikElements.Input}
          label={CONSTANTS.DRIBBBLE_LINK_LABEL}
          placeholder={CONSTANTS.DRIBBBLE_LINK_PLACEHOLDER}
        />
        <ErrorMessage
          component={FormikElements.Error}
          name="hacker.application.general.URL.dribbble"
        />
        <FastField
          name={'hacker.application.general.URL.linkedIn'}
          inputType="url"
          component={FormikElements.Input}
          label={CONSTANTS.LINKEDIN_LINK_LABEL}
          placeholder={CONSTANTS.LINKEDIN_LINK_PLACEHOLDER}
          value={fp.values.hacker.application.general.URL.linkedIn}
        />
        <ErrorMessage
          component={FormikElements.Error}
          name="hacker.application.general.URL.linkedIn"
        />

        <FastField
          name={'hacker.application.general.URL.personal'}
          inputType="url"
          component={FormikElements.Input}
          label={CONSTANTS.PERSONAL_LINK_LABEL}
          placeholder={CONSTANTS.PERSONAL_LINK_PLACEHOLDER}
          value={fp.values.hacker.application.general.URL.personal}
        />
        <ErrorMessage
          component={FormikElements.Error}
          name="hacker.application.general.URL.personal"
        />
        <FastField
          name={'hacker.application.general.URL.other'}
          inputType="url"
          component={FormikElements.Input}
          label={CONSTANTS.OTHER_LINK_LABEL}
          placeholder={CONSTANTS.OTHER_LINK_PLACEHOLDER}
          value={fp.values.hacker.application.general.URL.other}
        />
        <ErrorMessage
          component={FormikElements.Error}
          name="hacker.application.general.URL.other"
        />
        <Field
          name="resume"
          component={ResumeComponent}
          label={CONSTANTS.RESUME_REQUEST_LABEL}
          mode={this.state.mode}
          hackerId={this.state.hackerDetails.id}
          required={this.props.mode === ManageApplicationModes.CREATE}
          value={fp.values.resume}
        />
        <ErrorMessage component={FormikElements.Error} name="resume" />
        <FastField
          name={'hacker.application.general.jobInterest'}
          options={getOptionsFromEnum(JobInterest)}
          component={FormikElements.Select}
          label={CONSTANTS.JOBINTEREST_REQUEST_LABEL}
          placeholder={CONSTANTS.JOBINTEREST_REQUEST_PLACEHOLDER}
          value={fp.values.hacker.application.general.jobInterest}
          required={true}
        />
        <ErrorMessage
          component={FormikElements.Error}
          name="hacker.application.general.jobInterest"
        />
        <SubmitBtn
          isLoading={this.state.submitting}
          disabled={this.state.submitting}
        >
          Next
        </SubmitBtn>
      </Form>
    );
  }

  /**
   * Renders the short answer section of the application.
   * @param fp the formik props.
   */
  private renderShortAnswerFormik(fp: FormikProps<any>) {
    return (
      <Form
        onKeyDown={this.onKeyDown}
        onSubmit={fp.handleSubmit}
        onReset={fp.handleReset}
      >
        <FastField
          name={'hacker.application.shortAnswer.skills'}
          isMulti={true}
          creatable={true}
          options={getOptionsFromEnum(Skills)}
          label={CONSTANTS.SKILLS_REQUEST_LABEL}
          placeholder={CONSTANTS.SKILLS_REQUEST_PLACEHOLDER}
          component={FormikElements.Select}
          value={fp.values.hacker.application.shortAnswer.skills}
        />
        <FastField
          name={'hacker.application.shortAnswer.question1'}
          component={FormikElements.LongTextInput}
          label={CONSTANTS.QUESTION1_REQUEST_LABEL}
          value={fp.values.hacker.application.shortAnswer.question1}
          maxLength={2000}
          required={true}
        />
        <ErrorMessage
          component={FormikElements.Error}
          name="hacker.application.shortAnswer.question1"
        />
        <FastField
          name={'hacker.application.shortAnswer.question2'}
          component={FormikElements.LongTextInput}
          label={CONSTANTS.QUESTION2_REQUEST_LABEL}
          value={fp.values.hacker.application.shortAnswer.question2}
          maxLength={2000}
          required={true}
        />
        <ErrorMessage
          component={FormikElements.Error}
          name="hacker.application.shortAnswer.question2"
        />
        <FastField
          name={'hacker.application.shortAnswer.comments'}
          component={FormikElements.LongTextInput}
          label={CONSTANTS.COMMENTS_REQUEST_LABEL}
          value={fp.values.hacker.application.shortAnswer.comments}
          maxLength={500}
          required={false}
        />
        <ErrorMessage
          component={FormikElements.Error}
          name="hacker.application.shortAnswer.comments"
        />
        <Flex
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'space-evenly'}
        >
          {/* Add for spacing purposes */}
          <div>&nbsp;</div>
          <ResetBtn
            isLoading={false}
            disabled={this.state.submitting}
            variant={2}
          >
            Back
          </ResetBtn>

          <SubmitBtn
            isLoading={this.state.submitting}
            disabled={this.state.submitting}
          >
            Next
          </SubmitBtn>
          <div>&nbsp;</div>
        </Flex>
      </Form>
    );
  }

  /**
   * Renders the accommodation section of the application.
   * @param fp the formik props.
   */
  private renderAccommodationFormik(fp: FormikProps<any>) {
    return (
      <Form
        onKeyDown={this.onKeyDown}
        onSubmit={fp.handleSubmit}
        onReset={fp.handleReset}
      >
        <FastField
          name={'hacker.application.accommodation.shirtSize'}
          label={CONSTANTS.SHIRT_SIZE_LABEL}
          component={FormikElements.Select}
          options={getOptionsFromEnum(ShirtSize)}
          required={true}
          value={fp.values.hacker.application.accommodation.shirtSize}
        />
        <ErrorMessage
          name={'hacker.application.accommodation.shirtSize'}
          component={FormikElements.Error}
        />
        {/* This fixes the issue with going back somehow, so leave it here temporarily */}
        <div />
        <FastField
          name={'hacker.application.accommodation.impairments'}
          component={FormikElements.LongTextInput}
          label={'Do you have any impairments that we should know about?'}
          value={fp.values.hacker.application.accommodation.impairments}
          required={false}
        />
        <ErrorMessage
          component={FormikElements.Error}
          name={'hacker.application.accommodation.impairments'}
        />
        <FastField
          name={'hacker.application.accommodation.barriers'}
          component={FormikElements.LongTextInput}
          label={'Do you have any barriers that we should know about?'}
          value={fp.values.hacker.application.accommodation.barriers}
          required={false}
        />
        <ErrorMessage
          component={FormikElements.Error}
          name={'hacker.application.accommodation.barriers'}
        />
        <FastField
          name={'hacker.application.accommodation.travel'}
          component={FormikElements.FormattedNumber}
          label={CONSTANTS.TRAVEL_REQUEST_LABEL}
          placeholder={0}
          required={false}
          value={fp.values.hacker.application.accommodation.travel}
        />
        <ErrorMessage
          component={FormikElements.Error}
          name={'hacker.application.accommodation.travel'}
        />
        <Flex
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <div>&nbsp;</div>
          <ResetBtn
            isLoading={false}
            disabled={this.state.submitting}
            variant={2}
          >
            Back
          </ResetBtn>
          <SubmitBtn
            isLoading={this.state.submitting}
            disabled={this.state.submitting}
          >
            Next
          </SubmitBtn>
          <div>&nbsp;</div>
        </Flex>
      </Form>
    );
  }

  /**
   * Renders the other section of the application
   * @param fp the formik props.
   */
  private renderOtherFormik(fp: FormikProps<any>) {
    return (
      <Form
        onKeyDown={this.onKeyDown}
        onSubmit={fp.handleSubmit}
        onReset={fp.handleReset}
      >
        <FastField
          name={'hacker.application.other.ethnicity'}
          isMulti={true}
          creatable={true}
          options={getOptionsFromEnum(IEthnicity)}
          label={CONSTANTS.ETHNICITY_REQUEST_LABEL}
          placeholder={CONSTANTS.ETHNICITY_REQUEST_PLACEHOLDER}
          component={FormikElements.Select}
          value={fp.values.hacker.application.other.ethnicity}
          required={true}
        />
        <ErrorMessage
          component={FormikElements.Error}
          name="hacker.application.other.ethnicity"
        />
        <FastField
          name={'hacker.application.other.codeOfConduct'}
          component={FormikElements.Checkbox}
          label={
            <span>
              {CONSTANTS.COC_ACCEPTANCE_PHRASE}{' '}
              <a href="https://mchacks.ca/code-of-conduct" target="_blank">
                {CONSTANTS.COC_MCHACKS_REQUEST_LABEL}
              </a>
            </span>
          }
          value={fp.values.hacker.application.other.codeOfConduct}
          required={true}
        />
        <ErrorMessage
          component={FormikElements.Error}
          name="hacker.application.other.codeOfConduct"
        />
        <FastField
          name={'hacker.application.other.privacyPolicy'}
          component={FormikElements.Checkbox}
          label={
            <span>
              {CONSTANTS.COC_ACCEPTANCE_PHRASE}{' '}
              <a href="https://github.com/MLH/mlh-policies" target="_blank">
                {CONSTANTS.COC_MLH_REQUEST_LABEL}
              </a>
            </span>
          }
          value={fp.values.hacker.application.other.privacyPolicy}
          required={true}
        />
        <ErrorMessage
          component={FormikElements.Error}
          name="hacker.application.other.codeOfConduct"
        />
        <Flex
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <div>&nbsp;</div>
          <ResetBtn
            isLoading={false}
            disabled={this.state.submitting}
            variant={2}
          >
            Back
          </ResetBtn>
          <SubmitBtn
            isLoading={this.state.submitting}
            disabled={this.state.submitting}
          >
            Submit
          </SubmitBtn>
          <div>&nbsp;</div>
        </Flex>
      </Form>
    );
  }

  /**
   * Stop enter submitting the form.
   * @param keyEvent Event triggered when the user presses a key.
   */
  private onKeyDown(keyEvent: any) {
    if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
      keyEvent.preventDefault();
    }
  }

  /**
   * Event handler to go the previous section of the application, while also saving values on the current section.
   * @param values The formik values
   */
  private previousPage(values: any) {
    let app;
    if (values.hacker.id && values.hacker.accountId) {
      app = this.convertFormikToHacker(
        values,
        values.hacker.accountId,
        values.hacker.id
      );
    } else if (values.hacker.accountId) {
      app = this.convertFormikToHacker(values, values.hacker.accountId);
    } else {
      app = this.convertFormikToHacker(values);
    }
    const pageNumber = values.pageNumber - 1;
    this.setState({
      pageNumber,
      hackerDetails: app,
      resume: this.state.resume ? this.state.resume : values.resume,
    });
  }

  /**
   * Event handler to go the next section of the application, while also saving values on the current section.
   * @param values The formik values
   */
  private nextPage(values: any) {
    let app;
    if (values.hacker.id && values.hacker.accountId) {
      app = this.convertFormikToHacker(
        values,
        values.hacker.accountId,
        values.hacker.id
      );
    } else if (values.hacker.accountId) {
      app = this.convertFormikToHacker(values, values.hacker.accountId);
    } else {
      app = this.convertFormikToHacker(values);
    }
    const pageNumber = values.pageNumber + 1;
    this.setState({
      pageNumber,
      hackerDetails: app,
      resume: this.state.resume ? this.state.resume : values.resume,
    });
  }

  /**
   * Function called when formik form is submitted.
   * @param values the formik values
   * @param actions the formik actions
   */
  private handleSubmit(values: any) {
    if (values.pageNumber !== 4) {
      this.nextPage(values);
    } else {
      this.setState({ submitting: true });
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
            this.setState({ submitted: true, submitting: false });
          } else {
            toast.error(`There was an error when submitting the application.`);
            this.setState({ submitting: false });
          }
        })
        .catch((response: AxiosResponse<APIResponse<any>> | undefined) => {
          if (response) {
            ValidationErrorGenerator(response.data);
          }
          this.setState({ submitting: false });
        });
    }
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
    const resumeResponse = await Hacker.uploadResume(hacker.id, values.resume);
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
    if (values.resume) {
      // only upload a resume if they have added a resume to the form.
      const resumeResponse = await Hacker.uploadResume(hackerId, values.resume);

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
    accountId: string = '',
    hackerId: string = ''
  ): IHacker {
    return {
      id: hackerId,
      accountId,
      status: HackerStatus.HACKER_STATUS_NONE,
      application: values.hacker.application,
    };
  }
}
export default WithToasterContainer(ManageApplicationContainer);

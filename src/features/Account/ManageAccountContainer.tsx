import { Flex } from '@rebass/grid';
import * as React from 'react';
import Helmet from 'react-helmet';
import { Redirect, RouteProps } from 'react-router';

import {
  ErrorMessage,
  FastField,
  Formik,
  FormikProps,
  FormikValues,
} from 'formik';
import { Account, Auth, Hacker } from '../../api';
import {
  FrontendRoute,
  HackerStatus,
  IAccount,
  Pronouns,
  UserType,
  Genders,
} from '../../config';
import * as CONSTANTS from '../../config/constants';
import { FormDescription, H1, MaxWidthBox } from '../../shared/Elements';
import { Form, SubmitBtn } from '../../shared/Form';
import * as FormikElements from '../../shared/Form/FormikElements';

import ValidationErrorGenerator from '../../shared/Form/validationErrorGenerator';
import WithToasterContainer from '../../shared/HOC/withToaster';
import {
  date2input,
  getNestedAttr,
  getOptionsFromEnum,
  getValueFromQuery,
  input2date,
  isSponsor,
} from '../../util';
import Sidebar from '../Sidebar/Sidebar';
import StatusPage from '../Status/StatusPage';
import getValidationSchema from './validationSchema';

export enum ManageAccountModes {
  CREATE,
  EDIT,
}

interface IManageAccountContainerState {
  mode: ManageAccountModes;
  formSubmitted: boolean;
  isSubmitting: booleans;
  accountDetails: IAccount;
  oldPassword: string;
  status: HackerStatus;
  token?: string;
  accountType?: string;
}

interface IManageAccountContainerProps extends RouteProps {
  mode: ManageAccountModes;
}

class ManageAccountContainer extends React.Component<
  IManageAccountContainerProps,
  IManageAccountContainerState
> {
  constructor(props: IManageAccountContainerProps) {
    super(props);
    this.state = {
      formSubmitted: false,
      isSubmitting: false,
      mode: props.mode,
      accountDetails: {
        accountType:
          (getValueFromQuery('accountType') as UserType) || UserType.UNKNOWN,
        birthDate: '',
        confirmed: false,
        email: getNestedAttr(props, ['location', 'state', 'email']) || '',
        firstName: '',
        id: '',
        lastName: '',
        password: getNestedAttr(props, ['location', 'state', 'password']) || '',
        phoneNumber: '',
        pronoun: '',
        gender: '',
      },
      oldPassword: '',
      token: getValueFromQuery('token'),
      status: HackerStatus.HACKER_STATUS_NONE,
    };
    this.renderFormik = this.renderFormik.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  public async componentDidMount() {
    const { mode } = this.state;
    if (mode === ManageAccountModes.EDIT) {
      try {
        const response = await Account.getSelf();
        const accountDetails = response.data.data;
        accountDetails.birthDate = date2input(accountDetails.birthDate);
        this.setState({ accountDetails });
      } catch (e) {
        if (e && e.data) {
          ValidationErrorGenerator(e.data);
        }
        // For some reason we could not get self. We should switch our state to CREATE.
        this.setState({
          mode: ManageAccountModes.CREATE,
          status: HackerStatus.HACKER_STATUS_NONE,
        });
      }
      try {
        const res = await Hacker.getSelf();
        const status = res.data.data.status;
        this.setState({ status });
      } catch (e) {
        // ignore the error
      }
    }
  }

  public render() {
    const { mode, formSubmitted, accountDetails, token } = this.state;

    if (!formSubmitted) {
      return this.renderForm();
    }

    switch (mode) {
      case ManageAccountModes.CREATE:
        if (accountDetails.accountType === UserType.UNKNOWN || !token) {
          return (
            <StatusPage
              status={HackerStatus.HACKER_STATUS_NONE}
              confirmed={false}
            />
          );
        } else if (isSponsor(accountDetails)) {
          return <Redirect to={FrontendRoute.CREATE_SPONSOR_PAGE} />;
        } else {
          return <Redirect to={FrontendRoute.HOME_PAGE} />;
        }

      case ManageAccountModes.EDIT:
        return <Redirect to={FrontendRoute.HOME_PAGE} />;

      default:
        return this.renderForm();
    }
  }

  private renderForm() {
    const { mode, accountDetails } = this.state;
    return (
      <MaxWidthBox m={'auto'} maxWidth={'500px'}>
        <Sidebar
          currentPage="Profile"
          status={this.state.status}
          confirmed={this.state.accountDetails.confirmed}
          created={mode === ManageAccountModes.CREATE ? false : undefined}
        />
        <Helmet>
          <title>
            {mode === ManageAccountModes.CREATE ? 'Create' : 'Edit'} Account |
            McHacks 6
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
          >
            {mode === ManageAccountModes.CREATE ? 'Create' : 'Edit'} your
            Account
          </H1>
          <FormDescription>{CONSTANTS.REQUIRED_DESCRIPTION}</FormDescription>
        </MaxWidthBox>
        <Formik
          enableReinitialize={true}
          initialValues={{
            firstName: accountDetails.firstName,
            lastName: accountDetails.lastName,
            email: accountDetails.email,
            password: accountDetails.password || '',
            newPassword: '',
            pronoun: accountDetails.pronoun,
            phoneNumber: accountDetails.phoneNumber,
            birthDate: accountDetails.birthDate,
          }}
          onSubmit={this.handleSubmit}
          render={this.renderFormik}
          validationSchema={getValidationSchema(
            mode === ManageAccountModes.CREATE
          )}
        />
      </MaxWidthBox>
    );
  }
  private renderFormik(fp: FormikProps<any>) {
    const { mode } = this.state;
    return (
      <Form onSubmit={fp.handleSubmit}>
        <Flex flexWrap={'wrap'} width={1} m="auto">
          <MaxWidthBox width={[1, 0.5]} pr={[0, '10px']}>
            <FastField
              name={'firstName'}
              label={CONSTANTS.FIRST_NAME_LABEL}
              value={fp.values.firstName}
              component={FormikElements.Input}
              isTight={true}
              required={true}
            />
            <ErrorMessage component={FormikElements.Error} name="firstName" />
          </MaxWidthBox>
          <MaxWidthBox width={[1, 0.5]} pl={[0, '10px']}>
            <FastField
              name={'lastName'}
              label={CONSTANTS.LAST_NAME_LABEL}
              value={fp.values.lastName}
              component={FormikElements.Input}
              isTight={true}
              required={true}
            />
            <ErrorMessage component={FormikElements.Error} name="lastName" />
          </MaxWidthBox>
        </Flex>
        <FastField
          name={'email'}
          label={CONSTANTS.EMAIL_LABEL}
          value={fp.values.email}
          component={FormikElements.Input}
          isDisabled={mode === ManageAccountModes.EDIT}
          required={true}
        />
        <ErrorMessage component={FormikElements.Error} name="email" />
        <FastField
          component={FormikElements.Input}
          inputType={'password'}
          label={CONSTANTS.PASSWORD_LABEL}
          name={'password'}
          required={mode === ManageAccountModes.CREATE}
          value={fp.values.password}
        />
        <ErrorMessage component={FormikElements.Error} name="password" />
        {mode === ManageAccountModes.EDIT ? (
          <MaxWidthBox>
            <FastField
              label={CONSTANTS.NEW_PASSWORD_LABEL}
              component={FormikElements.Input}
              inputType={'password'}
              name={'newPassword'}
            />
            <ErrorMessage component={FormikElements.Error} name="newPassword" />
          </MaxWidthBox>
        ) : (
          ''
        )}
        <FastField
          component={FormikElements.Select}
          creatable={true}
          label={CONSTANTS.PRONOUN_LABEL}
          name={'pronoun'}
          placeholder={CONSTANTS.PRONOUN_PLACEHOLDER}
          options={getOptionsFromEnum(Pronouns)}
          required={true}
          value={fp.values.pronoun}
        />
        <ErrorMessage component={FormikElements.Error} name="pronoun" />
        <FastField
          name={'gender'}
          label={CONSTANTS.GENDER_REQUEST_LABEL}
          placeholder={CONSTANTS.GENDER_REQUEST_PLACEHOLDER}
          component={FormikElements.Select}
          options={getOptionsFromEnum(Genders)}
          required={true}
          values={fp.values.gender}
        />
        <ErrorMessage component={FormikElements.Error} name="gender" />
        <FastField
          component={FormikElements.FormattedNumber}
          label={CONSTANTS.PHONE_NUMBER_LABEL}
          placeholder="+# (###) ###-####"
          format="+# (###) ###-####"
          name={'phoneNumber'}
          required={true}
          value={fp.values.phoneNumber}
        />
        <ErrorMessage component={FormikElements.Error} name="phoneNumber" />
        <FastField
          component={FormikElements.FormattedNumber}
          label={CONSTANTS.BIRTH_DATE_LABEL}
          placeholder="MM-DD-YYYY"
          format="##-##-####"
          name={'birthDate'}
          required={true}
          value={fp.values.birthDate}
        />
        <ErrorMessage component={FormikElements.Error} name="birthDate" />
        <SubmitBtn
          isLoading={this.state.isSubmitting}
          disabled={this.state.isSubmitting}
        >
          Submit
        </SubmitBtn>
      </Form>
    );
  }

  private handleSubmit(values: FormikValues) {
    this.setState({ isSubmitting: true });
    const { mode, accountDetails } = this.state;

    const formattedDetails = this.convertFormikToAccount(
      values,
      accountDetails.id
    );

    switch (mode) {
      case ManageAccountModes.CREATE:
        this.handleCreate(formattedDetails);
        break;
      case ManageAccountModes.EDIT:
        this.handleEdit(formattedDetails, values.password, values.newPassword);
        break;
    }
  }

  private async handleCreate(payload: IAccount) {
    try {
      await Account.create(payload, this.state.token);
      console.log('Created an account');
      await Auth.login(payload.email, payload.password);
      this.setState({ formSubmitted: true, isSubmitting: false });
    } catch (e) {
      if (e && e.data) {
        ValidationErrorGenerator(e.data);
      }
      this.setState({ formSubmitted: false, isSubmitting: false });
    }
  }

  private async handleEdit(
    payload: IAccount,
    oldPassword?: string,
    newPassword?: string
  ) {
    try {
      await Account.update(payload);
      console.log('Edited account');
      if (oldPassword && newPassword) {
        await Auth.changePassword(oldPassword, newPassword);
        console.log('Updated password');
      }
      this.setState({ formSubmitted: true, isSubmitting: false });
    } catch (e) {
      if (e && e.data) {
        ValidationErrorGenerator(e.data);
      }
      this.setState({ formSubmitted: false, isSubmitting: false });
    }
  }
  /**
   * This converts the formik values object into the IAccount object.
   * @param values Formik values
   * @param accountId the account id associated with this hacker.
   */
  private convertFormikToAccount(
    values: FormikValues,
    accountId: string = ''
  ): IAccount {
    return {
      accountType: UserType.UNKNOWN,
      birthDate: input2date(values.birthDate),
      confirmed: false,
      email: values.email,
      firstName: values.firstName,
      id: accountId,
      lastName: values.lastName,
      password: values.password,
      phoneNumber: values.phoneNumber,
      pronoun: values.pronoun,
      gender: values.gender,
    };
  }
}

export default WithToasterContainer(ManageAccountContainer);

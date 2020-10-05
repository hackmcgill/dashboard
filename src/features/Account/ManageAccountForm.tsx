import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import {
  ErrorMessage,
  FastField,
  Formik,
  FormikProps,
  FormikValues,
} from 'formik';
import { Account, Auth } from '../../api';
import {
  DietaryRestriction,
  FrontendRoute,
  Genders,
  IAccount,
  Pronouns,
  UserType,
} from '../../config';
import * as CONSTANTS from '../../config/constants';
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
import getValidationSchema from './validationSchema';

export enum ManageAccountModes {
  CREATE,
  EDIT,
}

interface IManageAccountProps {
  mode: ManageAccountModes;
}

/**
 * A form that lists all the account fields (username, password, email, etc)
 * and either allows the user to create a new account (if in CREATE mode) or edit
 * an existing account (if in EDIT mode)
 */
const ManageAccountForm: React.FC<IManageAccountProps> = (props) => {
  // Get access to router history in order to programatically change page
  const history = useHistory();

  // Is the form submission currently being processed? (loading state)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Track the details of the account that is either being created or updated
  const [accountDetails, setAccountDetails] = useState<IAccount>({
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
    dietaryRestrictions: [],
  });

  // If this is an edit form, load current account's data as default value
  // for account details
  useEffect(() => {
    (async () => {
      if (props.mode === ManageAccountModes.EDIT) {
        try {
          const response = await Account.getSelf();
          const newAccountDetails = response.data.data;
          newAccountDetails.birthDate = date2input(newAccountDetails.birthDate);
          setAccountDetails(newAccountDetails);
        } catch (e) {
          // If can't find self's account, shouldn't be logged in. Redirect to home page
          history.push(FrontendRoute.HOME_PAGE);
        }
      }
    })();
  }, [history, props.mode]);

  /**
   * This converts a formik values object into the IAccount object.
   * @param values Formik values
   * @param accountId the account id associated with this hacker.
   */
  const convertFormikToAccount = (
    values: FormikValues,
    accountId: string = ''
  ): IAccount => ({
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
    dietaryRestrictions: values.dietaryRestrictions,
  });

  // Handle form submission
  const handleSubmit = (values: FormikValues) => {
    // Record that form is being submitted
    setIsSubmitting(true);

    // Turn data entered into form fields into an IAccount
    const formattedDetails = convertFormikToAccount(values, accountDetails.id);

    // Depending on the mode of this form either create a new account with form data
    // or update user's existing account to match form data
    if (props.mode === ManageAccountModes.CREATE) {
      handleCreate(formattedDetails);
    } else if (props.mode === ManageAccountModes.EDIT) {
      handleEdit(formattedDetails, values.password, values.newPassword);
    }

    // Once submitted, redirect user to appropriate page
    if (props.mode === ManageAccountModes.CREATE && isSponsor(accountDetails)) {
      history.push(FrontendRoute.CREATE_SPONSOR_PAGE);
    } else {
      history.push(FrontendRoute.HOME_PAGE);
    }
  };

  /**
   * Create a new account
   * @param payload details for the account that's being created
   */
  const handleCreate = async (payload: IAccount) => {
    try {
      await Account.create(payload, getValueFromQuery('token'));
      await Auth.login(payload.email, payload.password);
    } catch (e) {
      if (e && e.data) {
        ValidationErrorGenerator(e.data);
      }
    } finally {
      setIsSubmitting(false);
    }

    // Once submitted redirect user to appropriate page
    history.push(FrontendRoute.HOME_PAGE);
  };

  /**
   * Update current user's account data to match new values
   * @param payload new account data for this user
   * @param oldPassword user's previous password
   * @param newPassword password this user is changing to
   */
  const handleEdit = async (
    payload: IAccount,
    oldPassword?: string,
    newPassword?: string
  ) => {
    try {
      await Account.update(payload);
      if (oldPassword && newPassword) {
        await Auth.changePassword(oldPassword, newPassword);
      }
    } catch (e) {
      if (e && e.data) {
        ValidationErrorGenerator(e.data);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render a formik form that allows user to edit account values and then
  // submit (triggering appropriate reaction - account create or edit - based
  // up mode)
  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        firstName: accountDetails.firstName,
        lastName: accountDetails.lastName,
        email: accountDetails.email,
        password: accountDetails.password || '',
        newPassword: '',
        pronoun: accountDetails.pronoun,
        gender: accountDetails.gender,
        dietaryRestrictions: accountDetails.dietaryRestrictions,
        phoneNumber: accountDetails.phoneNumber,
        birthDate: accountDetails.birthDate,
      }}
      onSubmit={handleSubmit}
      validationSchema={getValidationSchema(props.mode === ManageAccountModes.CREATE)}
      render={(fp: FormikProps<any>) => (
        <Form onSubmit={fp.handleSubmit} style={{ background: '#fff' }}>
          <FastField
            name={'firstName'}
            label={CONSTANTS.FIRST_NAME_LABEL}
            value={fp.values.firstName}
            component={FormikElements.Input}
            isTight={true}
            disabled={props.mode === ManageAccountModes.EDIT}
            required={true}
          />
          <ErrorMessage component={FormikElements.Error} name="firstName" />
          <FastField
            name={'lastName'}
            label={CONSTANTS.LAST_NAME_LABEL}
            value={fp.values.lastName}
            component={FormikElements.Input}
            isTight={true}
            disabled={props.mode === ManageAccountModes.EDIT}
            required={true}
          />
          <ErrorMessage component={FormikElements.Error} name="lastName" />
          <FastField
            component={FormikElements.FormattedNumber}
            label={CONSTANTS.BIRTH_DATE_LABEL}
            placeholder="MM/DD/YYYY"
            format="##/##/####"
            name={'birthDate'}
            required={true}
            value={fp.values.birthDate}
            disabled={props.mode === ManageAccountModes.EDIT}
          />
          <ErrorMessage component={FormikElements.Error} name="birthDate" />
          <FastField
            name={'email'}
            label={CONSTANTS.EMAIL_LABEL}
            value={fp.values.email}
            component={FormikElements.Input}
            required={true}
          />
          <ErrorMessage component={FormikElements.Error} name="email" />
          <FastField
            component={FormikElements.Input}
            inputType={'password'}
            label={CONSTANTS.PASSWORD_LABEL}
            name={'password'}
            required={props.mode === ManageAccountModes.CREATE}
            value={fp.values.password}
          />
          <ErrorMessage component={FormikElements.Error} name="password" />
          {
            props.mode === ManageAccountModes.EDIT && (
              <>
                <FastField
                  label={CONSTANTS.NEW_PASSWORD_LABEL}
                  component={FormikElements.Input}
                  inputType={'password'}
                  name={'newPassword'}
                />
                <ErrorMessage component={FormikElements.Error} name="newPassword" />
              </>
            )
          }
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
            component={FormikElements.Select}
            creatable={true}
            label={CONSTANTS.PRONOUN_LABEL}
            name={'pronoun'}
            placeholder={CONSTANTS.PRONOUN_PLACEHOLDER}
            options={getOptionsFromEnum(Pronouns)}
            required={true}
            value={fp.values.pronoun}
          />
          <ErrorMessage component={FormikElements.Error} name="gender" />
          <FastField
            component={FormikElements.Select}
            creatable={true}
            label={CONSTANTS.GENDER_LABEL}
            name={'gender'}
            placeholder={CONSTANTS.GENDER_PLACEHOLDER}
            options={getOptionsFromEnum(Genders)}
            required={true}
            value={fp.values.gender}
          />
          <ErrorMessage component={FormikElements.Error} name="pronoun" />
          <FastField
            name={'dietaryRestrictions'}
            isMulti={true}
            label={CONSTANTS.DIETARY_RESTRICTIONS_LABEL}
            placeholder={DietaryRestriction.NONE}
            component={FormikElements.Select}
            options={getOptionsFromEnum(DietaryRestriction)}
            required={true}
            value={fp.values.dietaryRestrictions}
          />
          <ErrorMessage
            component={FormikElements.Error}
            name="dietaryRestrictions"
          />
          <SubmitBtn
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            {props.mode === ManageAccountModes.CREATE ? 'Create Account' : 'Save'}
          </SubmitBtn>
        </Form>
      )}
    />
  );
};

export default WithToasterContainer(ManageAccountForm);

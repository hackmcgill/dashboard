import {
  ErrorMessage,
  FastField,
  Formik,
  FormikActions,
  FormikProps,
  FormikValues,
} from 'formik';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Account } from '../../api';
import { IInviteInfo, UserType } from '../../config';
import * as CONSTANTS from '../../config/constants';
import { Form, SubmitBtn } from '../../shared/Form';
import * as FormikElements from '../../shared/Form/FormikElements';
import ValidationErrorGenerator from '../../shared/Form/validationErrorGenerator';
import { getOptionsFromEnum } from '../../util';
import getValidationSchema from './validationSchema';

interface IInviteFormProps {
  // Optional function that is called when a new invite is sent.
  onSubmitted?: (newInvite: IInviteInfo) => void;
}

export const InviteForm: React.FC<IInviteFormProps> = (props) => {
  // Are we waiting for server to finish processing an invite?
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const formikToInvite = (values: FormikValues): IInviteInfo => ({
    email: values.email,
    accountType: values.accountType,
  });
  /**
   * Function called when formik form is submitted.
   * @param values the formik values
   */
  // const handleSubmit = async (values: any) => {
    const handleSubmit = async (values: FormikValues, {resetForm}: FormikActions<FormikValues>) => {
    // Record that form is being submitted
    setIsSubmitting(true);

    // Turn data entered into form fields into an IInviteInfo
    const newInvite = formikToInvite(values);
    try {
      await Account.invite(newInvite);
      if (props.onSubmitted) {
        props.onSubmitted(newInvite);
      }
    } catch (e: any) {
      if (e && e.data) {
        ValidationErrorGenerator(e.data);
      }
    } finally {
      setIsSubmitting(false);
    }
    toast.success("Sent!"); // success message pop-up
    resetForm(); // reset the form values
    
  };

  /**
   * Stop enter submitting the form.
   * @param keyEvent Event triggered when the user presses a key.
   */
  const onKeyDown = (keyEvent: any) => {
    if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
      keyEvent.preventDefault();
    }
  };

  /**
   * Render the correct formik form
   * @param fp the formik props.
   */
  const renderFormik = (fp: FormikProps<any>) => {
    return (
      <Form
        onKeyDown={onKeyDown}
        onSubmit={fp.handleSubmit}
        onReset={fp.handleReset}
      >
        <FastField
          name={'email'}
          label={CONSTANTS.EMAIL_LABEL}
          placeholder={CONSTANTS.EMAIL_LABEL}
          component={FormikElements.Input}
          value={fp.values.email}
          required={true}
        />
        <ErrorMessage component={FormikElements.Error} name="email" />
        <FastField
          name={'accountType'}
          creatable={false}
          options={getOptionsFromEnum(UserType)}
          label={CONSTANTS.ACCOUNT_TYPE_LABEL}
          placeholder={CONSTANTS.ACCOUNT_TYPE_LABEL}
          component={FormikElements.Select}
          value={fp.values.accountType}
          required={true}
        />
        <ErrorMessage component={FormikElements.Error} name="accountType" />
        <SubmitBtn isLoading={isSubmitting} disabled={isSubmitting}>
          Invite
        </SubmitBtn> 
      </Form>
    );
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      validationSchema={getValidationSchema()}
      initialValues={{
        email: '',
        accountType: UserType.HACKER,
      }}
    >
      {renderFormik}
    </Formik>
  );
};

export default InviteForm;

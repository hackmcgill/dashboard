import {
  ErrorMessage,
  FastField,
  Formik,
  FormikProps,
  FormikValues,
} from 'formik';
import * as React from 'react';
import { object, string } from 'yup';

import { EMAIL_LABEL } from '../config';
import { Form } from '../shared/Form';
import { Error as ErrorComponent, Input } from '../shared/Form/FormikElements';

interface IEmailProps {
  onSubmit: (email: string) => void;
}

export const Email: React.StatelessComponent<IEmailProps> = (
  props: IEmailProps
) => {
  return (
    <Formik
      enableReinitialize={true}
      initialValues={{ email: '' }}
      onSubmit={handleSubmitFactory(props)}
      render={renderFormik}
      validationSchema={getValidationSchema()}
    />
  );
};

function handleSubmitFactory(
  props: IEmailProps
): (values: FormikValues) => void {
  return (values) => {
    props.onSubmit(values.email);
  };
}

function renderFormik(fp: FormikProps<any>) {
  return (
    <Form onSubmit={fp.handleSubmit}>
      <FastField
        name={'email'}
        label={EMAIL_LABEL}
        value={fp.values.email}
        component={Input}
        required={true}
      />
      <ErrorMessage component={ErrorComponent} name="email" />
    </Form>
  );
}

function getValidationSchema() {
  return object().shape({
    email: string()
      .required('Required')
      .email('Must be a valid email'),
  });
}

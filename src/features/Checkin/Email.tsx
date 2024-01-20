import {
  ErrorMessage,
  FastField,
  Formik,
  FormikProps,
  FormikValues,
} from 'formik';
import * as React from 'react';
import { object, string } from 'yup';

import { EMAIL_LABEL } from '../../config';
import { Form, SubmitBtn } from '../../shared/Form';
import {
  Error as ErrorComponent,
  Input,
} from '../../shared/Form/FormikElements';

interface IEmailProps {
  onSubmit: (email: string) => void;
}

export const Email: React.FunctionComponent<IEmailProps> = (
  props: IEmailProps
) => {
  return (
    <Formik
      initialValues={{ email: '' }}
      onSubmit={handleSubmitFactory(props)}
      validationSchema={getValidationSchema()}
    >
      {renderFormik}
    </Formik>
  );
};

function handleSubmitFactory({
  onSubmit,
}: IEmailProps): (
  values: FormikValues,
  { setSubmitting }: FormikProps<any>
) => Promise<void> {
  return async (values, { setSubmitting }: FormikProps<any>) => {
    await onSubmit(values.email);
    setSubmitting(false);
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
      <SubmitBtn isLoading={fp.isSubmitting} disabled={fp.isSubmitting}>
        Check in
      </SubmitBtn>
    </Form>
  );
}

function getValidationSchema() {
  return object().shape({
    email: string().required('Required').email('Must be a valid email'),
  });
}

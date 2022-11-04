import { FastField, Formik, FormikProps, FormikValues } from 'formik';
import React from 'react';
import { ISetting } from '../../config';
import * as CONSTANTS from '../../config/constants';
import { Form, SubmitBtn } from '../../shared/Form';
import * as FormikElements from '../../shared/Form/FormikElements';
import { datetime2input, input2datetime } from '../../util';

interface ISettingsFormProps {
  settings: ISetting;
  submit: (newSettings: ISetting) => void;
}

const SettingsForm: React.FC<ISettingsFormProps> = (
  props: ISettingsFormProps
) => {
  const APPLICATION_OPEN = datetime2input(props.settings.APPLICATION_OPEN);
  const APPLICATION_CLOSE = datetime2input(props.settings.APPLICATION_CLOSE);
  const APPLICATION_CONFIRM = datetime2input(
    props.settings.APPLICATION_CONFIRM
  );
  const IS_REMOTE = props.settings.IS_REMOTE;
  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        APPLICATION_OPEN,
        APPLICATION_CLOSE,
        APPLICATION_CONFIRM,
        IS_REMOTE,
      }}
      onSubmit={onSubmitFactory(props)}
      render={renderForm}
    />
  );
};

/**
 * @description function that captures the props in a closure.
 * @param props the props that are inputted into SettingsForm
 */
function onSubmitFactory(props: ISettingsFormProps) {
  return (values: FormikValues) => {
    return handleSubmit(values, props.submit);
  };
}

function renderForm(fp: FormikProps<ISetting>) {
  return (
    <Form onSubmit={fp.handleSubmit}>
      <FastField
        name={'APPLICATION_OPEN'}
        label={CONSTANTS.SETTINGS_OPEN_TIME_LABEL}
        value={fp.values.APPLICATION_OPEN}
        component={FormikElements.FormattedNumber}
        placeholder="MM/DD/YYYY HH:MM:SS"
        format="##/##/#### ##:##:##"
        required={true}
      />
      <FastField
        name={'APPLICATION_CLOSE'}
        label={CONSTANTS.SETTINGS_CLOSE_TIME_LABEL}
        value={fp.values.APPLICATION_CLOSE}
        component={FormikElements.FormattedNumber}
        placeholder="MM/DD/YYYY HH:MM:SS"
        format="##/##/#### ##:##:##"
        required={true}
      />
      <FastField
        name={'APPLICATION_CONFIRM'}
        label={CONSTANTS.SETTINGS_CONFIRM_TIME_LABEL}
        value={fp.values.APPLICATION_CONFIRM}
        component={FormikElements.FormattedNumber}
        placeholder="MM/DD/YYYY HH:MM:SS"
        format="##/##/#### ##:##:##"
        required={true}
      />
      <FastField
        name={'IS_REMOTE'}
        label={CONSTANTS.SETTINGS_IS_REMOTE_LABEL}
        value={fp.values.IS_REMOTE}
        component={FormikElements.Checkbox}
        required={true}
      />
      <SubmitBtn>Update</SubmitBtn>
    </Form>
  );
}

function handleSubmit(
  values: FormikValues,
  submit: (settings: Partial<ISetting>) => void
) {
  submit({
    APPLICATION_OPEN: input2datetime(values.APPLICATION_OPEN),
    APPLICATION_CLOSE: input2datetime(values.APPLICATION_CLOSE),
    APPLICATION_CONFIRM: input2datetime(values.APPLICATION_CONFIRM),
    IS_REMOTE: values.IS_REMOTE,
  });
}

export default SettingsForm;

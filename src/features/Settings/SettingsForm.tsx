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
  const openTime = datetime2input(props.settings.openTime);
  const closeTime = datetime2input(props.settings.closeTime);
  const confirmTime = datetime2input(props.settings.confirmTime);
  const isRemote = props.settings.isRemote;
  return (
    <Formik
      enableReinitialize={true}
      initialValues={{ openTime, closeTime, confirmTime, isRemote }}
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
        name={'openTime'}
        label={CONSTANTS.SETTINGS_OPEN_TIME_LABEL}
        value={fp.values.openTime}
        component={FormikElements.FormattedNumber}
        placeholder="MM/DD/YYYY HH:MM:SS"
        format="##/##/#### ##:##:##"
        required={true}
      />
      <FastField
        name={'closeTime'}
        label={CONSTANTS.SETTINGS_CLOSE_TIME_LABEL}
        value={fp.values.closeTime}
        component={FormikElements.FormattedNumber}
        placeholder="MM/DD/YYYY HH:MM:SS"
        format="##/##/#### ##:##:##"
        required={true}
      />
      <FastField
        name={'confirmTime'}
        label={CONSTANTS.SETTINGS_CONFIRM_TIME_LABEL}
        value={fp.values.confirmTime}
        component={FormikElements.FormattedNumber}
        placeholder="MM/DD/YYYY HH:MM:SS"
        format="##/##/#### ##:##:##"
        required={true}
      />
      <FastField
        name={'isRemote'}
        label={CONSTANTS.SETTINGS_IS_REMOTE_LABEL}
        value={fp.values.isRemote}
        component={FormikElements.Checkbox}
        required={true}
      />
      <SubmitBtn>Update</SubmitBtn>
    </Form>
  );
}

function handleSubmit(
  values: FormikValues,
  submit: (settings: ISetting) => void
) {
  submit({
    openTime: input2datetime(values.openTime),
    closeTime: input2datetime(values.closeTime),
    confirmTime: input2datetime(values.confirmTime),
    isRemote: values.isRemote,
  });
}

export default SettingsForm;

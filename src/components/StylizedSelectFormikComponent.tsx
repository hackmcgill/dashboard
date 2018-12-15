import { FieldProps } from 'formik';
import * as React from 'react';
import LabelTextComponent from '../components/LabelTextComponent';
import { Label, StyledCreatableSelect, StyledSelect } from '../shared';

export interface IStylizedSelectFormikProps {
  selectId: string;
  label: string;
  options: Array<{ label: string; value: string }>;
  isMulti: boolean;
  placeholder?: string;
  value?: string | string[];
  creatable: boolean;
  required?: boolean;
}

const StylizedSelectFormikComponent: React.StatelessComponent<
  IStylizedSelectFormikProps & FieldProps
> = (props) => {
  const handleChange = props.isMulti ? handleChangeMulti : handleChangeSingle;

  const commonProps = {
    className: 'react-select-container',
    classNamePrefix: 'react-select',
    id: props.selectId,
    onChange: handleChange(props),
    options: props.options,
    isMulti: props.isMulti,
    placeholder: props.placeholder || 'Select...',
    value: generateValue(props.value),
  };
  return (
    <Label>
      <LabelTextComponent label={props.label} required={props.required} />
      {props.creatable ? (
        <StyledCreatableSelect
          {...commonProps}
          allowCreateWhileLoading={true}
          createOptionPosition={'first'}
        />
      ) : (
        <StyledSelect {...commonProps} />
      )}
    </Label>
  );
};

function generateValue(value: string | string[] | undefined) {
  if (value && typeof value === 'string') {
    return { label: value, value };
  } else if (value && Array.isArray(value)) {
    return value.map((val) => ({ label: val, value: val }));
  } else {
    return '';
  }
}

/**
 * Function factory that generates function to handle changes in user's choice.
 * @param props The props passed into the component.
 * @returns the function that handles changes to the choices provided by the user.
 */
function handleChangeSingle(
  props: IStylizedSelectFormikProps & FieldProps
): (newValue: { label: string; value: string }) => void {
  return (newValue: { label: string; value: string }) => {
    const field = props.field;
    const form = props.form;
    if (newValue && newValue.value) {
      form.setFieldValue(field.name, newValue.value);
    } else {
      form.setFieldValue(field.name, '');
    }
  };
}
/**
 * Function factory that generates function to handle changes in user's choice.
 * @param props The props passed into the component.
 * @returns the function that handles changes to the choices provided by the user.
 */
function handleChangeMulti(
  props: IStylizedSelectFormikProps & FieldProps
): (newValue: [{ label: string; value: string }]) => void {
  return (newValue: [{ label: string; value: string }]) => {
    const field = props.field;
    const form = props.form;
    const skills = newValue.map((value) => value.value);
    form.setFieldValue(field.name, skills);
  };
}

export default StylizedSelectFormikComponent;

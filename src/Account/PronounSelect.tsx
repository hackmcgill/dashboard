import * as React from 'react';
import { Pronouns } from '../config';
import { Label, LabelText, StyledCreatableSelect } from '../shared/Form';
import { getOptionsFromEnum } from '../util';

interface IPronounInputProp {
  value?: Pronouns | string;
  onPronounChanged: (selectedOptions: string) => void;
  label?: string;
  required?: boolean;
  placeholder: string;
}

const PronounInput: React.SFC<IPronounInputProp> = (props) => {
  const options = getOptionsFromEnum(Pronouns);
  return (
    <Label>
      <LabelText label={props.label} required={props.required} />
      <StyledCreatableSelect
        value={{ label: props.value, value: props.value }}
        id={'pronoun-selector'}
        inputId={'pronoun-selector-input'}
        className="react-select-container"
        classNamePrefix="react-select"
        onChange={handleChange(props)}
        options={options}
        allowCreateWhileLoading={true}
        createOptionPosition={'first'}
      />
    </Label>
  );
};

function handleChange(
  props: IPronounInputProp
): (newValue: { label: string; value: string }) => void {
  return (newValue: { label: string; value: string }) =>
    props.onPronounChanged(String(newValue.value || ''));
}

export default PronounInput;

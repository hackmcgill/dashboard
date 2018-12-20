import * as React from 'react';

import { DietaryRestriction } from '../config';
import { Label, LabelText, StyledCreatableSelect } from '../shared/Form';
import { getOptionsFromEnum } from '../util';

/**
 * DietaryRestrictionsComponent props
 */
export interface IDietRestrictionProps {
  value?: string[];
  label: string;
  required?: boolean;
  onDietaryRestrictionsChanged: (selectedOptions: string[]) => void;
}

/**
 * DietaryRestrictionsComponent renders a dropdown for users to select their dietary restrictions, and
 * potentially create their own restrictions.
 */
const DietaryRestrictionsComponent: React.SFC<IDietRestrictionProps> = (
  props
) => {
  const options = getOptionsFromEnum(DietaryRestriction);
  return (
    <Label>
      <LabelText label={props.label} required={props.required} />
      <StyledCreatableSelect
        value={preselectOptions(options, props.value)}
        className="react-select-container"
        classNamePrefix="react-select"
        id={'diet-restrictions'}
        inputId={'diet-restrictions-input'}
        isMulti={true}
        onChange={handleChange(props)}
        options={options}
        allowCreateWhileLoading={true}
        createOptionPosition={'first'}
      />
    </Label>
  );
};
function preselectOptions(
  originalOptions: Array<{ label: string; value: string }>,
  values: string[] | undefined
): Array<{ label: string; value: string }> {
  const selectedOpts: Array<{ label: string; value: string }> = [];
  if (!values) {
    return selectedOpts;
  }
  values.forEach((val: string) => {
    const found = originalOptions.find((origOpt) => origOpt.label === val);
    if (!found) {
      originalOptions.push({ label: val, value: val });
    }
    selectedOpts.push({ label: val, value: val });
  });
  return selectedOpts;
}

/**
 * Function factory that generates function to handle changes in user's choice.
 * @param props The props passed into the DietaryRestrictions component.
 * @returns the function that handles changes to the choices provided by the user.
 */
function handleChange(
  props: IDietRestrictionProps
): (event: Array<{ label: string; value: string }>) => void {
  return (newValue: Array<{ label: string; value: string }>) => {
    const values = newValue.map<string>((option) => option.value);
    props.onDietaryRestrictionsChanged(values);
  };
}

export default DietaryRestrictionsComponent;

import * as React from 'react';
import { ShirtSize } from '../config';
import { Label, StyledSelect } from '../shared';
import LabelTextComponent from './LabelTextComponent';

interface IShirtSizeProps {
  value?: ShirtSize | string;
  label: string;
  required?: boolean;
  onShirtSizeChanged: (selectedOptions: ShirtSize) => void;
}

const ShirtSizeComponent: React.StatelessComponent<IShirtSizeProps> = (
  props
) => {
  const options: Array<{ label: string; value: string }> = [
    { label: ShirtSize.XS, value: ShirtSize.XS },
    { label: ShirtSize.S, value: ShirtSize.S },
    { label: ShirtSize.M, value: ShirtSize.M },
    { label: ShirtSize.L, value: ShirtSize.L },
    { label: ShirtSize.XL, value: ShirtSize.XL },
    { label: ShirtSize.XXL, value: ShirtSize.XXL },
  ];
  return (
    <Label>
      <LabelTextComponent label={props.label} required={props.required} />
      <StyledSelect
        value={{ label: props.value }}
        id={'shirt-size-selector'}
        inputId={'shirt-size-selector-input'}
        className="react-select-container"
        classNamePrefix="react-select"
        onChange={handleChange(props)}
        options={options}
      />
    </Label>
  );
};

/**
 * Function factory that generates function to handle changes in user's choice.
 * @param props The props passed into the ShirtSizeComponent component.
 * @returns the function that handles changes to the choices provided by the user.
 */
function handleChange(
  props: IShirtSizeProps
): (newValue: { label: ShirtSize; value: ShirtSize }) => void {
  return (newValue: { label: ShirtSize; value: ShirtSize }) =>
    props.onShirtSizeChanged(newValue.value);
}

export default ShirtSizeComponent;

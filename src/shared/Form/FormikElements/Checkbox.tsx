import { Box, Flex } from '@rebass/grid';
import { FieldProps } from 'formik';
import * as React from 'react';
import styled from 'styled-components';
import { Checkbox, Label, LabelText } from '..';
import { FormDescription } from '../../Elements';

interface ICheckboxProps {
  label: string | React.Component;
  value?: boolean;
  required?: boolean;
  isTight?: boolean;
  subtitle?: string;
}

const CheckboxContainer = styled.div`
  input {
    width: 24px;
    height: 24px;
    appearance: none;
    border: 1px solid #d2d2d2;
    border-radius: 4px;
    cursor: pointer;
    outline: none;
  }

  input:checked {
    background-color: #f2463a;
    border-color: #f2463a;
  }

  /* Checkmark icon based on StackOverflow icon by dayuloli
  https://stackoverflow.com/questions/21968531/how-to-draw-a-checkmark-tick-using-css */
  .checkmark {
    width: 22px;
    height: 22px;
    -ms-transform: rotate(45deg); /* IE 9 */
    -webkit-transform: rotate(45deg); /* Chrome, Safari, Opera */
    transform: rotate(45deg);
    position: relative;
    left: 25px;
    z-index: 1;
    top: 6px;
    display: inline-block;
    cursor: pointer;
  }

  .checkmark_stem {
    position: absolute;
    width: 3px;
    height: 9px;
    background-color: #fff;
    left: 11px;
    top: 6px;
  }

  .checkmark_kick {
    position: absolute;
    width: 3px;
    height: 3px;
    background-color: #fff;
    left: 8px;
    top: 12px;
  }

  input:not(:checked) ~ .checkmark {
    display: none;
  }
`;

const FormikCheckbox: React.StatelessComponent<ICheckboxProps & FieldProps> = ({
  isTight,
  subtitle,
  label,
  required,
  field,
}) => {
  const labelElement = typeof label === 'string' ? <span>{label}</span> : label;
  return (
    <Box mb={isTight ? 0 : '20px'}>
      <Label fontWeight="normal">
        <Flex
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <LabelText label={labelElement} required={required} />
          <CheckboxContainer>
            <span className="checkmark">
              <div className="checkmark_stem" />
              <div className="checkmark_kick" />
            </span>
            <Checkbox {...field} checked={field.value} />
          </CheckboxContainer>
        </Flex>
      </Label>
      <FormDescription maxWidth={'90%'}>{subtitle}</FormDescription>
    </Box>
  );
};

export { FormikCheckbox as Checkbox };

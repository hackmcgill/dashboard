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
    width: 22px;
    height: 22px;

    appearance: none;
    border-radius: 4px;
    cursor: pointer;
    outline: none;
    margin: 0;
    box-shadow: 2px 4px 16px 5px ${(props) => props.theme.colors.greyLight};
  }

  input:checked {
    background-color: #f2463a;
    border-color: #f2463a;
  }

  /* Checkmark icon based on StackOverflow icon by dayuloli
  https://stackoverflow.com/questions/21968531/how-to-draw-a-checkmark-tick-using-css */
  .checkmark {
    width: auto;
    height: 18px;
    -ms-transform: rotate(45deg); /* IE 9 */
    -webkit-transform: rotate(45deg); /* Chrome, Safari, Opera */
    transform: rotate(45deg);
    position: relative;
    left: 4px;
    top: -7px;
    display: inline-block;
    cursor: pointer;
    z-index: 100;
  }

  .checkmark_stem {
    position: absolute;
    width: 2px;
    height: 10px;
    background-color: #fff;
    left: 11px;
    top: 3px;
  }

  .checkmark_kick {
    position: absolute;
    width: 6px;
    height: 2px;
    background-color: #fff;
    left: 7px;
    top: 13px;
  }

  input:not(:checked) ~ .checkmark {
    display: none;
  }
`;

const FormikCheckbox: React.FC<ICheckboxProps & FieldProps> = ({
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
          justifyContent={'flex-start'}
        >
          <CheckboxContainer>
            <Flex>
              <span className="checkmark">
                <div className="checkmark_stem" />
                <div className="checkmark_kick" />
              </span>
              <Checkbox {...field} checked={field.value} />
            </Flex>
          </CheckboxContainer>
          <Box ml="18px" style={{ position: 'relative', top: '-1px' }}>
            <LabelText label={labelElement} required={required} />
          </Box>
        </Flex>
      </Label>
      <FormDescription marginLeft="40px">{subtitle}</FormDescription>
    </Box>
  );
};

export { FormikCheckbox as Checkbox };

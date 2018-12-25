import { Box, Flex } from '@rebass/grid';
import { FieldProps } from 'formik';
import * as React from 'react';
import { Checkbox, Label, LabelText } from '..';
import { FormDescription } from '../../Elements';

interface ICheckboxProps {
  label: string | React.Component;
  value?: boolean;
  required?: boolean;
  isTight?: boolean;
  subtitle?: string;
}

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
          <Checkbox {...field} checked={field.value} />
        </Flex>
      </Label>
      <FormDescription>{subtitle}</FormDescription>
    </Box>
  );
};

export { FormikCheckbox as Checkbox };

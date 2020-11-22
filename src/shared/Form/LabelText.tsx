import React from 'react';
import { Box, Flex } from '@rebass/grid';
import { REQUIRED_INPUT, OPTIONAL_INPUT } from '../../config';
import { RequiredInputLabel, SecondaryInfoText } from './';
import theme from '../Styles/theme';

interface ILabelTextProps {
  // Label text
  label: any;

  // Is this a required field
  required?: boolean;

  // Should this field display a * to let user know it's required
  // (a field can be required, but still have showRequiredLabel set to false)
  showRequiredLabel?: boolean;

  // Should this field display a (optional) message to let user know
  // it's safe to skip this field?
  showOptionalLabel?: boolean;

  // Subtext underlabel, explaining in more detail
  secondaryInfo?: any;
}

export const LabelText: React.FC<ILabelTextProps> = (
  props: ILabelTextProps
) => {
  const requiredText =
    props.showRequiredLabel ?
      <RequiredInputLabel>{REQUIRED_INPUT}</RequiredInputLabel> :
      props.showOptionalLabel ?
        <span style={{ marginLeft: '6px', color: theme.colors.black60, fontSize: '14px' }}>{OPTIONAL_INPUT}</span> :
        null;

  const secondaryInfo = (
    <SecondaryInfoText>{props.secondaryInfo}</SecondaryInfoText>
  );
  return (
    <Flex flexDirection={'row'} justifyContent={'space-between'}>
      <Box>
        {props.label}
        {requiredText}
      </Box>
      {props.secondaryInfo && <Box>{secondaryInfo}</Box>}
    </Flex>
  );
};

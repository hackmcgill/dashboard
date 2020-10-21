import { Box, Flex } from '@rebass/grid';
import * as React from 'react';
import { REQUIRED_INPUT } from '../../config';
import { RequiredInputLabel, SecondaryInfoText } from './';

interface ILabelTextProps {
  // Label text
  label: any;

  // Is this a required field
  required?: boolean;

  // Should this field display a * to let user know it's required
  // (a field can be required, but still have showRequiredLabel set to false)
  showRequiredLabel?: boolean;

  // Subtext underlabel, explaining in more detail
  secondaryInfo?: any;
}

export const LabelText: React.FC<ILabelTextProps> = (
  props: ILabelTextProps
) => {
  const requiredText = (
    <RequiredInputLabel>
      {props.showRequiredLabel ? REQUIRED_INPUT : ''}
    </RequiredInputLabel>
  );
  const secondaryInfo = (
    <SecondaryInfoText>{props.secondaryInfo}</SecondaryInfoText>
  );
  return (
    <Flex flexDirection={'row'} justifyContent={'space-between'}>
      <Box ml="2px">
        {props.label}
        {requiredText}
      </Box>
      {props.secondaryInfo && <Box mr="8px">{secondaryInfo}</Box>}
    </Flex>
  );
};

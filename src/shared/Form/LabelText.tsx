import { Box, Flex } from '@rebass/grid';
import * as React from 'react';
import { REQUIRED_INPUT } from '../../config';
import { RequiredInputLabel, SecondaryInfoText } from './';

interface ILabelTextProps {
  label: any;
  showRequiredLabel?: boolean;
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

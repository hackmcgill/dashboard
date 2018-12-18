import { Box, Flex } from '@rebass/grid';
import * as React from 'react';
import { REQUIRED_INPUT } from '../../config';
import { RequiredInputLabel, SecondaryInfoText } from './';

interface ILabelTextProps {
  label: any;
  required?: boolean;
  secondaryInfo?: any;
}

export const LabelText: React.StatelessComponent<ILabelTextProps> = (
  props: ILabelTextProps
) => {
  const requiredText = (
    <RequiredInputLabel>
      {props.required ? REQUIRED_INPUT : ''}
    </RequiredInputLabel>
  );
  const secondaryInfo = (
    <SecondaryInfoText>{props.secondaryInfo}</SecondaryInfoText>
  );
  return (
    <Flex flexDirection={'row'} justifyContent={'space-between'}>
      <Box ml="10px">
        {props.label}
        {requiredText}
      </Box>
      {props.secondaryInfo && <Box mr="10px">{secondaryInfo}</Box>}
    </Flex>
  );
};

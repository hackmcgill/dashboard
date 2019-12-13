import { Box, Flex } from '@rebass/grid';
import * as React from 'react';

import { Button, IButtonProps } from '../Elements';

export const ResetBtn: React.StatelessComponent<
  IButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>
> = (props) => (
  <Flex justifyContent={'center'} mt={'50px'} mb={'50px'}>
    <Box>
      <Button type={'reset'} {...props}>
        {props.children}
      </Button>
    </Box>
  </Flex>
);

import { Box, Flex } from '@rebass/grid';
import * as React from 'react';

import { Button, ButtonVariant, IButtonProps } from '../Elements';

export const SubmitBtn: React.FC<
  IButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>
> = (props) => (
  <Flex justifyContent={'left'} mt={'20px'} mb={'20px'}>
    <Box>
      <Button type={'submit'} {...props} variant={ButtonVariant.Primary}>
        {props.children}
      </Button>
    </Box>
  </Flex>
);

import React from 'react';

import { Button, IButtonProps } from '../Elements';

export const ResetBtn: React.FC<
  IButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>
> = (props) => (
  <Button type={'reset'} style={{ marginRight: '24px' }} {...props}>
    {props.children}
  </Button>
);

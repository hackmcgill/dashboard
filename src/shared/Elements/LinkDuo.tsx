import * as React from 'react';
import { Link, LinkProps } from 'react-router-dom';

export const LinkDuo: React.StatelessComponent<LinkProps> = (props: any) => {
  const { to, ...rest } = props;
  return /^https?:\/\//.test(to) ? (
    <a href={to} {...rest} target={'_blank'}>
      {props.children}
    </a>
  ) : (
    <Link to={to} {...rest}>
      {props.children}
    </Link>
  );
};

import * as React from 'react';
import { H2 } from '../../shared/Elements';
import theme from '../../shared/Styles/theme';

interface IProps {
  title: string;
  hidden?: boolean;
  children?: React.ReactNode;
}

const SingleHackerSection: React.FunctionComponent<IProps> = ({
  title,
  children,
  hidden,
}) => {
  return hidden ? (
    <div />
  ) : (
    <section>
      <hr />
      <H2 color={theme.colors.black60}>{title}</H2>
      {children}
    </section>
  );
};

export default SingleHackerSection;

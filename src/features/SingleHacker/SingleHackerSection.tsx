import * as React from 'react';
import { H2 } from '../../shared/Elements';
import theme from '../../shared/Styles/theme';

interface IProps {
  title: string;
  hidden?: boolean;
}

const SingleHackerSection: React.SFC<IProps> = ({
  title,
  children,
  hidden,
}) => {
  return hidden ? (
    <div />
  ) : (
    <section>
      <hr />
      <H2 color={theme.colors.grey}>{title}</H2>
      {children}
    </section>
  );
};

export default SingleHackerSection;

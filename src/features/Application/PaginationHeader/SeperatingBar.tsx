import React from 'react';
import theme from '../../../shared/Styles/theme';

interface ISeparatingBarProps {
  current: boolean;
}

const SeparatingBar: React.FC<ISeparatingBarProps> = (props) => {
  const pageNotSelectedBarStyle = {
    background: theme.colors.black40,
    width: '160px',
    height: '2px',
    textAlign: 'center' as 'center',
    verticalAlign: 'center',
  };

  const pageSelectedBarStyle = {
    ...pageNotSelectedBarStyle,
    background: theme.colors.purple,
    boxShadow: `2px 2px 16px ${theme.colors.purpleLight}`,
  };

  const barStyle = props.current
    ? pageSelectedBarStyle
    : pageNotSelectedBarStyle;

  return <div style={barStyle} />;
};

export default SeparatingBar;

import React from 'react';
import theme from '../../../shared/Styles/theme';

interface ISeparatingBarProps {
  current: boolean;
  totalPages?: number;
}
/**
 * Dividing bar between NumberBubble components
 */
const SeparatingBar: React.FC<ISeparatingBarProps> = (props) => {
  const pageNotSelectedBarStyle = {
    background: theme.colors.black40,
    width: props.totalPages ? `min(calc(100% / ${props.totalPages}), 160px)` : '160px',
    height: '2px',
    textAlign: 'center' as 'center',
    verticalAlign: 'center',
  };

  const pageSelectedBarStyle = {
    ...pageNotSelectedBarStyle,
    background: theme.colors.purple,
    boxShadow: `2px 2px 16px 2px ${theme.colors.blueLight}`,
  };

  const barStyle = props.current // The bar before the current page will be purple
    ? pageSelectedBarStyle
    : pageNotSelectedBarStyle;

  return <div style={barStyle} />;
};

export default SeparatingBar;

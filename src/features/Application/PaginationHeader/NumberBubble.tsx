import React from 'react';
import theme from '../../../shared/Styles/theme';

interface INumberBubble {
  fill: boolean;
  current: boolean;
  children?: React.ReactNode;
}

/**
 * Page number Bubble that displays child component
 */
const NumberBubble: React.FC<INumberBubble> = (props) => {
  const notSelectedBubble = {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    background: 'none',
    border: `2px solid ${theme.colors.black40}`,
    boxSizing: 'border-box' as 'border-box',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    verticalAlign: 'center',
  };
  const selectedBubble = {
    ...notSelectedBubble,
    background: theme.colors.purple,
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    border: 'none',
  };
  const currentBubble = {
    ...selectedBubble,
    boxShadow: `2px 2px 16px ${theme.colors.purpleLight}`,
  };

  const bubbleStyle = props.fill
    ? props.current
      ? currentBubble // Display purple bubble with shadow if page is the current one the user is on
      : selectedBubble // Display purple bubble if the bubble should be filled but is not current
    : notSelectedBubble; // Display grey bubble if no fill

  return <div style={bubbleStyle}>{props.children}</div>;
};

export default NumberBubble;

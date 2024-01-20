import React from 'react';
import done from '../../../assets/images/done.svg';
import { Image } from '../../../shared/Elements';
import theme from '../../../shared/Styles/theme';

interface INumberPageText {
  pageNumber: number;
  fill: boolean;
  check: boolean;
}

/**
 * Displays either a checkmark or page number depending on props
 * Should be children prop of NumberBubble
 */
const NumberPageText: React.FC<INumberPageText> = (props) => {
  if (!props.check) {
    // Number only displays if we are not displaying a checkmark
    const notSelectedTextStyle = {
      position: 'relative' as 'relative',
      fontSize: '12px',
      color: theme.colors.black40,
      textAlign: 'center' as 'center',
      fontFamily: theme.fonts.header,
      lineHeight: '24px',
    };

    const selectedTextStyle = {
      ...notSelectedTextStyle,
      color: 'white',
    };
    const textStyle = props.fill ? selectedTextStyle : notSelectedTextStyle; // Style changes depending on props.fill

    return <span style={textStyle}>{props.pageNumber}</span>;
  } else {
    // Checkmark svg
    return <Image src={done} />;
  }
};

export default NumberPageText;

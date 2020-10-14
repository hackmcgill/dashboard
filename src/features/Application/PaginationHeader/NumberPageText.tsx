import React from 'react';
import done from '../../../assets/images/done.svg';
import { Image, Paragraph } from '../../../shared/Elements';
import theme from '../../../shared/Styles/theme';

interface INumberPageText {
  pageNumber: number;
  fill: boolean;
  check: boolean;
}

const NumberPageText: React.FC<INumberPageText> = (props) => {
  if (!props.check) {
    const notSelectedTextStyle = {
      position: 'relative' as 'relative',
      fontSize: '12px',
      color: theme.colors.black40,
      textAlign: 'center' as 'center',
    };

    const selectedTextStyle = {
      ...notSelectedTextStyle,
      color: 'white',
    };
    const textStyle = props.fill ? selectedTextStyle : notSelectedTextStyle;

    return <Paragraph style={textStyle}>{props.pageNumber}</Paragraph>;
  } else {
    return <Image src={done} />;
  }
};

export default NumberPageText;

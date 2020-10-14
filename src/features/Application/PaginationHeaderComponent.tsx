// import { useState } from 'react';
import { FunctionComponent } from 'react';
import * as React from 'react';
import done from '../../assets/images/done.svg';
import { Image, Paragraph } from '../../shared/Elements';
import theme from '../../shared/Styles/theme';

interface ISeparatingBarProps {
  current: boolean;
}

const SeparatingBar: FunctionComponent<ISeparatingBarProps> = (props) => {
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

interface INumberPageText {
  pageNumber: number;
  fill: boolean;
  check: boolean;
}

const NumberPageText: FunctionComponent<INumberPageText> = (props) => {
  if (!props.check) {
    const notSelectedTextStyle = {
      position: 'relative' as 'relative',
      fontSize: '12px',
      color: theme.colors.black40,
      textAlign: 'center' as 'center',
      // top: '-65%',
      // transform: 'translateY(-50%)',
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

interface INumberBubble {
  fill: boolean;
  current: boolean;
}

const NumberBubble: FunctionComponent<INumberBubble> = (props) => {
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
      ? currentBubble
      : selectedBubble
    : notSelectedBubble;

  return <div style={bubbleStyle}>{props.children}</div>;
};

function isFilled(i: number, pageNumber: number): boolean {
  return i <= pageNumber;
}

function isCheck(
  i: number,
  pageNumber: number,
  lastCompletedPage: number
): boolean {
  return i < lastCompletedPage && i !== pageNumber;
}

interface IPaginationHeaderProps {
  pageNumber: number;
  totalPages: number;
  lastCompletedPage: number;
}

const PaginationHeader: FunctionComponent<IPaginationHeaderProps> = (props) => {
  const elements = [];

  for (let i = 0; i < props.totalPages; i++) {
    const pageNumber = i + 1;
    const isCurrentPage = pageNumber === props.pageNumber - 1;
    const fill = isFilled(pageNumber, props.pageNumber);
    const checked = isCheck(
      pageNumber,
      props.pageNumber,
      props.lastCompletedPage
    );

    elements.push(
      <NumberBubble fill={fill} current={isCurrentPage}>
        <NumberPageText pageNumber={pageNumber} fill={fill} check={checked} />
      </NumberBubble>
    );

    if (i !== props.totalPages - 1) {
      elements.push(<SeparatingBar current={isCurrentPage} />);
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {elements}
    </div>
  );
};

export default PaginationHeader;

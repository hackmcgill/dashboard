// import { useState } from 'react';
import * as React from 'react';
import { Paragraph } from '../../shared/Elements';

export default class PaginationHeader extends React.Component<
  IPaginationHeaderProps,
  IPaginationHeaderState
> {
  constructor(props: IPaginationHeaderProps) {
    super(props);
    this.state = {
      pageNumber: props.pageNumber,
    };
  }

  public render() {
    const elements = [];

    const pageNotSelectedTextStyle = {
      position: 'relative' as 'relative',
      fontSize: '12px',
      color: '#A6A6A6',
      textAlign: 'center' as 'center',
      // top: '-65%',
      // transform: 'translateY(-50%)',
    };

    const pageNotSelectedCircleStyle = {
      width: '24px',
      height: '24px',
      borderRadius: '50%',
      background: 'none',
      border: '2px solid #A6A6A6',
      boxSizing: 'border-box' as 'border-box',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      verticalAlign: 'center',
    };

    const pageNotSelectedBarStyle = {
      background: '#A6A6A6',
      width: '160px',
      height: '2px',
      left: '364px',
      top: '175px',
      textAlign: 'center' as 'center',
      verticalAlign: 'center',
    };

    const pageSelectedBarStyle = {
      ...pageNotSelectedBarStyle,
      background: '#5C63AB',
      boxShadow: '2px 2px 16px rgba(0, 105, 255, 0.25)',
    };

    const pageSelectedTextStyle = {
      ...pageNotSelectedTextStyle,
      color: 'white',
    };

    const pageSelectedCircleStyle = {
      ...pageNotSelectedCircleStyle,
      background: '#5C63AB',
      width: '24px',
      height: '24px',
      borderRadius: '50%',
      border: 'none',
      boxShadow: '2px 2px 16px rgba(0, 105, 255, 0.25)',
    };

    // console.log(this.props.pageNumber);

    for (let i = 0; i < this.props.totalPages; i++) {
      let circleStyle = pageNotSelectedCircleStyle;
      let barStyle = pageNotSelectedBarStyle;
      let textStyle = pageNotSelectedTextStyle;

      if (i <= this.state.pageNumber - 1) {
        circleStyle = pageSelectedCircleStyle;
        textStyle = pageSelectedTextStyle;
      }

      if (i === this.state.pageNumber - 2) {
        barStyle = pageSelectedBarStyle;
      }

      elements.push(
        <div style={circleStyle}>
          <Paragraph style={textStyle}>{i + 1}</Paragraph>
        </div>
      );

      if (i !== this.props.totalPages - 1) {
        elements.push(<div style={barStyle} />);
      }
    }
    // console.log(elements);
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
  }
}

interface IPaginationHeaderProps {
  pageNumber: number;
  totalPages: number;
}

interface IPaginationHeaderState {
  pageNumber: number;
}

// import { useState } from 'react';
import * as React from 'react';
import done from '../../assets/images/done.svg';
import { Image, Paragraph } from '../../shared/Elements';
import theme from '../../shared/Styles/theme';

export default class PaginationHeader extends React.Component<
  IPaginationHeaderProps
> {
  constructor(props: IPaginationHeaderProps) {
    super(props);
    this.state = {
      pageNumber: props.pageNumber,
      lastCompletedPage: props.lastCompletedPage,
    };
  }

  public render() {
    const elements = [];

    const pageNotSelectedTextStyle = {
      position: 'relative' as 'relative',
      fontSize: '12px',
      color: theme.colors.black40,
      textAlign: 'center' as 'center',
      // top: '-65%',
      // transform: 'translateY(-50%)',
    };

    const pageNotSelectedCircleStyle = {
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

    const pageNotSelectedBarStyle = {
      background: theme.colors.black40,
      // width: `${(500 - (this.props.totalPages - 1) * 24) / (this.props.totalPages - 1)}px`, // Design specifies 160px but ManageApplicationContainer has not been updated
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

    const pageSelectedTextStyle = {
      ...pageNotSelectedTextStyle,
      color: 'white',
    };

    const pageSelectedCircleStyle = {
      ...pageNotSelectedCircleStyle,
      background: theme.colors.purple,
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

      const pageNumber = i + 1;

      const fill = this.isFilled(pageNumber);
      const checked = this.isCheck(pageNumber);

      if (fill) {
        circleStyle = pageSelectedCircleStyle;
        textStyle = pageSelectedTextStyle;
      }

      if (!checked) {
        elements.push(
          <div style={circleStyle}>
            <Paragraph style={textStyle}>{i + 1}</Paragraph>
          </div>
        );
      } else {
        elements.push(
          <div style={circleStyle}>
            <Image src={done} />
          </div>
        );
      }

      if (pageNumber === this.props.pageNumber - 1) {
        // Only display purple bar before current page
        barStyle = pageSelectedBarStyle;
      }

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

  private isFilled(i: number): boolean {
    return i <= this.props.pageNumber;
  }

  private isCheck(i: number): boolean {
    return i < this.props.lastCompletedPage && i !== this.props.pageNumber;
  }
}

interface IPaginationHeaderProps {
  pageNumber: number;
  totalPages: number;
  lastCompletedPage: number;
}
//
// interface IPaginationHeaderState {
//   pageNumber: number;
//   lastCompletedPage: number;
// }

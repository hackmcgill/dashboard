import React from 'react';
import NumberBubble from './NumberBubble';
import NumberPageText from './NumberPageText';
import SeparatingBar from './SeperatingBar';

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

const PaginationHeader: React.FC<IPaginationHeaderProps> = (props) => {
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

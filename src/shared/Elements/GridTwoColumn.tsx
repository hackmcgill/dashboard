// import React from 'react';
import styled from 'styled-components';

// const GridTwoColumn: React.FC = (props) => {
//   const style = {
//     display: 'grid',
//     gridTemplateColumns: 'repeat( auto-fill, minmax(min(80vw, 400px), 1fr) )',
//     columnGap: '80px',
//     rowGap: '20px',
//     marginBottom: '60px',
//   };
//   return <div style={style}>{props.children}</div>;
// };

export interface IGridTwoColumnProps {
  columnWidth?: string;
  columnGap?: string;
  rowGap?: string;
  margin?: string;
}

export const GridTwoColumn = styled.div`
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(
      min(
        80vw,
        ${(props: IGridTwoColumnProps) => props.columnWidth || '400px'}
      ),
      1fr
    )
  );
  column-gap: ${(props: IGridTwoColumnProps) => props.columnGap || '80px'};
  row-gap: ${(props: IGridTwoColumnProps) => props.rowGap || '20px'};
  margin: ${(props: IGridTwoColumnProps) => props.margin || '0 0 60px 0'};
`;

export default GridTwoColumn;

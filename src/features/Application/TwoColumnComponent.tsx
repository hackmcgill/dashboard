import React from 'react';

const GridTwoColumn: React.FC = (props) => {
  const style = {
    display: 'grid',
    gridTemplateColumns: 'repeat( auto-fill, minmax(min(80vw, 400px), 1fr) )',
    columnGap: '80px',
    rowGap: '20px',
    marginBottom: '60px',
  };
  return <div style={style}>{props.children}</div>;
};

export default GridTwoColumn;

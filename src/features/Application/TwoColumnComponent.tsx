import React from 'react';

const TwoColumn: React.FC = (props) => {
  const style = {
    display: 'grid',
    gridTemplateColumns: 'repeat( 2, minmax(400px, 1fr) )',
    columnGap: '80px',
    rowGap: '20px',
    marginBottom: '60px',
  };
  return <div style={style}>{props.children}</div>;
};

export default TwoColumn;

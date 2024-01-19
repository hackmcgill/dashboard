import * as React from 'react';
import { Sector, Text } from 'recharts';

const ActiveShapeComponent: React.StatelessComponent<any> = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    value,
    percent,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const activeRadiusStart = 4;
  const activeRadiusEnd = 6;
  const sx = cx + (outerRadius + activeRadiusEnd) * cos;
  const sy = cy + (outerRadius + activeRadiusEnd) * sin;
  const mx = cx + (outerRadius + activeRadiusEnd + 10) * cos;
  const my = cy + (outerRadius + activeRadiusEnd + 10) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  const centerText = `${payload.name.substr(0, 30)}${
    payload.name.length > 30 ? '...' : ''
  }`;

  const percentVal = Math.round(percent * 100);

  return (
    <g>
      <Text x={18} y={18} dy={8} textAnchor="start" fill={fill} fontSize={20}>
        {centerText}
      </Text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + activeRadiusStart}
        outerRadius={outerRadius + activeRadiusEnd}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill={fill}
      >
        {value} ({percentVal === 0 ? '<1' : percentVal}%)
      </text>
    </g>
  );
};

export { ActiveShapeComponent };

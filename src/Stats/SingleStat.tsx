import * as React from 'react';

import { Box } from '@rebass/grid';
import { Cell, Pie, PieChart, Sector } from 'recharts';

interface IStatComponentProps {
  statName: string;
  stat: { [key: string]: number };
}

interface IStatComponentState {
  activeIndex: number;
}

const COLORS = ['#3DCC91', '#FFB366', '#FF7373', '#FFCC00', '#3B22FF'];

export default class SingleStatComponent extends React.Component<
  IStatComponentProps,
  IStatComponentState
> {
  constructor(props: IStatComponentProps) {
    super(props);
    this.state = {
      activeIndex: 0,
    };
    this.onPieEnter = this.onPieEnter.bind(this);
  }
  public render() {
    const data = Object.keys(this.props.stat).map((k: string, index) => {
      return {
        name: k,
        value: this.props.stat[k],
      };
    });
    return (
      <Box>
        <PieChart width={300} height={300}>
          <Pie
            nameKey={'name'}
            dataKey={'value'}
            data={data}
            innerRadius={'40%'}
            outerRadius={'50%'}
            onMouseEnter={this.onPieEnter}
            activeShape={renderActiveLabel}
            activeIndex={this.state.activeIndex}
            isAnimationActive={false}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </Box>
    );
  }
  private onPieEnter(data: any, index: number) {
    this.setState({
      activeIndex: index,
    });
  }
}

const renderActiveLabel: React.StatelessComponent<any> = (props) => {
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
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';
  const fontSize = payload.name
    ? Math.max(20 - payload.name.length / 2, 10)
    : 12;
  return (
    <g>
      <text
        x={cx}
        y={cy}
        dy={8}
        textAnchor="middle"
        fill={fill}
        fontSize={fontSize}
      >
        {payload.name}
      </text>
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
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
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
        {value}
      </text>
    </g>
  );
};

export { SingleStatComponent };

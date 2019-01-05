import { Box } from '@rebass/grid';
import * as React from 'react';
import { Cell, Pie, PieChart, Tooltip } from 'recharts';

import { H2 } from '../shared/Elements';
import { ActiveShapeComponent } from './ActiveShape';

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
    data.sort((a, b) => b.value - a.value);
    return (
      <Box width={500}>
        <H2 marginLeft={'10px'}>{this.props.statName}:</H2>
        {/* <ResponsiveContainer width={'100%'} height={'300px'}> */}
        <PieChart width={500} height={300}>
          <Pie
            nameKey={'name'}
            dataKey={'value'}
            data={data}
            innerRadius={'50%'}
            outerRadius={'60%'}
            onMouseEnter={this.onPieEnter}
            activeShape={ActiveShapeComponent}
            activeIndex={this.state.activeIndex}
            isAnimationActive={false}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
        {/* </ResponsiveContainer> */}
      </Box>
    );
  }
  private onPieEnter(data: any, index: number) {
    this.setState({
      activeIndex: index,
    });
  }
}

export { SingleStatComponent };

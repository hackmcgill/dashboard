import { Box } from '@rebass/grid';
import * as React from 'react';
import { Cell, Pie, PieChart, Tooltip } from 'recharts';

import { RouteComponentProps, withRouter } from 'react-router';
import { FrontendRoute, StringOperations } from '../config';
import { H2 } from '../shared/Elements';
import { ActiveShapeComponent } from './ActiveShape';

interface IStatComponentProps extends RouteComponentProps {
  statName: string;
  searchReference?: string;
  stat: { [key: string]: number };
}

interface IStatComponentState {
  activeIndex: number;
  data: Array<{ name: string; value: number }>;
}

const COLORS = ['#3DCC91', '#FFB366', '#FF7373', '#FFCC00', '#3B22FF'];

class SingleStatComponent extends React.Component<
  IStatComponentProps,
  IStatComponentState
> {
  constructor(props: IStatComponentProps) {
    super(props);
    const data = Object.keys(this.props.stat).map((k: string, index) => {
      return {
        name: k,
        value: this.props.stat[k],
      };
    });
    data.sort((a, b) => b.value - a.value);
    this.state = {
      activeIndex: 0,
      data,
    };
    this.onPieEnter = this.onPieEnter.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  public render() {
    return (
      <Box width={500}>
        <H2 marginLeft={'10px'}>{this.props.statName}:</H2>
        <PieChart
          width={500}
          height={300}
          onClick={this.handleClick}
          style={this.props.searchReference ? { cursor: 'pointer' } : {}}
        >
          <Pie
            nameKey={'name'}
            dataKey={'value'}
            data={this.state.data}
            innerRadius={'50%'}
            outerRadius={'60%'}
            onMouseEnter={this.onPieEnter}
            activeShape={ActiveShapeComponent}
            activeIndex={this.state.activeIndex}
            isAnimationActive={false}
          >
            {this.state.data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </Box>
    );
  }
  private onPieEnter(data: any, index: number) {
    this.setState({
      activeIndex: index,
    });
  }

  private handleClick(e: any) {
    if (this.props.searchReference) {
      const query = [
        {
          param: this.props.searchReference,
          operation: StringOperations.IN,
          value: [this.state.data[this.state.activeIndex].name],
        },
      ];
      this.props.history.push(
        `${FrontendRoute.ADMIN_SEARCH_PAGE}?q=${encodeURIComponent(
          JSON.stringify(query)
        )}`
      );
    }
  }
}

export default withRouter<IStatComponentProps>(SingleStatComponent);

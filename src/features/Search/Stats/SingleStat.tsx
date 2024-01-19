import { Box } from '@rebass/grid';
import * as React from 'react';
import { Cell, Pie, PieChart } from 'recharts';

import { ISearchParameter, StringOperations } from '../../../config';
import { H2 } from '../../../shared/Elements';
import { ActiveShapeComponent } from './ActiveShape';

interface IStatComponentProps {
  statName: string;
  searchReference?: string;
  onFilterChange?: (newFilters: ISearchParameter[]) => void;
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
    if (this.props.stat) {
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
  }
  public render() {
      if (!this.props.stat) {
            return (null);
      } else {
        return (
          <Box width={400}>
            <H2 marginLeft={'10px'}>{this.props.statName}:</H2>
            <PieChart
              width={400}
              height={300}
              onClick={this.handleClick}
              style={this.props.searchReference ? { cursor: 'pointer' } : {}}
            >
              <Pie
                nameKey={'name'}
                dataKey={'value'}
                data={this.state.data}
                innerRadius={'30%'}
                outerRadius={'50%'}
                onMouseEnter={this.onPieEnter}
                activeShape={ActiveShapeComponent}
                activeIndex={this.state.activeIndex}
                isAnimationActive={false}
              >
                {this.state.data.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </Box>
        );
      }
  }
  private onPieEnter(data: any, index: number) {
    this.setState({
      activeIndex: index,
    });
  }

  private handleClick(e: any) {
    if (this.props.searchReference && this.props.onFilterChange) {
        if (this.props.searchReference === null) {
            return;
        }
      const query = [
        {
          param: this.props.searchReference,
          operation: StringOperations.IN,
          value: [this.state.data[this.state.activeIndex].name],
        },
      ];
      this.props.onFilterChange(query);
    }
  }
}

export default SingleStatComponent;

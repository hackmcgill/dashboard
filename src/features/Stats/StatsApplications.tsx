import React from 'react';
import { Box, Flex } from '@rebass/grid';

import { Hacker } from '../../api';
import { H2 } from '../../shared/Elements';
import {
  IStatsApplications,
} from '../../config';
import { StatsApplicationsGraph } from './StatsApplicationsGraph';


interface IStatsState {
  applications: Array<IStatsApplications>;
  applicationsToday: number;
  loading: boolean;
}


class StatsApplications extends React.Component<{}, IStatsState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      applications: new Array<IStatsApplications>(),
      applicationsToday: 0,
      loading: true,
    };
  }

  componentWillMount() {
    this.getApplications().then(
      applications => {
        this.setState({
          applications,
          applicationsToday: applications[0].applications,
          loading: false,
        });
      }
    );
  }

  private async getApplications(): Promise<Array<IStatsApplications>> {
    const result = await Hacker.getAllStats();
    const applicationDate = result.data.data.stats.applicationDate;
    var d = new Date();
    var statsApplications = new Array<IStatsApplications>();
    for (var i = 0; i < 30; i++) {
      const date = d.toISOString().split('T')[0];
      const applications = date in applicationDate ? applicationDate[date] : 0;
      statsApplications.push({ date, applications });
      d.setDate(d.getDate() - 1);
    }
    return statsApplications;
  }

  public render() {
    return (
      <Flex flexDirection={'column'}>
        <Box width={4 / 6} alignSelf={'center'}>
          <Box>
            <H2 marginLeft={'50px'}>
              Number of hackers applied today: {this.state.applicationsToday}
            </H2>
          </Box>
          <Box>
            <StatsApplicationsGraph
              applications={this.state.applications}
            />
          </Box>
        </Box>
      </Flex >
    );
  }

}

export default StatsApplications;

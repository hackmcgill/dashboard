import React from 'react';
import Helmet from 'react-helmet';
import { Box, Flex } from '@rebass/grid';

import { Hacker } from '../../api';
import { H1 } from '../../shared/Elements';
import theme from '../../shared/Styles/theme';
import {
  HACKATHON_NAME,
  IStatsApplications,
} from '../../config';
import { StatsApplicationsGraph } from './StatsApplicationsGraph';


interface IStatsState {
  applications: Array<IStatsApplications>;
  applicationsToday: number;
  loading: boolean;
}


class Stats extends React.Component<{}, IStatsState> {
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
        <Helmet>
          <title> Stats | {HACKATHON_NAME}</title>
        </Helmet>

        <Box width={1 / 6} alignSelf={'center'}>
          <H1 color={theme.colors.red} fontSize={'30px'}>
            Hackers Stats
          </H1>
        </Box>

        <Box width={2 / 6} alignSelf={'center'}>
          <p>
            Number of hackers applied today: {this.state.applicationsToday}
          </p>
        </Box>


        <Box width={4 / 6} alignSelf={'center'}>
          <StatsApplicationsGraph
            applications={this.state.applications}
          />
        </Box>

      </Flex >
    );
  }

}

export default Stats;

import React from 'react';
import Helmet from 'react-helmet';
import { Box, Flex } from '@rebass/grid';
import styled from "styled-components"

import { Hacker } from '../../api';
import { H1 } from '../../shared/Elements';
import theme from '../../shared/Styles/theme';
import {
  HACKATHON_NAME,
} from '../../config';
import { StatsApplicationsGraph } from './StatsApplicationsGraph';

interface IApplications {
  date: string,
  count: number,
}

interface IStatsState {
  applications: Array<IApplications>;
  applicationsToday: number;
  loading: boolean;
}

const HeightBox = styled.div`
  height: 300px;
`

class Stats extends React.Component<{}, IStatsState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      applications: new Array<IApplications>(),
      applicationsToday: 0,
      loading: true,
    };
  }

  componentWillMount() {
    this.getApplications().then(
      applications => {
        this.setState({
          applications,
          applicationsToday: applications[0].count,
          loading: false,
        });
      }
    );
  }

  private async getApplications(): Promise<Array<IApplications>> {
    const result = await Hacker.getAllStats();
    const applicationDate = result.data.data.stats.applicationDate;
    var d = new Date();
    var applications = new Array<IApplications>();
    for (var i = 0; i < 30; i++) {
      const date = d.toISOString().split('T')[0];
      const count = date in applicationDate ? applicationDate[date] : 0;
      applications.push({ date, count });
      d.setDate(d.getDate() - 1);
    }
    return applications;
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

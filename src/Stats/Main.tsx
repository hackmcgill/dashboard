import { Box, Flex } from '@rebass/grid';
import * as React from 'react';

import { Hacker } from '../api';
import { IStats } from '../config';
import { H1, H2 } from '../shared/Elements';
import { getNestedAttr } from '../util';
import SingleStatComponent from './SingleStat';

interface IStatsState {
  stats: IStats | null;
  loading: boolean;
}

export default class StatsComponent extends React.Component<{}, IStatsState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      loading: true,
      stats: null,
    };
  }
  public render() {
    const { stats, loading } = this.state;
    if (loading) {
      return <div>loading...</div>;
    } else if (stats !== null) {
      return this.renderStats();
    } else {
      return <div>Error</div>;
    }
  }

  public async componentDidMount() {
    try {
      const statsResponse = await Hacker.getStats();
      const stats: IStats | null = getNestedAttr(statsResponse, [
        'data',
        'data',
        'stats',
      ]);
      this.setState({ stats, loading: false });
    } catch (e) {
      console.log('Error while getting stats', e);
      this.setState({ loading: false });
    }
  }
  private renderStats() {
    const { stats } = this.state;
    if (!stats) {
      return <div />;
    }
    /*
     *   total: number;
     *  status: { [key in HackerStatus]: number };
     *  school: { [key: string]: number };
     *  degree: { [key: string]: number };
     *  gender: { [key: string]: number };
     *  needsBus: { true: number; false: number };
     *  ethnicity: { [key: string]: number };
     *  jobInterest: { [key in JobInterest]: number };
     *  major: { [key: string]: number };
     *  graduationYear: { [key: string]: number };
     *  dietaryRestriction: { [key in DietaryRestriction & string]: number };
     *  ShirtSize: { [key in ShirtSize]: number };
     *  age: { [key: string]: number };
     */
    return (
      <Flex flexDirection={'column'}>
        <Box>
          <H1>Hacker Statistics</H1>
        </Box>
        <Box>
          <H2 marginLeft={'10px'}>Total applicants: {stats.total}</H2>
        </Box>
        <Box>
          <Flex flexWrap={'wrap'} justifyContent={'center'} mx={'10px'}>
            <SingleStatComponent
              statName="Status"
              stat={stats.status}
              searchReference="status"
            />
            <SingleStatComponent
              statName="School"
              stat={stats.school}
              searchReference="school"
            />
            <SingleStatComponent
              statName="Degree"
              stat={stats.degree}
              searchReference="degree"
            />
            <SingleStatComponent
              statName="Gender"
              stat={stats.gender}
              searchReference="accountId.gender"
            />
            <SingleStatComponent
              statName="Needs bus"
              stat={stats.needsBus}
              searchReference="needsBus"
            />
            <SingleStatComponent
              statName="Ethnicity"
              stat={stats.ethnicity}
              searchReference="ethnicity"
            />
            <SingleStatComponent
              statName="Job interest"
              stat={stats.jobInterest}
              searchReference="application.jobInterest"
            />
            <SingleStatComponent
              statName="Majors"
              stat={stats.major}
              searchReference="major"
            />
            <SingleStatComponent
              statName="Grad Year"
              stat={stats.graduationYear}
              searchReference="graduationYear"
            />
            <SingleStatComponent
              statName="Dietary Restrictions"
              stat={stats.dietaryRestrictions}
              searchReference="accountId.dietaryRestrictions"
            />
            <SingleStatComponent
              statName="Shirt Size"
              stat={stats.shirtSize}
              searchReference="accountId.shirtSize"
            />
            <SingleStatComponent
              statName="Age"
              stat={stats.age}
              searchReference="accountId.age"
            />
          </Flex>
        </Box>
      </Flex>
    );
  }
}

import { Box, Flex } from '@rebass/grid';
import * as React from 'react';

import { IStats } from '../../config';
import { H2 } from '../../shared/Elements';
import SingleStatComponent from './SingleStat';

interface IStatsProps {
  stats: IStats | null;
  loading: boolean;
}

const StatsComponent: React.StatelessComponent<IStatsProps> = (props) => {
  const { stats, loading } = props;
  if (loading) {
    return <div>loading...</div>;
  } else if (stats !== null) {
    return renderStats(stats);
  } else {
    return <div>Error</div>;
  }
};

function renderStats(stats: IStats) {
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
        <H2 marginLeft={'10px'}>Total results: {stats.total}</H2>
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
          <SingleStatComponent statName="Gender" stat={stats.gender} />
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
          />
          <SingleStatComponent statName="Shirt Size" stat={stats.shirtSize} />
          <SingleStatComponent statName="Age" stat={stats.age} />
        </Flex>
      </Box>
    </Flex>
  );
}

export { StatsComponent };

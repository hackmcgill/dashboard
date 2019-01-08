import { Box, Flex } from '@rebass/grid';
import * as React from 'react';

import { ISearchParameter, IStats } from '../../config';
import { H2 } from '../../shared/Elements';
import SingleStatComponent from './SingleStat';

interface IStatsProps {
  stats: IStats | null;
  loading: boolean;
  onFilterChange: (newFilters: ISearchParameter[]) => void;
}

const StatsComponent: React.StatelessComponent<IStatsProps> = (props) => {
  const { stats, loading, onFilterChange } = props;
  if (loading) {
    return <div>loading...</div>;
  } else if (stats !== null) {
    return renderStats(stats, onFilterChange);
  } else {
    return <div>Error</div>;
  }
};

function renderStats(
  stats: IStats,
  onFilterChange: (newFilters: ISearchParameter[]) => void
) {
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
            onFilterChange={onFilterChange}
          />
          <SingleStatComponent
            statName="School"
            stat={stats.school}
            searchReference="school"
            onFilterChange={onFilterChange}
          />
          <SingleStatComponent
            statName="Degree"
            stat={stats.degree}
            searchReference="degree"
            onFilterChange={onFilterChange}
          />
          <SingleStatComponent statName="Gender" stat={stats.gender} />
          <SingleStatComponent statName="Needs bus" stat={stats.needsBus} />
          <SingleStatComponent statName="Ethnicity" stat={stats.ethnicity} />
          <SingleStatComponent
            statName="Job interest"
            stat={stats.jobInterest}
            searchReference="application.jobInterest"
            onFilterChange={onFilterChange}
          />
          <SingleStatComponent
            statName="Majors"
            stat={stats.major}
            searchReference="major"
            onFilterChange={onFilterChange}
          />
          <SingleStatComponent
            statName="Grad Year"
            stat={stats.graduationYear}
            searchReference="graduationYear"
            onFilterChange={onFilterChange}
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

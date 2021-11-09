import { Box, Flex } from '@rebass/grid';
import * as _ from 'lodash';
import * as React from 'react';

import { ISearchParameter, IStats } from '../../../config';
import { H2 } from '../../../shared/Elements';
import { normalizeArray } from '../../../util';
import SingleStatComponent from './SingleStat';

interface IStatsProps {
  stats: IStats | null;
  loading: boolean;
  existingFilters?: ISearchParameter[];
  onFilterChange: (newFilters: ISearchParameter[]) => void;
}
const StatsComponent: React.StatelessComponent<IStatsProps> = (props) => {
  const { existingFilters, stats, loading, onFilterChange } = props;
  if (loading) {
    return <div>loading...</div>;
  } else if (stats !== null) {
    return renderStats(stats, existingFilters || [], onFilterChange);
  } else {
    return <div>Error</div>;
  }
};

function renderStats(
  stats: IStats,
  existingFilters: ISearchParameter[],
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
  const onFilterChangeWrapper = modifyFilterFactory(
    existingFilters,
    onFilterChange
  );
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
            onFilterChange={onFilterChangeWrapper}
          />
          <SingleStatComponent
            statName="School"
            stat={stats.school}
            searchReference="school"
            onFilterChange={onFilterChangeWrapper}
          />
          <SingleStatComponent
            statName="Degree"
            stat={stats.degree}
            searchReference="degree"
            onFilterChange={onFilterChangeWrapper}
          />
          <SingleStatComponent statName="Gender" stat={stats.gender} />
          <SingleStatComponent statName="Needs bus" stat={stats.needsBus} />
          <SingleStatComponent statName="Ethnicity" stat={stats.ethnicity} />
          <SingleStatComponent
            statName="Job interest"
            stat={stats.jobInterest}
            searchReference="application.jobInterest"
            onFilterChange={onFilterChangeWrapper}
          />
          <SingleStatComponent
            statName="Majors"
            stat={stats.major}
            searchReference="major"
            onFilterChange={onFilterChangeWrapper}
          />
          <SingleStatComponent
            statName="Grad Year"
            stat={stats.graduationYear}
            searchReference="graduationYear"
            onFilterChange={onFilterChangeWrapper}
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

/**
 * Returns function which takes as input new filters to add to or remove from the old filters.
 * @param oldFilters The previous filters to add to
 * @param onFilterChange The callback that is called after modifying filters
 */
 function modifyFilterFactory(
    oldFilters: ISearchParameter[],
    onFilterChange: (newFilters: ISearchParameter[]) => void
  ): (newFilters: ISearchParameter[]) => void {
    return (newFilters: ISearchParameter[]) => {
      oldFilters = _.cloneDeep(oldFilters);
      // Convert oldFilters list to object so that we can reference by param in O(1) time.
      const oldFiltersObj = normalizeArray(oldFilters, 'param');
      // List of unseen filters that we will add to the list of returned filters.
      const unseenFilters: ISearchParameter[] = [];
      // Iterate through the new filters and either modify oldFilter value accordingly.
      newFilters.forEach((newFilter: ISearchParameter) => {
        const oldFilter = oldFiltersObj[newFilter.param];
        if (!oldFilter) {
          // If there is no oldFilter, then newFilter is unseen.
          unseenFilters.push(newFilter);
        } else if (_.isEqual(oldFilter.value, newFilter.value)) {
          // Remove the filter if the filter is exactly the same.
          _.remove(oldFilters, (filter) => filter === oldFilter);
        } else {
          // Set the old filter to be exactly the new filter.
          oldFilter.value = newFilter.value;
        }
      });
      onFilterChange(oldFilters.concat(unseenFilters));
    };
  }

export { StatsComponent };

import { Box } from '@rebass/grid';
import * as React from 'react';
import { IHacker, UserType } from '../config';
import { StyledTable } from '../shared/Elements';

interface IResultsTableProps {
  results: Array<{
    selected: boolean;
    hacker: IHacker;
  }>;
  loading: boolean;
  userType: UserType;
}

const adminColumns = [
  {
    Header: 'First Name',
    accessor: 'hacker.accountId.firstName',
  },
  {
    Header: 'Last Name',
    accessor: 'hacker.accountId.lastName',
  },
  {
    Header: 'School',
    accessor: 'hacker.school',
  },
  {
    Header: 'Major',
    accessor: 'hacker.major',
  },
  {
    Header: 'Grad Year',
    accessor: 'hacker.graduationYear',
  },
  {
    Header: 'Status',
    accessor: 'hacker.status',
  },
];

const volunteerColumns = [
  {
    Header: 'First Name',
    accessor: 'hacker.accountId.firstName',
  },
];

const ResultsTable: React.StatelessComponent<IResultsTableProps> = (props) => {
  return (
    <Box>
      <StyledTable
        data={props.results}
        columns={
          props.userType === UserType.STAFF ? adminColumns : volunteerColumns
        }
        loading={props.loading}
        defaultPageSize={10}
      />
    </Box>
  );
};

export { ResultsTable };
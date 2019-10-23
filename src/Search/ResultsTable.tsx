import * as React from 'react';

import { IHacker, UserType } from '../config';
import { StyledTable } from '../shared/Elements';
import SingleHackerModal from '../SingleHacker/SingleHackerModal';
import HackerSelect from './HackerSelect';

interface IResultsTableProps {
  results: Array<{
    selected: boolean;
    hacker: IHacker;
  }>;
  loading: boolean;
  userType: UserType;
  filter: string;
}

const ResultsTable: React.StatelessComponent<IResultsTableProps> = (props) => {
  const volunteerColumns = [
    {
      Header: 'First Name',
      accessor: 'hacker.accountId.firstName',
    },
  ];

  const adminColumns = [
    ...volunteerColumns,
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
    {
      Header: 'Applicant Info',
      Cell: ({ original }: any) => (
        <div>
          <SingleHackerModal
            hacker={original.hacker}
            allHackers={props.results.map((r) => r.hacker)}
            userType={props.userType}
          />
        </div>
      ),
    },
  ];

  const sponsorColumns = [
    ...adminColumns,
    {
      Header: 'Save',
      Cell: ({ original }: any) => (
        <HackerSelect hackerId={original.hacker.id} />
      ),
    },
  ];

  let columns;
  switch (props.userType) {
    case UserType.VOLUNTEER:
      columns = volunteerColumns;
      break;
    case UserType.STAFF:
      columns = adminColumns;
      break;
    default:
      columns = sponsorColumns;
      break;
  }
  return (
    <StyledTable
      data={props.results}
      columns={columns}
      loading={props.loading}
      defaultPageSize={10}
    />
  );
};

export { ResultsTable };

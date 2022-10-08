import * as React from 'react';

import { IHacker, UserType } from '../../config';
import { StyledTable } from '../../shared/Elements';
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
      accessor: 'hacker.account.firstName',
    },
  ];
  const generalColumns = [
    ...volunteerColumns,
    {
      Header: 'Last Name',
      accessor: 'hacker.account.lastName',
    },
    {
      Header: 'School',
      accessor: 'hacker.application.general.school',
    },
    {
      Header: 'Field of Study',
      accessor: 'hacker.application.general.fieldOfStudy',
    },
    {
      Header: 'Grad Year',
      accessor: 'hacker.application.general.graduationYear',
    },
  ];

  const adminColumns = [
    ...generalColumns,
    {
      Header: 'Status',
      accessor: 'hacker.status',
    },
    {
      Header: 'Job Interest',
      accessor: 'hacker.application.general.jobInterest',
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
    ...generalColumns,
    {
      Header: 'Job Interest',
      accessor: 'hacker.application.general.jobInterest',
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

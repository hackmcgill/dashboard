import * as React from 'react';

import { IHacker, UserType } from '../config';
import { StyledTable } from '../shared/Elements';
import SingleHackerModal from './SingleHackerModal';

interface IResultsTableProps {
  results: Array<{
    selected: boolean;
    hacker: IHacker;
  }>;
  loading: boolean;
  userType: UserType;
  search: string;
}

const ResultsTable: React.StatelessComponent<IResultsTableProps> = (props) => {
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
    {
      Header: 'Applicant Info',
      Cell: ({ original }: any) => (
        <div>
          <SingleHackerModal
            hacker={original.hacker}
            allHackers={filter(props.results, props.search).map(
              (r) => r.hacker
            )}
          />
        </div>
      ),
    },
  ];

  const volunteerColumns = [
    {
      Header: 'First Name',
      accessor: 'hacker.accountId.firstName',
    },
  ];
  return (
    <StyledTable
      data={filter(props.results, props.search)}
      columns={
        props.userType === UserType.STAFF ? adminColumns : volunteerColumns
      }
      loading={props.loading}
      defaultPageSize={10}
    />
  );
};

function filter(
  results: Array<{
    selected: boolean;
    hacker: IHacker;
  }>,
  search: string
): Array<{
  selected: boolean;
  hacker: IHacker;
}> {
  return results.filter(({ hacker }) => {
    const { accountId } = hacker;
    const foundAcct =
      typeof accountId !== 'string'
        ? accountId.firstName.includes(search) ||
          accountId.lastName.includes(search) ||
          `${accountId.firstName} ${accountId.lastName}`.includes(search) ||
          accountId.email.includes(search) ||
          String(accountId.phoneNumber).includes(search) ||
          accountId.shirtSize.includes(search) ||
          (accountId._id && accountId._id.includes(search))
        : false;

    return (
      foundAcct ||
      hacker.id.includes(search) ||
      hacker.major.includes(search) ||
      hacker.school.includes(search) ||
      hacker.status.includes(search) ||
      String(hacker.graduationYear).includes(search)
    );
  });
}

export { ResultsTable };

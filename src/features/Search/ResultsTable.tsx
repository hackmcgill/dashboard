import * as React from 'react';

import { IHacker, UserType } from '../../config';
import { StyledTable } from '../../shared/Elements';
import SingleHackerModal from '../SingleHacker/SingleHackerModal';
import HackerSelect from './HackerSelect';
import HackerReviewerStatus from '../../config/hackerReviewerStatus';

interface IResultsTableProps {
  results: Array<{
    selected: boolean;
    hacker: IHacker;
  }>;
  loading: boolean;
  userType: UserType;
  filter: string;
}

const ResultsTable: React.FunctionComponent<IResultsTableProps> = (props) => {
  const volunteerColumns = [
    {
      Header: 'First Name',
      accessor: 'hacker.accountId.firstName',
    },
  ];
  const generalColumns = [
    ...volunteerColumns,
    {
      Header: 'Last Name',
      accessor: 'hacker.accountId.lastName',
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
      Header: 'Review Status',
      accessor: 'hacker.reviewerStatus',
      Cell: (cellProps: any) => {
        const reviewerStatus = cellProps.original.hacker.reviewerStatus;
        const reviewerStatus2 = cellProps.original.hacker.reviewerStatus2;
        if (reviewerStatus!=HackerReviewerStatus.HACKER_REVIEWER_STATUS_NONE && reviewerStatus2!=HackerReviewerStatus.HACKER_REVIEWER_STATUS_NONE) {
          return <span>2</span>;
        } else if (reviewerStatus!=HackerReviewerStatus.HACKER_REVIEWER_STATUS_NONE || reviewerStatus2!=HackerReviewerStatus.HACKER_REVIEWER_STATUS_NONE) {
          return <span>1</span>;
        } else {
          return <span>0</span>;
        }
      },
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

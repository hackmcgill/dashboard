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
  canEditAllStatuses?: boolean;
  triggerUpdate: () => void;
}

// calculate review status
const calculateReviewStatusCount = (hacker: IHacker): number => {
  if (hacker.reviewerStatus != HackerReviewerStatus.HACKER_REVIEWER_STATUS_NONE && hacker.reviewerStatus2 != HackerReviewerStatus.HACKER_REVIEWER_STATUS_NONE) {
    return 2;
  } else if (hacker.reviewerStatus != HackerReviewerStatus.HACKER_REVIEWER_STATUS_NONE || hacker.reviewerStatus2 != HackerReviewerStatus.HACKER_REVIEWER_STATUS_NONE) {
    return 1;
  } else {
    return 0;
  }
};

// calculate review score
const calculateReviewScoreCount = (hacker: IHacker): number => {
  const arr = [hacker.reviewerStatus, hacker.reviewerStatus2];
  if (arr[0] == HackerReviewerStatus.HACKER_REVIEWER_STATUS_NONE && arr[1] == HackerReviewerStatus.HACKER_REVIEWER_STATUS_NONE) {
    return -1;
  } else if (arr[0] == HackerReviewerStatus.HACKER_REVIEWER_STATUS_WHITELIST || arr[1] == HackerReviewerStatus.HACKER_REVIEWER_STATUS_WHITELIST) {
    return 5;
  } else {
    let score = 0;
    let numberOfReviews = 0;
    arr.forEach((val) => {
      if (val != HackerReviewerStatus.HACKER_REVIEWER_STATUS_NONE && val != HackerReviewerStatus.HACKER_REVIEWER_STATUS_WHITELIST) {
        numberOfReviews += 1;
        // Poor=0, Weak=1, Average=2, Strong=3, Outstanding=4
        if (val == HackerReviewerStatus.HACKER_REVIEWER_STATUS_WEAK) score += 1;
        else if (val == HackerReviewerStatus.HACKER_REVIEWER_STATUS_AVERAGE) score += 2;
        else if (val == HackerReviewerStatus.HACKER_REVIEWER_STATUS_STRONG) score += 3;
        else if (val == HackerReviewerStatus.HACKER_REVIEWER_STATUS_OUTSTANDING) score += 4;
      }
    });
    return score / numberOfReviews;
  }
};

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
    { // Number of reviewers that have reviewed this hacker
      Header: 'Review Status',
      id: 'reviewStatus', // required since accessor is a non-string
      accessor: (row: any) => calculateReviewStatusCount(row.hacker),
      Cell: (cellProps: any) => {
        return cellProps.value;
      },
    },
    { // Average score of the reviews for this hacker
      Header: 'Review Score',
      id: 'reviewScore', // required since accessor is a non-string
      accessor: (row: any) => calculateReviewScoreCount(row.hacker),
      Cell: (cellProps: any) => {
        return cellProps.value;
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
            onUpdate={props.triggerUpdate}
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
    case UserType.HACKBOARD:
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

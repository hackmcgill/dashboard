import { Box, Flex } from '@rebass/grid';
import fileDownload from 'js-file-download';
import * as React from 'react';
import { IHacker, UserType } from '../config';
import { Button, H1, StyledTable } from '../shared/Elements';
import theme from '../shared/Styles/theme';
import { getNestedAttr } from '../util';

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
      <Flex justifyContent={'space-between'}>
        <Box>
          <H1 color={theme.colors.primary} textAlign={'left'}>
            Hackers
          </H1>
        </Box>
        <Box mr={'10px'}>
          <Button>Update Status</Button>
          <Button onClick={downloadDataFactory(props.results)}>
            Export Hackers
          </Button>
        </Box>
      </Flex>
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
function downloadDataFactory(
  results: Array<{
    selected: boolean;
    hacker: IHacker;
  }>
) {
  return () => {
    const headers = [
      '_id',
      'accountId.firstName',
      'accountId.lastName',
      'accountId.email',
      'needsBus',
      'major',
      'school',
      'graduationYear',
      'degree',
      'gender',
      'needsBus',
    ];
    const csvData: string[] = [headers.join('\t')];
    results.forEach((result) => {
      if (result.selected) {
        const row: string[] = [];
        headers.forEach((header) => {
          let value;
          if (header.indexOf('.') >= 0) {
            const nestedAttr = header.split('.');
            value = getNestedAttr(result.hacker, nestedAttr);
          } else {
            value = result.hacker[header];
          }
          row.push(value);
        });
        csvData.push(row.join('\t'));
      }
    });
    fileDownload(csvData.join('\n'), 'hackerData.tsv', 'text/tsv');
  };
}

export { ResultsTable };

import { Box } from '@rebass/grid';
import * as React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { IHacker } from '../config';
import { H1 } from '../shared/Elements';

interface IResultsTableProps {
  results: IHacker[];
  loading: boolean;
}

const ResultsTable: React.StatelessComponent<IResultsTableProps> = (props) => {
  const columns = [
    {
      Header: 'First Name',
      accessor: 'accountId.firstName',
    },
    {
      Header: 'Last Name',
      accessor: 'accountId.lastName',
    },
    {
      Header: 'School',
      accessor: 'school',
    },
    {
      Header: 'Major',
      accessor: 'major',
    },
    {
      Header: 'Grad Year',
      accessor: 'graduationYear',
    },
    {
      Header: 'Status',
      accessor: 'status',
    },
  ];
  return (
    <Box>
      <H1
        color={'#F2463A'}
        fontSize={'30px'}
        textAlign={'left'}
        marginTop={'0px'}
        marginBottom={'20px'}
      >
        Hackers
      </H1>
      <ReactTable
        data={props.results}
        columns={columns}
        loading={props.loading}
      />
    </Box>
  );
};

export { ResultsTable };

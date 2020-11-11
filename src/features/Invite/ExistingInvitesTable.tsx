import React from 'react';
import { IInviteInfo } from '../../config';
import { StyledTable } from '../../shared/Elements';

interface IExistingInvitesTableProps {
  // Optional function that is called when a new invite is sent.
  invites: IInviteInfo[];
  isLoading: boolean;
}

export const ExistingInvitesTable: React.FC<IExistingInvitesTableProps> = (
  props
) => {
  const columns = [
    {
      Header: 'Email',
      accessor: 'email',
    },
    {
      Header: 'Account Type',
      accessor: 'accountType',
    },
  ];
  return (
    <StyledTable
      data={props.invites}
      columns={columns}
      loading={props.isLoading}
      defaultPageSize={10}
    />
  );
};

export default ExistingInvitesTable;

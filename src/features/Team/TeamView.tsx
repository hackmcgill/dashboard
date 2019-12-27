import * as React from 'react';

import { Box, Flex } from '@rebass/grid';

import Bold from '../../shared/Elements/Bold';

import {
  IMemberName,
  ITeam,
  TEAM_MEMBERS,
  // TEAM_NAME,
  TEAM_NAME_SUBTITLE,
} from '../../config';

import { toast } from 'react-toastify';
import ClipboardComponent from '../../shared/Elements/Clipboard';
import WithToasterContainer from '../../shared/HOC/withToaster';

interface ITeamViewProps {
  team: ITeam;
  members: IMemberName[];
}

const TV: React.StatelessComponent<ITeamViewProps> = (props) => {
  const nameList = props.members.map((member, index) => (
    <React.Fragment key={index}>
      <hr
        style={{
          border: '1px solid #D2D2D2',
          width: '500px',
          maxWidth: '500px',
          marginTop: '25px',
        }}
      />
      <Flex flexDirection={'row'} alignItems={'space-between'}>
        <Flex flexDirection={'column'}>
          <Box key={index}>
            {member.firstName} {member.lastName}
          </Box>
          <Box fontSize={'8px'}>{'mcgill U'}</Box>
        </Flex>
        <Box>{'rohit'}</Box>
      </Flex>
    </React.Fragment>
  ));
  return (
    <Flex flexDirection={'column'}>
      <Flex flexDirection={'column'}>
        <Bold>Team Code</Bold>
        <Box fontSize={'smaller'}>{TEAM_NAME_SUBTITLE}</Box>
        {/* This should be a team code, not a team name actually, need backend functionality first */}
        <Box alignSelf={'center'}>
          <ClipboardComponent
            value={props.team.name}
            onSuccess={onCopied}
            onError={onCopyFailed}
          />
        </Box>
      </Flex>
      <Box mt={'25px'} mb={'25px'}>
        <Flex flexDirection={'column'}>
          <Bold>{TEAM_MEMBERS}</Bold>
          <Flex flexDirection={'column'}>{nameList}</Flex>
        </Flex>
      </Box>
    </Flex>
  );
};

function onCopied(e: any) {
  toast.success('Copied!');
}
function onCopyFailed(e: any) {
  toast.error('Error.');
}

export const TeamView = WithToasterContainer(TV);

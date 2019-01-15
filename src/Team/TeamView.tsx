import * as React from 'react';

import { Box, Flex } from '@rebass/grid';

import Bold from '../shared/Elements/Bold';

import {
  IMemberName,
  ITeam,
  TEAM_MAX_SIZE,
  TEAM_MEMBERS,
  TEAM_NAME,
  TEAM_NAME_SUBTITLE,
} from '../config';

import ClipboardComponent from '../shared/Elements/Clipboard';

interface ITeamViewProps {
  team: ITeam;
  members: IMemberName[];
}

export const TeamView: React.StatelessComponent<ITeamViewProps> = (props) => {
  const firstColumnWidth = 0.5;
  const nameList = props.members.map((member, index) => (
    <Box key={index}>{member.firstName}</Box>
  ));
  return (
    <Flex flexDirection={'column'}>
      <Box>
        <Flex justifyContent={'space-between'}>
          <Box width={firstColumnWidth}>
            <Bold>{TEAM_NAME}</Bold>
            <Box fontSize={'smaller'}>{TEAM_NAME_SUBTITLE}</Box>
          </Box>
          <Box>
            <ClipboardComponent value={props.team.name} />
          </Box>
        </Flex>
      </Box>
      <Box mt={'10px'}>
        <Flex justifyContent={'space-between'}>
          <Box width={firstColumnWidth}>
            <Bold>{TEAM_MEMBERS}</Bold>
            <Box fontSize={'smaller'}>{TEAM_MAX_SIZE}</Box>
          </Box>
          <Box>
            <Flex flexDirection={'column'}>{nameList}</Flex>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};

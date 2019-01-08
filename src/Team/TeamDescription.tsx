import * as React from 'react';

import { Box, Flex } from '@rebass/grid';

import {
  IMemberName,
  ITeam,
  TEAM_MAX_SIZE,
  TEAM_MEMBERS,
  TEAM_NAME,
  TEAM_NAME_SUBTITLE,
} from '../config';
import { Button, H1, MaxWidthBox } from '../shared/Elements';

import { Bold } from '../shared/Elements/Bold';
import ClipboardComponent from '../shared/Elements/Clipboard';

interface ITeamDescriptionProps {
  team: ITeam;
  members: IMemberName[];
  onLeaveTeam: () => void;
}

const TeamDescription: React.StatelessComponent<ITeamDescriptionProps> = (
  props: ITeamDescriptionProps
) => {
  const firstColumnWidth = 0.5;
  const nameList = props.members.map((member, index) => (
    <Box key={index}>{member.firstName}</Box>
  ));
  return (
    <MaxWidthBox maxWidth={'600px'} mx={[5, 'auto']}>
      <H1 fontSize={'30px'} marginTop={'0px'} marginLeft={'0px'}>
        Your Team
      </H1>
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
        <Box>
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
        <Box mt={'15px'}>
          <Flex justifyContent={'center'}>
            <Box>
              <Button onClick={props.onLeaveTeam}>Leave team</Button>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </MaxWidthBox>
  );
};

export { TeamDescription };

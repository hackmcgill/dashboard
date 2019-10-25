import * as React from 'react';

import { Box, Flex } from '@rebass/grid';

import { IMemberName, ITeam } from '../../config';
import { Button, H1, MaxWidthBox } from '../../shared/Elements';

import { TeamView } from './TeamView';

interface ITeamDescriptionProps {
  team: ITeam;
  members: IMemberName[];
  onLeaveTeam: () => void;
  isLeavingTeam: boolean;
}

const TeamDescription: React.StatelessComponent<ITeamDescriptionProps> = (
  props: ITeamDescriptionProps
) => {
  return (
    <MaxWidthBox maxWidth={'400px'} mx={[5, 'auto']}>
      <H1 fontSize={'30px'} marginTop={'0px'} marginLeft={'0px'}>
        Your Team
      </H1>
      <Flex flexDirection={'column'}>
        <Box>
          <TeamView team={props.team} members={props.members} />
        </Box>
        <Box mt={'15px'}>
          <Flex justifyContent={'center'}>
            <Box>
              <Button
                onClick={props.onLeaveTeam}
                isLoading={props.isLeavingTeam}
              >
                Leave team
              </Button>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </MaxWidthBox>
  );
};

export { TeamDescription };

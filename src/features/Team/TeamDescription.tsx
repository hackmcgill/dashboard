import * as React from 'react';

import { Box, Flex } from '@rebass/grid';

import { IMemberName, ITeam } from '../../config';
import { H1 } from '../../shared/Elements';
import Button, { ButtonVariant } from '../../shared/Elements/Button';
import { TeamView } from './TeamView';

interface ITeamDescriptionProps {
  team: ITeam;
  members: IMemberName[];
  onLeaveTeam: () => void;
  isLeavingTeam: boolean;
}

const TeamDescription: React.FC<ITeamDescriptionProps> = (
  props: ITeamDescriptionProps
) => {
  return (
    <div className="centered-container">
      <H1>
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
                variant={ButtonVariant.Secondary}
              >
                Leave team
              </Button>
            </Box>
          </Flex>
        </Box>
      </Flex>

      <style jsx>{`
        .centered-container {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          /* Once dashboard pr is merged can switch to automatic centering */
          padding-top: 160px;
        }
      `}</style>
    </div>
  );
};

export { TeamDescription };

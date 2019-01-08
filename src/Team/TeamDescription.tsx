import * as React from 'react';

import { Box, Flex } from '@rebass/grid';

import { IMemberName, ITeam } from '../config';
import { H1, Image, MaxWidthBox } from '../shared/Elements';

import CopyImage from '../assets/images/copy-icon.svg';

interface ITeamDescriptionProps {
  team: ITeam;
  members: IMemberName[];
}

const TeamDescription: React.StatelessComponent<ITeamDescriptionProps> = (
  props: ITeamDescriptionProps
) => {
  const firstColumnWidth = 0.3;
  const nameList = props.members.map((member, index) => (
    <Box key={index}>{member.firstName}</Box>
  ));
  return (
    <MaxWidthBox maxWidth={'500px'} m={'auto'}>
      <H1 fontSize={'30px'} marginTop={'0px'} marginLeft={'0px'}>
        Team
      </H1>
      <Flex ml={'10px'} flexDirection={'column'}>
        <Box>
          <Flex>
            <Box width={firstColumnWidth}>Team name:</Box>
            <Box>
              {props.team.name}
              <Image
                imgHeight={'15px'}
                src={CopyImage}
                padding={'0 0 0 10px'}
              />
            </Box>
          </Flex>
        </Box>
        <Box>
          <Flex>
            <Box width={firstColumnWidth}>Team members:</Box>
            <Box>
              <Flex flexDirection={'column'}>{nameList}</Flex>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </MaxWidthBox>
  );
};

export { TeamDescription };

import { Box, Flex } from '@rebass/grid';
import React from 'react';
import { H1, MaxWidthBox } from '../../shared/Elements';
import theme from '../../shared/Styles/theme';
import HackerCheckinForm from '../../features/Checkin/HackerCheckinForm';

const TeamCheckinPage: React.FC = () => {
  return (
    <Flex flexDirection={'column'}>
      <Box>
        <MaxWidthBox maxWidth={'600px'} width={1} mx="auto">
          <H1
            color={theme.colors.black80}
            fontSize={'24px'}
            textAlign={'center'}
            marginBottom={'50px'}
            marginLeft={'0px'}
          >
            Team Check-in Form
          </H1>
          <HackerCheckinForm />
        </MaxWidthBox>
      </Box>
    </Flex>
  );
};

export default TeamCheckinPage; 

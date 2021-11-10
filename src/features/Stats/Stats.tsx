import React, { useState, useEffect } from 'react';
import Helmet from 'react-helmet';
import { Box, Flex } from '@rebass/grid';
import { Hacker } from '../../api';
import { H1 } from '../../shared/Elements';
import theme from '../../shared/Styles/theme';
import {
  HACKATHON_NAME,
} from '../../config';

const Stats: React.FC = ({ }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [applications, setApplications] = useState<number>(0);

  useEffect(() => {
    async function getApplications() {
      try {
        const result = await Hacker.getAllStats();
        const applicationDate = result.data.data.stats.applicationDate;
        const curDate = new Date().toISOString().split('T')[0];
        const applications = curDate in applicationDate ? applicationDate[curDate] : 0;
        setApplications(applications);
      } catch (e) {
        console.log(e);
      }
    }

    getApplications();
    setIsLoading(true);
  }, []);

  return (
    <Flex flexDirection={'column'}>
      <Helmet>
        <title> Stats | {HACKATHON_NAME}</title>
      </Helmet>

      <Box width={1 / 6} alignSelf={'center'}>
        <H1 color={theme.colors.red} fontSize={'30px'}>
          Hackers Stats
        </H1>
      </Box>

      <Box width={2 / 6} alignSelf={'center'}>
        <p>
          Number of hackers applied today: {applications}
        </p>
      </Box>

    </Flex>
  );

}

export default Stats;

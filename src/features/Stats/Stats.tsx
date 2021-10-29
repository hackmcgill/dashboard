import React from 'react';
import Helmet from 'react-helmet';
import { Box, Flex } from '@rebass/grid';
import { H1 } from '../../shared/Elements';
import theme from '../../shared/Styles/theme';
import {
  HACKATHON_NAME,
} from '../../config';

type IStatsState = {
  count: number; // TODO: decide states needed
};

class Stats extends React.Component<{}, IStatsState> {
  state: IStatsState = {
    count: 0,
  };

  public render() {
    return (<Flex flexDirection={'column'}>
      <Helmet>
        <title> Stats | {HACKATHON_NAME}</title>
      </Helmet>

      <Box width={1 / 6} alignSelf={'center'}>
        <H1 color={theme.colors.red} fontSize={'30px'}>
          Hackers Stats
        </H1>
      </Box>
    </Flex>
    );
  }
}

export default Stats;

import * as React from 'react';
import { BackgroundImage, Button, H1, Paragraph } from '../../shared/Elements';
import { Flex } from '@rebass/grid';

import Background from '../../assets/images/statuspage-background.svg';

class StatusPage extends React.Component<{}, {}> {
  public render() {
    return (
      <Flex flexDirection={'column'} alignItems={'center'}>
        <Flex flexDirection={'rows'} style={{ marginTop: '8em' }}>
          <H1 textAlign={'center'} display={'inline'}>
            Status:
          </H1>
          <H1 textAlign={'center'} color={'black'} display={'inline'}>
            Start your application
          </H1>
        </Flex>

        <Paragraph color={'black'} textAlign={'center'}>
          Don't forget to submit your application before Saturday December 31st{' '}
        </Paragraph>
        <Button type="button">Apply</Button>
        <BackgroundImage
          right={'0px'}
          bottom={'0px'}
          src={Background}
          imgHeight={'87%'}
        />
      </Flex>
    );
  }
}

export default StatusPage;

import { Box, Flex } from '@rebass/grid';
import * as React from 'react';
import MediaQuery from 'react-responsive';
import { Link } from 'react-router-dom';

import { BackgroundImage, Card, H1, H2, Image } from '../shared/Elements';

import BackgroundLandscape from '../assets/images/backgroundLandscape.svg';

interface IDashboardView {
  cards: IDashboardCard[];
  title: string;
}

export interface IDashboardCard {
  title: string;
  route: string;
  imageSrc: any;
  validation?: () => boolean;
  hidden?: boolean;
}

const DashboardView: React.SFC<IDashboardView> = ({ cards, title }) => {
  return (
    <Flex flexDirection={'column'} alignItems={'center'}>
      <H1>{title}</H1>
      <Flex flexWrap={'wrap'} alignItems={'center'} justifyContent={'center'}>
        {cards.map((card) => (
          <Link
            to={card.route}
            onClick={eventHandleWrapperFactory(card)}
            style={{ textDecoration: 'none' }}
            key={card.title}
            hidden={card.hidden}
          >
            <Card width={'250px'} flexDirection={'column'}>
              <H2 fontSize={'28px'} marginBottom={'30px'} textAlign={'center'}>
                {card.title}
              </H2>
              <Image src={card.imageSrc} imgHeight={'125px'} />
            </Card>
          </Link>
        ))}
        <MediaQuery minWidth={960}>
          <Box width={1}>
            <BackgroundImage
              src={BackgroundLandscape}
              top={'0px'}
              left={'0px'}
              imgWidth={'100%'}
              imgHeight={'100%'}
            />
          </Box>
        </MediaQuery>
      </Flex>
    </Flex>
  );
};

function eventHandleWrapperFactory(card: IDashboardCard) {
  return (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (card.validation && !card.validation()) {
      e.preventDefault();
    }
  };
}

export default DashboardView;

import { Box, Flex } from '@rebass/grid';
import * as React from 'react';
import Helmet from 'react-helmet';
import MediaQuery from 'react-responsive';

import {
  BackgroundImage,
  Card,
  H1,
  H2,
  Image,
  LinkDuo,
} from '../shared/Elements';

import BackgroundLandscape from '../assets/images/backgroundLandscape.svg';
import theme from '../shared/Styles/theme';

interface IDashboardView {
  cards: IDashboardCard[];
  title: string;
  subtitle?: string;
}

export interface IDashboardCard {
  title: string;
  route: string;
  imageSrc: any;
  validation?: () => boolean;
  hidden?: boolean;
  disabled?: boolean;
}

const DashboardView: React.SFC<IDashboardView> = ({
  cards,
  title,
  subtitle,
}) => {
  return (
    <Flex flexDirection={'column'} alignItems={'center'}>
      <Helmet>
        <title>Dashboard | McHacks 6</title>
      </Helmet>
      <H1 marginLeft={'0px'} textAlign={'center'}>
        {title}
      </H1>
      {subtitle ? (
        <H2 marginLeft={'0px'} textAlign={'center'} color={theme.colors.grey}>
          {subtitle}
        </H2>
      ) : (
        ''
      )}
      <Flex flexWrap={'wrap'} alignItems={'center'} justifyContent={'center'}>
        {cards.map((card) => (
          <LinkDuo
            to={card.route}
            onClick={eventHandleWrapperFactory(card)}
            style={{ textDecoration: 'none' }}
            key={card.title}
            hidden={card.hidden}
          >
            <Card
              width={'250px'}
              flexDirection={'column'}
              disabled={card.disabled}
            >
              <H2 fontSize={'28px'} marginBottom={'30px'} textAlign={'center'}>
                {card.title}
              </H2>
              <Image src={card.imageSrc} imgHeight={'125px'} />
            </Card>
          </LinkDuo>
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
    if (card.disabled || (card.validation && !card.validation())) {
      e.preventDefault();
    }
  };
}

export default DashboardView;

import { Box, Flex } from '@rebass/grid';
import React, { useState, useEffect } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { Auth } from '../../api';
import { getTokenFromQuery, HACKATHON_NAME } from '../../config';
import {
  Button,
  H1,
  Image,
  MaxWidthBox,
  Paragraph,
} from '../../shared/Elements';

import * as DashboardText from '../../features/Dashboard/DashboardText';

import constructionCone from '../../assets/images/construction-cone.svg';

const ConfirmAccountContainer: React.FC = () => {
  // Are we currently waiting on info from api?
  const [attempting, setAttempting] = useState<boolean>(true);

  // Is the account confirmed?
  const [wasConfirmed, setWasConfirmed] = useState<boolean>(false);

  // When component mounts, fetch account info on if the account is confirmed
  // from the api, then when finished set attempting to false
  useEffect(() => {
    (async () => {
      try {
        const token = getTokenFromQuery();
        const response = await Auth.confirm(token);
        alert(response)
        if (response.status === 200) {
          console.log('Confirmed account');
          setAttempting(false);
          setWasConfirmed(true);
        } else {
          setAttempting(false);
          setWasConfirmed(false);
          console.error('Did not confirm account');
        }
      } catch (e) {
        setAttempting(true);
        setWasConfirmed(false);
        console.error('No token found in the query parameters');
      }
    })()
  }, []);

  let result;
  let paragraphMessage;
  let buttonMessage;
  let link;
  if (wasConfirmed) {
    result = DashboardText.ConfirmAccount;
    paragraphMessage = DashboardText.ConfirmMessage;
    buttonMessage = DashboardText.Continue;
    link = DashboardText.ConfirmLink;
  } else if (attempting) {
    result = DashboardText.UnableConfirm;
    paragraphMessage = DashboardText.Error;
    buttonMessage = DashboardText.CreateAccount;
    link = DashboardText.AttemptingLink;
  } else {
    result = DashboardText.Confirming;
    paragraphMessage = '';
    buttonMessage = '';
    link = '';
  }

  return (
    <Flex
      justifyContent={'center'}
      alignItems={'center'}
      flexDirection={'column'}
    >
      <Helmet>
        <title>Confirmation | {HACKATHON_NAME}</title>
      </Helmet>
      <MaxWidthBox
        hidden={wasConfirmed && !attempting}
        mb={'20px'}
      >
        <Image src={constructionCone} imgHeight={'6rem'} />
      </MaxWidthBox>
      <Box style={{ marginTop: '6rem' }}>
        <H1 fontSize={'40px'}>{result}</H1>
      </Box>
      <MaxWidthBox hidden={attempting} mb={'20px'}>
        <Paragraph
          fontSize={'24px'}
          maxWidth={'600px'}
          marginLeft={'16px'}
          marginRight={'16px'}
          textAlign={'center'}
        >
          {paragraphMessage}
        </Paragraph>
      </MaxWidthBox>
      <MaxWidthBox hidden={attempting}>
        <Link to={link}>
          <Button>{buttonMessage}</Button>
        </Link>
      </MaxWidthBox>
    </Flex>
  );
}

export default ConfirmAccountContainer;

import { Box, Flex } from '@rebass/grid';
import * as React from 'react';
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

import * as DashboardText from '../Dashboard/DashboardText';

import constructionCone from '../../assets/images/construction-cone.svg';

interface IConfirmAccountState {
  attempting: boolean;
  wasConfirmed: boolean;
}

class ConfirmAccountContainer extends React.Component<
  {},
  IConfirmAccountState
> {
  constructor(props: {}) {
    super(props);
    this.state = {
      attempting: true,
      wasConfirmed: false,
    };
  }
  public render() {
    let result;
    let paragraphMessage;
    let buttonMessage;
    let link;
    if (this.state.wasConfirmed) {
      result = DashboardText.ConfirmAccount;
      paragraphMessage = DashboardText.ConfirmMessage;
      buttonMessage = DashboardText.Continue;
      link = DashboardText.ConfirmLink;
    } else if (!this.state.attempting) {
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
          hidden={this.state.wasConfirmed && !this.state.attempting}
          mb={'20px'}
        >
          <Image src={constructionCone} imgHeight={'6rem'} />
        </MaxWidthBox>
        <Box style={{ marginTop: '6rem' }}>
          <H1 fontSize={'40px'}>{result}</H1>
        </Box>
        <MaxWidthBox hidden={this.state.attempting} mb={'20px'}>
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
        <MaxWidthBox hidden={this.state.attempting}>
          <Link to={link}>
            <Button>{buttonMessage}</Button>
          </Link>
        </MaxWidthBox>
      </Flex>
    );
  }

  public async componentDidMount() {
    try {
      const token = getTokenFromQuery();
      const response = await Auth.confirm(token);
      if (response.status === 200) {
        console.log('Confirmed account');
        this.setState({
          attempting: false,
          wasConfirmed: true,
        });
      } else {
        this.setState({
          attempting: false,
        });
        console.error('Did not confirm account');
      }
    } catch (e) {
      this.setState({
        attempting: false,
      });
      console.error('No token found in the query parameters');
    }
  }
}
export default ConfirmAccountContainer;

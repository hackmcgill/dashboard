import React from 'react';
import { Flex } from '@rebass/grid';
import { AxiosResponse } from 'axios';
import Helmet from 'react-helmet';

import { APIResponse, Auth } from '../../api';
import { EMAIL_SENT, HACKATHON_NAME, RESEND_CONF_EMAIL } from '../../config';
import {
  Button,
  H1,
  Image,
  ButtonVariant
} from '../../shared/Elements';
import ValidationErrorGenerator from '../../shared/Form/validationErrorGenerator';
import WithToasterContainer from '../../shared/HOC/withToaster';

import robot from '../../assets/images/robot.svg';
import theme from '../../shared/Styles/theme';

interface IConfirmationEmailSentState {
  buttonDisabled: boolean;
}

class ConfirmationEmailSentComponent extends React.Component<
  {},
  IConfirmationEmailSentState
  > {
  private sendDelay: number;

  constructor(props: {}) {
    super(props);
    this.state = {
      buttonDisabled: false,
    };
    this.sendDelay = 10000; // 10,000ms
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  public render() {
    return (
      <Flex
        justifyContent={'center'}
        alignItems={'center'}
        flexDirection={'column'}
      >
        <Helmet>
          <title>Confirmation | {HACKATHON_NAME}</title>
        </Helmet>

        <Image
          src={robot}
          imgHeight={'220px'}
          padding={'0 0 68px 0'}
        />

        <H1 textAlign={'center'} marginBottom="0">Confirm your email</H1>

        <div className="explanation">
          Please check your inbox for a confirmation email.<br />
          Click the link in the email to confirm your email address.
        </div>

        <Button
          type="button"
          variant={ButtonVariant.Secondary}
          isOutlined={true}
          onClick={this.handleSubmit}
          disabled={this.state.buttonDisabled}
        >
          {!this.state.buttonDisabled ? RESEND_CONF_EMAIL : EMAIL_SENT}
        </Button>

        <style jsx>{`
          .explanation {
            max-width: 500px;
            text-align: center;

            margin-top: 28px;
            margin-bottom: 68px;

            font-size: 20px;
            color: ${theme.colors.black80};
          }
        `}</style>
      </Flex>
    );
  }
  private handleSubmit() {
    this.setState({
      buttonDisabled: true,
    });
    Auth.resendConfirmationEmail()
      .then((value) => {
        if (value.status === 200) {
          setTimeout(() => {
            this.setState({
              buttonDisabled: false,
            });
          }, this.sendDelay);
        }
      })
      .catch((response: AxiosResponse<APIResponse<any>> | undefined) => {
        if (response && response.data) {
          ValidationErrorGenerator(response.data);
        }
      });
  }
}

export default WithToasterContainer(ConfirmationEmailSentComponent);

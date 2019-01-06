import { Box, Flex } from '@rebass/grid';
import { AxiosResponse } from 'axios';
import * as React from 'react';
import { toast } from 'react-toastify';

import {
  ACCOUNT_NOT_CONFIRMED_MSG,
  EMAIL_SENT,
  FrontendRoute as routes,
  HackerStatus,
  RESEND_CONF_EMAIL,
} from '../config';

import { APIResponse, Auth, Hacker } from '../api';
import ValidationErrorGenerator from '../shared/Form/validationErrorGenerator';
import WithToasterContainer from '../shared/HOC/withToaster';
import { isConfirmed } from '../util/UserInfoHelperFunctions';
import DashboardView, { IDashboardCard } from './View';

import AccountIcon from '../assets/images/dashboard-account.svg';
import ApplicationIcon from '../assets/images/dashboard-application.svg';
import ConfirmIcon from '../assets/images/dashboard-confirm.svg';

export interface IDashboardState {
  status: HackerStatus;
  confirmed: boolean;
}

/**
 * Container that renders form to log in.
 */
class HackerDashboardContainer extends React.Component<{}, IDashboardState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      status: HackerStatus.HACKER_STATUS_NONE,
      confirmed: true,
    };
  }

  public async componentDidMount() {
    try {
      const response = await Hacker.getSelf();
      this.setState({ status: response.data.data.status });
    } catch (e) {
      if (e.status === 401) {
        this.setState({ status: HackerStatus.HACKER_STATUS_NONE });
      }
    }
    try {
      const confirmed = await isConfirmed();
      this.setState({ confirmed });
    } catch (e) {
      this.setState({ confirmed: false });
    }
  }

  public render() {
    const { status, confirmed } = this.state;
    return (
      <DashboardView
        cards={this.generateCards(status, confirmed)}
        title={`status: ${status.toLowerCase()}`}
      />
    );
  }

  private generateCards(status: HackerStatus, confirmed: boolean) {
    let applicationRoute;

    if (status === HackerStatus.HACKER_STATUS_APPLIED) {
      applicationRoute = routes.EDIT_APPLICATION_PAGE;
    } else if (status === HackerStatus.HACKER_STATUS_NONE && confirmed) {
      applicationRoute = routes.CREATE_APPLICATION_PAGE;
    } else {
      applicationRoute = routes.HOME_PAGE;
    }

    const cards: IDashboardCard[] = [
      {
        title: 'Application',
        route: applicationRoute,
        imageSrc: ApplicationIcon,
        validation: this.confirmAccountToastError,
      },
      {
        title: 'Account',
        route: routes.EDIT_ACCOUNT_PAGE,
        imageSrc: AccountIcon,
      },
    ];

    if (status === HackerStatus.HACKER_STATUS_ACCEPTED) {
      cards.push({
        title: 'Confirmation',
        route: routes.CONFIRM_HACKER_PAGE,
        imageSrc: ConfirmIcon,
      });
    }

    return cards;
  }

  private confirmAccountToastError = () => {
    const { status, confirmed } = this.state;
    if (!confirmed) {
      const reactMsg = (
        <Flex flexWrap={'wrap'} alignItems={'center'} justifyContent={'center'}>
          <Box mb={'3px'}>{ACCOUNT_NOT_CONFIRMED_MSG}</Box>
          <Box
            onClick={this.resendConfirmationEmail}
            style={{ textDecoration: 'underline' }}
          >
            {RESEND_CONF_EMAIL}
          </Box>
        </Flex>
      );
      toast.error(reactMsg, {
        autoClose: false,
      });
    } else if (
      !(
        status === HackerStatus.HACKER_STATUS_NONE ||
        status === HackerStatus.HACKER_STATUS_APPLIED
      )
    ) {
      // can only access application if their status is NONE, or APPLIED.
      toast.error('You can no longer access your application.');
    }
  };

  private resendConfirmationEmail = () => {
    Auth.resendConfirmationEmail()
      .then((value: AxiosResponse<APIResponse<{}>>) => {
        if (value.status === 200) {
          toast.success(EMAIL_SENT);
        }
      })
      .catch((response: AxiosResponse<APIResponse<any>> | undefined) => {
        if (response && response.data) {
          ValidationErrorGenerator(response.data);
        }
      });
  };
}
export default WithToasterContainer(HackerDashboardContainer);

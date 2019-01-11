import { Box, Flex } from '@rebass/grid';
import { AxiosResponse } from 'axios';
import * as React from 'react';
import { toast } from 'react-toastify';

import {
  ACCOUNT_NOT_CONFIRMED_MSG,
  EMAIL_SENT,
  FrontendRoute as routes,
  RESEND_CONF_EMAIL,
} from '../config';

import { APIResponse, Auth } from '../api';
import ValidationErrorGenerator from '../shared/Form/validationErrorGenerator';
import WithToasterContainer from '../shared/HOC/withToaster';
import { isConfirmed } from '../util/UserInfoHelperFunctions';
import DashboardView, { IDashboardCard } from './View';

import AccountIcon from '../assets/images/dashboard-account.svg';
import ApplicationIcon from '../assets/images/dashboard-application.svg';
import ConfirmIcon from '../assets/images/dashboard-confirm.svg';

export interface IDashboardState {
  confirmed: boolean;
}

/**
 * Container that renders form to log in.
 */
class AdminDashboardContainer extends React.Component<{}, IDashboardState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      confirmed: true,
    };
  }

  public async componentDidMount() {
    try {
      const confirmed = await isConfirmed();
      this.setState({ confirmed });
    } catch (e) {
      this.setState({ confirmed: false });
    }
  }

  public render() {
    return (
      <DashboardView cards={this.generateCards()} title={'Staff Dashboard'} />
    );
  }

  private generateCards() {
    const cards: IDashboardCard[] = [
      {
        title: 'Search',
        route: routes.ADMIN_SEARCH_PAGE,
        imageSrc: ApplicationIcon,
        validation: this.confirmAccountToastError,
      },
      {
        title: 'Account',
        route: routes.EDIT_ACCOUNT_PAGE,
        imageSrc: AccountIcon,
      },
      {
        title: 'Checkin',
        route: routes.CHECKIN_HACKER_PAGE,
        imageSrc: ConfirmIcon,
      },
    ];

    return cards;
  }

  private confirmAccountToastError = (): boolean => {
    const { confirmed } = this.state;
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
    }
    return confirmed;
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
export default WithToasterContainer(AdminDashboardContainer);

import { Box, Flex } from '@rebass/grid';
import { AxiosResponse } from 'axios';
import * as React from 'react';
import { toast } from 'react-toastify';

import {
  ACCOUNT_NOT_CONFIRMED_MSG,
  BUS_SHOPIFY_PAGE,
  EMAIL_SENT,
  FrontendRoute as routes,
  HackerStatus,
  RESEND_CONF_EMAIL,
} from '../config';

import { APIResponse, Auth, Hacker } from '../api';
import ValidationErrorGenerator from '../shared/Form/validationErrorGenerator';
import WithToasterContainer from '../shared/HOC/withToaster';
import {
  canAccessApplication,
  canAccessBus,
  canAccessTeam,
  isAppOpen,
  isConfirmed,
} from '../util/UserInfoHelperFunctions';
import DashboardView, { IDashboardCard } from './View';

import AccountIcon from '../assets/images/dashboard-account.svg';
import ApplicationIcon from '../assets/images/dashboard-application.svg';
import BusIcon from '../assets/images/dashboard-bus.svg';
import ConfirmIcon from '../assets/images/dashboard-confirm.svg';
import TeamIcon from '../assets/images/dashboard-team.svg';

export interface IDashboardState {
  status: HackerStatus;
  confirmed: boolean;
  hasAppAccess: boolean;
  hasTeamAccess: boolean;
  needsBus: boolean;
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
      hasAppAccess: true,
      hasTeamAccess: false,
      needsBus: false,
    };
  }

  public async componentDidMount() {
    let hacker;
    // set hacker status
    try {
      const response = await Hacker.getSelf();
      hacker = response.data.data;
      this.setState({ status: hacker.status });
    } catch (e) {
      if (e.status === 401) {
        this.setState({ status: HackerStatus.HACKER_STATUS_NONE });
      }
    }
    // set confirmed
    try {
      const confirmed = await isConfirmed();
      this.setState({ confirmed });
    } catch (e) {
      this.setState({ confirmed: false });
    }
    // determine whether the user has app access
    const hasAppAccess = canAccessApplication(hacker);
    const hasTeamAccess = canAccessTeam(hacker);
    const needsBus = canAccessBus(hacker);
    this.setState({ hasAppAccess, hasTeamAccess, needsBus });
  }

  public render() {
    const { status, confirmed } = this.state;
    return (
      <DashboardView
        cards={this.generateCards(status, confirmed)}
        title={`status: ${status.toLowerCase()}`}
        subtitle={!isAppOpen() ? 'Applications are now closed' : undefined}
      />
    );
  }

  private generateCards(status: HackerStatus, confirmed: boolean) {
    const { hasAppAccess, hasTeamAccess, needsBus } = this.state;
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
        validation: this.applicationAccessValidation,
        disabled: !hasAppAccess,
      },
      {
        title: 'Account',
        route: routes.EDIT_ACCOUNT_PAGE,
        imageSrc: AccountIcon,
      },
      {
        title: 'Confirmation',
        route: routes.CONFIRM_HACKER_PAGE,
        imageSrc: ConfirmIcon,
        hidden: status !== HackerStatus.HACKER_STATUS_ACCEPTED,
      },
      {
        title: 'Team',
        route: routes.TEAM_PAGE,
        imageSrc: TeamIcon,
        hidden: !hasTeamAccess,
      },
      {
        title: 'Bus Deposit',
        route: BUS_SHOPIFY_PAGE,
        imageSrc: BusIcon,
        hidden: !needsBus,
      },
    ];
    return cards;
  }

  private applicationAccessValidation = (): boolean => {
    const { confirmed, hasAppAccess } = this.state;
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
    } else if (!hasAppAccess) {
      // can only access application if their status is NONE, or APPLIED.
      toast.error('You can no longer access your application.');
    }
    return hasAppAccess && confirmed;
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

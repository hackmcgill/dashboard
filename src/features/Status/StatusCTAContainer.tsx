import React from 'react';

import StatusCTALocationModal from './StatusCTALocationModal';

import { HackerStatus, IAccount, IHacker, ISetting } from '../../config';
import ConfirmationEmailSentComponent from '../Account/ConfirmationEmailSentComponent';

import { Box, Flex } from '@rebass/grid';
import { Hacker, Settings } from '../../api';
import { ConfirmModal } from '../../shared/Elements';
import ValidationErrorGenerator from '../../shared/Form/validationErrorGenerator';
import StatusCTA from './StatusCTA';

export interface IStatusCTAContainerProps {
  account?: IAccount;
  status: HackerStatus;
  confirmed: boolean;
}

export interface IStatusCTAContainerState {
  status: HackerStatus;
  settings: ISetting;
  isModalOpen: boolean;
  isLocationModalOpen: boolean;
  timeZone: string;
  country: string;
  city: string;
}

class StatusCTAContainer extends React.Component<
  IStatusCTAContainerProps,
  IStatusCTAContainerState
> {
  constructor(props: IStatusCTAContainerProps) {
    super(props);
    this.state = {
      status: this.props.status,
      settings: {
        openTime: new Date().toString(),
        closeTime: new Date().toString(),
        confirmTime: new Date().toString(),
        isRemote: false,
      },
      isModalOpen: false,
      isLocationModalOpen: false,
      timeZone: '',
      country: '',
      city: '',
    };
  }
  public confirmStatus = async () => {
    const { timeZone, city, country } = this.state;
    if (this.props.account) {
      const hacker = (await Hacker.getByEmail(this.props.account.email)).data
        .data;
      if (hacker && timeZone.length > 0 && city.length > 0 && country.length > 0) {
        this.setState({ isLocationModalOpen: false });
        const newHacker = await this.modifyHacker(hacker);
        await Hacker.update(newHacker);
        await Hacker.confirm(hacker.id, true);
        this.setState({ status: HackerStatus.HACKER_STATUS_CONFIRMED });
      }
    }
  };

  public withdrawStatus = async () => {
    if (this.props.account) {
      const hacker = (await Hacker.getByEmail(this.props.account.email)).data
        .data;
      if (hacker) {
        await Hacker.confirm(hacker.id, false);
        this.setState({ status: HackerStatus.HACKER_STATUS_WITHDRAWN });
      }
    }
  };

  public modifyHacker = async (hacker: IHacker) => {
    const newHacker = { ...hacker };
    const { timeZone, country, city } = this.state;
    newHacker.application.location = {
      timeZone,
      country,
      city,
    };
    return newHacker;
  };

  public render() {
    const { timeZone, country, city } = this.state;
    return (
      <Flex
        flex={1}
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        p="6px 30px 96px 30px"
      >
        {this.props.confirmed && this.props.account ? (
          <StatusCTA
            status={this.state.status}
            firstName={this.props.account.firstName}
            settings={this.state.settings}
            onClickConfirm={async () =>
              this.setState({ isLocationModalOpen: true })
            }
            // tslint:disable-next-line: jsx-no-lambda
            onClickWithdraw={() => this.setState({ isModalOpen: true })}
          />
        ) : (
          <ConfirmationEmailSentComponent />
        )}
        <StatusCTALocationModal
          isModalOpen={this.state.isLocationModalOpen}
          onCanceled={() => this.setState({ isLocationModalOpen: false })}
          onConfirmed={this.confirmStatus}
          timeZone={timeZone}
          country={country}
          city={city}
          handleChangeTimeZone={this.handleChangeTimeZone}
          handleChangeCountry={this.handleChangeCountry}
          handleChangeCity={console.log('test')}
        />
        <ConfirmModal
          isOpen={this.state.isModalOpen}
          // tslint:disable-next-line: jsx-no-lambda
          onCanceled={() => this.setState({ isModalOpen: false })}
          // tslint:disable-next-line: jsx-no-lambda
          onConfirmed={() => this.setState({ isModalOpen: false })}
        >
          <Box alignSelf={'center'}>
            Are you sure you want to make these changes?
          </Box>
          <Box mb={'10px'} alignSelf={'center'}>
            This will withdraw you from the event.
          </Box>
        </ConfirmModal>
      </Flex>
    );
  }

  public async componentDidMount() {
    await this.getSettings();
  }

  private async getSettings() {
    try {
      const result = await Settings.get();
      const settings = result.data.data;
      this.setState({ settings });
    } catch (e) {
      if (e && e.data) {
        ValidationErrorGenerator(e);
      }
    }
  }

  private handleChangeTimeZone = ({ value }: any) => {
    this.setState({ timeZone: value });
  };

  private handleChangeCountry = ({ value }: any) => {
    this.setState({ country: value });
  };
}

export default StatusCTAContainer;

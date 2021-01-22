import React from 'react';

import { HackerStatus, IAccount, IHacker, ISetting } from '../../config';
import ConfirmationEmailSentComponent from '../Account/ConfirmationEmailSentComponent';

import { Box, Flex } from '@rebass/grid';
import { Hacker, Settings } from '../../api';
import { ConfirmModal } from '../../shared/Elements';
import { Label, Input, StyledSelect } from '../../shared/Form';
import ValidationErrorGenerator from '../../shared/Form/validationErrorGenerator';
import StatusCTA from './StatusCTA';
import {
  CountriesLVpair,
} from '../../config/countries';
import {
  TimeZonesLVpair,
} from '../../config/timeZones';

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
    this.setState({ isLocationModalOpen: false });
    if (this.props.account) {
      const hacker = (await Hacker.getByEmail(this.props.account.email)).data
        .data;
      if (hacker) {
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
        <ConfirmModal
          isOpen={this.state.isLocationModalOpen}
          onCanceled={() => this.setState({ isLocationModalOpen: false })}
          onConfirmed={this.confirmStatus}
          cancelLabel="Cancel"
          confirmLabel="Submit"
        >
          <Box mb={'10px'} alignSelf={'center'}>
            <Label style={{ minWidth: '300px', maxWidth: '300px', marginBottom: '1em' }}>
              What is your time zone?
              <StyledSelect
                className="react-select-container"
                classNamePrefix="react-select"
                options={TimeZonesLVpair}
                onChange={this.handleChangeTimeZone}
                value={{
                  label: timeZone,
                  value: timeZone
                }}
              />
            </Label>
          </Box>
          <Box mb={'10px'} alignSelf={'center'}>
            <Label style={{ minWidth: '300px', maxWidth: '300px' }}>
              In which country are you currently residing?
              <StyledSelect
                className="react-select-container"
                classNamePrefix="react-select"              
                options={CountriesLVpair}
                onChange={this.handleChangeCountry}
                value={{
                  label: country,
                  value: country
                }}
              />
            </Label>
          </Box>
          <Box mb={'10px'} alignSelf={'center'}>
            <Label style={{ minWidth: '300px', maxWidth: '300px' }}>
              In which city are you currently residing?
              <Input
                onChange={(e) => this.setState({ city: e.target.value })}
                value={city}
              />
            </Label>
          </Box>
        </ConfirmModal>
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

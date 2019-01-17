import { Box, Flex } from '@rebass/grid';
import * as React from 'react';
import { toast } from 'react-toastify';
import { Account, Hacker } from '../api';
import { FrontendRoute } from '../config';
import { H1, MaxWidthBox } from '../shared/Elements';
import ValidationErrorGenerator from '../shared/Form/validationErrorGenerator';
import WithToasterContainer from '../shared/HOC/withToaster';
import theme from '../shared/Styles/theme';
import { generateHackPass } from '../util';
import { Email } from './Email';
import { Reader } from './Reader';

interface ICheckinState {
  loading: boolean;
  lastScan: string;
}

class CheckinContainer extends React.Component<{}, ICheckinState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      loading: false,
      lastScan: '',
    };
    this.handleScanError = this.handleScanError.bind(this);
    this.handleScan = this.handleScan.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.checkinHacker = this.checkinHacker.bind(this);
  }
  public render() {
    return (
      <Flex flexDirection={'column'}>
        <Box>
          <H1
            fontSize={'30px'}
            textAlign={'center'}
            marginBottom={'20px'}
            marginLeft={'0px'}
          >
            Check in Hacker
          </H1>
        </Box>
        <Box>
          <Flex
            flexWrap={'wrap'}
            justifyContent={'space-evenly'}
            alignItems={'flex-start'}
          >
            <MaxWidthBox maxWidth={'330px'} width={1}>
              <H1
                color={theme.colors.greyDark}
                fontSize={'24px'}
                textAlign={'left'}
                marginBottom={'20px'}
                marginLeft={'0px'}
              >
                By QR Code:
              </H1>
              <Box>
                <Reader
                  onError={this.handleScanError}
                  onScan={this.handleScan}
                />
              </Box>
            </MaxWidthBox>
            <MaxWidthBox maxWidth={'330px'} width={1}>
              <H1
                color={theme.colors.greyDark}
                fontSize={'24px'}
                textAlign={'left'}
                marginBottom={'20px'}
                marginLeft={'0px'}
              >
                By Email:
              </H1>
              <Box alignSelf={'center'}>
                <Email onSubmit={this.handleEmail} />
              </Box>
            </MaxWidthBox>
          </Flex>
        </Box>
      </Flex>
    );
  }

  /**
   * Check in a hacker.
   * @param id the id of the Hacker.
   * @returns boolean whether the hacker was properly checked in.
   */
  private async checkinHacker(id: string): Promise<boolean> {
    let checkedIn = false;

    try {
      this.setState({ loading: true });
      await Hacker.checkin(id);
      checkedIn = true;
      toast.success('Hacker checked in.');
      const hacker = (await Hacker.get(id)).data.data;
      const accountId =
        typeof hacker.accountId === 'string'
          ? hacker.accountId
          : hacker.accountId.id;
      const account = (await Account.get(accountId)).data.data;
      await generateHackPass(account, hacker);
    } catch (e) {
      if (e && e.data) {
        ValidationErrorGenerator(e.data);
      }
    } finally {
      this.setState({ loading: false });
    }
    return checkedIn;
  }

  /**
   * Function which checks in a hacker as long as the provided data is of the correct format.
   * @param data Hacker ID, or the url to VIEW_HACKER_PAGE, such as 5c0dd463d95414ef5efd14cd, or https://app.mchacks.ca/application/view/5c0dd463d95414ef5efd14cd
   */
  private async handleScan(data: string | null) {
    if (data && !this.state.loading && this.state.lastScan !== data) {
      this.setState({ lastScan: data });
      data = data.trim();
      const subRouteRegex = FrontendRoute.VIEW_HACKER_PAGE.replace(
        ':id',
        '[a-f\\d]{24}'
      );
      const hackerURL = new RegExp(`^http(s)?:\/\/.+${subRouteRegex}`);
      if (hackerURL.test(data)) {
        const url = data.split('/');
        data = url[url.length - 1];
      }
      if (!data.match(/^[a-f\d]{24}$/i)) {
        toast.error('Invalid QR Code');
        return;
      }
      await this.checkinHacker(data);
    }
  }

  private handleScanError(err: any) {
    toast.error(err);
  }

  private async handleEmail(email: string) {
    try {
      this.setState({ loading: true });
      const hacker = (await Hacker.getByEmail(email)).data.data;
      await this.checkinHacker(hacker.id);
    } catch (e) {
      if (e && e.data) {
        ValidationErrorGenerator(e.data);
      }
    } finally {
      this.setState({ loading: false });
    }
  }
}

export default WithToasterContainer(CheckinContainer);

import { Flex } from '@rebass/grid';
import * as React from 'react';
import { toast } from 'react-toastify';
import { Hacker } from '../api';
import { MaxWidthBox } from '../shared/Elements';
import ValidationErrorGenerator from '../shared/Form/validationErrorGenerator';
import WithToasterContainer from '../shared/HOC/withToaster';
import { Email } from './Email';
import { Reader } from './Reader';

interface ICheckinState {
  loading: boolean;
  useCamera: boolean;
}

class CheckinContainer extends React.Component<{}, ICheckinState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      loading: false,
      useCamera: false,
    };
    this.handleScanError = this.handleScanError.bind(this);
    this.handleScan = this.handleScan.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
  }
  public render() {
    return (
      <Flex>
        <MaxWidthBox maxWidth={'500px'} m={'auto'}>
          {this.state.useCamera ? (
            <Reader onError={this.handleScanError} onScan={this.handleScan} />
          ) : (
            <Email onSubmit={this.handleEmail} />
          )}
        </MaxWidthBox>
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
    } catch (e) {
      if (e && e.data) {
        ValidationErrorGenerator(e.data);
      }
    } finally {
      this.setState({ loading: false });
    }
    return checkedIn;
  }

  private async handleScan(data: string | null) {
    if (data && !this.state.loading) {
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

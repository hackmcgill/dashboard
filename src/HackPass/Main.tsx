import * as React from 'react';

import { Account, Hacker } from '../api';
import { IAccount, IHacker } from '../config';
import { H1 } from '../shared/Elements';
import ValidationErrorGenerator from '../shared/Form/validationErrorGenerator';
import { generateHackerQRCode, generateHackPass } from '../util';
import { Pass } from './Pass';

interface IDashboardState {
  account: IAccount | null;
  hacker: IHacker | null;
  qrData: string;
  loadingHacker: boolean;
  downloadingPass: boolean;
}

class HackPassContainer extends React.Component<{}, IDashboardState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      account: null,
      hacker: null,
      qrData: '',
      loadingHacker: true,
      downloadingPass: false,
    };
    this.handleDownloadPass = this.handleDownloadPass.bind(this);
  }
  public async componentDidMount() {
    try {
      const account = (await Account.getSelf()).data.data;
      const hacker = (await Hacker.getSelf()).data.data;
      const qrData = await generateHackerQRCode(hacker);
      this.setState({ account, hacker, qrData });
    } catch (e) {
      if (e && e.data) {
        ValidationErrorGenerator(e.data);
      }
    } finally {
      this.setState({ loadingHacker: false });
    }
  }
  public render() {
    const { qrData, account, hacker, downloadingPass } = this.state;
    if (qrData && account && hacker) {
      return (
        <Pass
          account={account}
          hacker={hacker}
          qrData={qrData}
          onDownloadPass={this.handleDownloadPass}
          isDownloading={downloadingPass}
        />
      );
    }
    if (this.state.loadingHacker) {
      return <H1>Loading...</H1>;
    }
    return <H1>Error</H1>;
  }

  private async handleDownloadPass(): Promise<void> {
    const { account, hacker } = this.state;
    if (!hacker || !account) {
      return;
    }
    this.setState({ downloadingPass: true });
    await generateHackPass(account, hacker);
    this.setState({ downloadingPass: false });
  }
}

export default HackPassContainer;

import * as React from 'react';

import { Hacker } from '../api';
import { IHacker } from '../config';
import { H1 } from '../shared/Elements';
import ValidationErrorGenerator from '../shared/Form/validationErrorGenerator';
import { generateHackerQRCode, generateHackPass } from '../util';
import { Pass } from './Pass';

interface IDashboardState {
  hacker: IHacker | null;
  qrData: string;
  loadingHacker: boolean;
  loadingPass: boolean;
}

class HackPassContainer extends React.Component<{}, IDashboardState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      hacker: null,
      qrData: '',
      loadingHacker: true,
      loadingPass: false,
    };
    this.handleDownloadPass = this.handleDownloadPass.bind(this);
  }
  public async componentDidMount() {
    try {
      const response = await Hacker.getSelf();
      const hacker = response.data.data;
      const qrData = await generateHackerQRCode(hacker);
      this.setState({ hacker, qrData });
    } catch (e) {
      if (e && e.data) {
        ValidationErrorGenerator(e.data);
      }
    } finally {
      this.setState({ loadingHacker: false });
    }
  }
  public render() {
    if (this.state.qrData) {
      return (
        <Pass
          qrData={this.state.qrData}
          onDownloadPass={this.handleDownloadPass}
          isDownloading={this.state.loadingPass}
        />
      );
    }
    if (this.state.loadingHacker) {
      return <H1>Loading...</H1>;
    }
    return <H1>Error</H1>;
  }

  private async handleDownloadPass(): Promise<void> {
    const { hacker } = this.state;
    if (!hacker) {
      return;
    }
    this.setState({ loadingPass: true });
    await generateHackPass(hacker);
    this.setState({ loadingPass: false });
  }
}

export default HackPassContainer;

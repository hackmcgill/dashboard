import * as React from 'react';

import { Account, Hacker } from '../../api';
import { IAccount, IHacker } from '../../config';
import { SubmitBtn } from '../../shared/Form';
import ValidationErrorGenerator from '../../shared/Form/validationErrorGenerator';
import { generateHackerQRCode, generateHackPass } from '../../util';
import { Pass } from './Pass';
import styled from '../../shared/Styles/styled-components';

interface IDashboardState {
  account: IAccount | null;
  hacker: IHacker | null;
  qrData: string;
  loadingHacker: boolean;
  downloadingPass: boolean;
}

const HackPassWrapper = styled.div`
  max-width: 320px;
  margin-top: 100px;
  margin: auto;
  text-align: center;

  h1 {
    margin-top: 60px;
    margin-bottom: 20px;
    font-weight: normal;
    color: ${(props) => props.theme.colors.red};
  }

  .pass {
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.18);
    
    .info {
      background: ${(props) => props.theme.colors.black5};
      padding-top: 20px;
      padding-bottom: calc(20px + 38px / 2);
      border-radius: 0 0 8px 8px;

      h2 {
        font-size: 1.6em;
        margin: 0;
        margin-bottom: 10px;
      }

      h3 {
        font-weight: normal;
        margin: 0;
      }
    }

    .qrCode {
      width: 100%;
      border-radius: 8px 8px 0 0;
    }
  }

  button[type="submit"] {
    position: relative;
    top: calc(-50px - 38px / 2);
  }
`;

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
        <HackPassWrapper>
          <h1>Your HackPass</h1>
          <Pass account={account} hacker={hacker} qrData={qrData} />
          <SubmitBtn
            onClick={this.handleDownloadPass}
            isLoading={downloadingPass}
          >
            Download pass
          </SubmitBtn>
        </HackPassWrapper>
      );
    }
    if (this.state.loadingHacker) {
      return <h1>Loading...</h1>;
    }
    return <h1>Error</h1>;
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

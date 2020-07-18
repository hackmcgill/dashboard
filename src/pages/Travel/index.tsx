import * as React from 'react';
import Helmet from 'react-helmet';

import { Hacker, Travel } from '../../api';
import { HACKATHON_NAME, IHacker, ITravel } from '../../config';
import {
  BackgroundImage,
  H1,
  H2,
  MaxWidthBox,
  Button,
} from '../../shared/Elements';

import ValidationErrorGenerator from '../../shared/Form/validationErrorGenerator';
import WithToasterContainer from '../../shared/HOC/withToaster';

import Train from '../../assets/images/train.svg';

export interface ITravelState {
  hacker: IHacker | null;
  travel: ITravel | null;
  isLoading: boolean;
}

/**
 * Container that renders form to log in.
 */
class TravelContainer extends React.Component<{}, ITravelState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      hacker: null,
      travel: null,
      isLoading: true,
    };
  }
  public render() {
    let reimbursement = <div />;
    if (this.state.travel) {
      switch (this.state.travel.status) {
        case 'None':
          reimbursement = (
            <div>
              Your request to recieve ${this.state.travel.request.toFixed(2)} in
              reimbursement for travel is still being processed.
              <br />
              <br />
              <h2>Bus</h2>
              We're offering a round-trip bus from Toronto to McHacks. Seats are
              available on a first-come, first-serve basis. You can place a
              deposit to secure a seat on the bus{' '}
              <a
                href="https://bus.mchacks.ca"
                target="_blank"
                rel="noopener noreferrer"
              >
                here
              </a>
              .
            </div>
          );
          break;
        case 'Bus':
          reimbursement = (
            <div>
              Congratulations, you've secured a seat on our Toronto bus to/from
              McHacks!
              <br />
              <br />
              <h2>Bus</h2>
              Join the #bus-toronto channel on our official{' '}
              <a
                href="https://join.slack.com/t/mchacks7/shared_invite/enQtOTA3MDc2NDU4OTAyLTI0ZWU1N2VkOGExZTA3NDg3Y2JiMGE3MGE2ZmU4MGRlYjI3YmZlYjAxYmI0OTk2ZjZjYTE0ZjNhYmY0ZDNmZmU"
                target="_blank"
                rel="noopener noreferrer"
              >
                Slack
              </a>{' '}
              for details and more information about your bus route.
              <br />
              <br />
              If you can no longer make it to McHacks, please{' '}
              <a
                href="https://bus.mchacks.ca"
                target="_blank"
                rel="noopener noreferrer"
              >
                contact
              </a>{' '}
              us so we can refund your deposit and open the seat up to another
              hacker.
            </div>
          );
          break;
        case 'Policy':
          reimbursement = (
            <div>
              Your travel reimbursement decision has been released. In order to
              see how much you will be reimbursed, you must first agree to our{' '}
              <a
                href="https://docs.google.com/document/d/1K8WSGQtWfKrybT_O9WrxIp93dETrv3jhy71fkHKZwdM"
                target="_blank"
                rel="noopener noreferrer"
              >
                travel policy
              </a>
              .
              <div style={{ textAlign: 'center', marginTop: '18px' }}>
                <Button>I agree to McHacks Travel Policy</Button>
              </div>
            </div>
          );
          break;
        case 'Offered':
        case 'Valid':
        case 'Invalid':
          // TODO: Handle Valid and Invalid cases once reciepts are handled
          if (this.state.travel.offer > 0) {
            reimbursement = (
              <div>
                We're happy to offer an amount to subsidize your travel to
                McHacks. We can reimburse you up to:
                <H2
                  fontSize={'30px'}
                  textAlign={'center'}
                  marginTop={'30px'}
                  marginBottom={'30px'}
                  fontWeight={'normal'}
                >
                  ${this.state.travel.offer.toFixed(2)}
                </H2>
                <div
                  style={{
                    textAlign: 'center',
                    border: '2px dashed #ddd',
                    padding: '8px 0',
                  }}
                >
                  Please{' '}
                  <a
                    href="https://forms.gle/TdxUaUn31WzXcPvu6"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    upload your receipts
                  </a>
                </div>
              </div>
            );
          } else if (this.state.travel.request === 0) {
            reimbursement = (
              <div>
                No reimbursement for travel was requested.
                <h2>Bus</h2>
                We're offering a round-trip bus from Toronto to McHacks. Seats
                are available on a first-come, first-serve basis. You can place
                a deposit to secure a seat on the bus{' '}
                <a
                  href="https://bus.mchacks.ca"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  here
                </a>
                .
              </div>
            )
          } else {
            reimbursement = (
              <div>
                Unfortunately, we’re unable to offer you any travel
                reimbursement to McHacks.
                <H2
                  fontSize={'30px'}
                  textAlign={'center'}
                  marginTop={'30px'}
                  marginBottom={'30px'}
                  fontWeight={'normal'}
                >
                  No Amount
                </H2>
                <h2>Bus</h2>
                We're offering a round-trip bus from Toronto to McHacks. Seats
                are available on a first-come, first-serve basis. You can place
                a deposit to secure a seat on the bus{' '}
                <a
                  href="https://bus.mchacks.ca"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  here
                </a>
                .
              </div>
            );
          }
          break;
        case 'Claimed':
          // TODO: Handle Valid and Invalid cases once reciepts are handled
          reimbursement = (
            <div>
              We reimbursed you for
              <H2
                fontSize={'30px'}
                textAlign={'center'}
                marginTop={'30px'}
                marginBottom={'30px'}
                fontWeight={'normal'}
              >
                ${this.state.travel.offer.toFixed(2)}
              </H2>
              which you have already claimed.
            </div>
          );
          break;
      }
    }

    return (
      <div>
        <Helmet>
          <title>Travel | {HACKATHON_NAME}</title>
        </Helmet>
        {this.state.isLoading ? (
          <div />
        ) : (
            <MaxWidthBox maxWidth={'400px'} mx={[5, 'auto']}>
              <H1 fontSize={'30px'} marginTop={'100px'} marginLeft={'0px'}>
                Travel
            </H1>
              <h2>Status</h2>
              {reimbursement}
              <br />
              <br />
              <div>
                Please ensure you've reviewed our{' '}
                <a
                  href="https://docs.google.com/document/d/1K8WSGQtWfKrybT_O9WrxIp93dETrv3jhy71fkHKZwdM"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  travel policy
              </a>{' '}
                if using any of our travel accommodation options.
            </div>
            </MaxWidthBox>
          )}
        <BackgroundImage
          right={'0'}
          bottom={'0'}
          src={Train}
          imgWidth={'80%'}
          position={'fixed' as 'fixed'}
        />
      </div>
    );
  }

  public componentDidMount() {
    return this.getTravelInfo();
  }

  private async getTravelInfo() {
    try {
      const hacker = (await Hacker.getSelf()).data.data;
      const travel = (await Travel.getSelf()).data.data;
      this.setState({
        hacker,
        travel,
      });
    } catch (e) {
      if (e && e.data) {
        ValidationErrorGenerator(e.data);
      }
    } finally {
      this.setState({ isLoading: false });
    }
  }
}

export default WithToasterContainer(TravelContainer);

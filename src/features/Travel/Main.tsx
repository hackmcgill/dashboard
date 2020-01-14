import * as React from 'react';
import Helmet from 'react-helmet';

import { Hacker, Travel } from '../../api';
import { HACKATHON_NAME, IHacker, ITravel } from '../../config';
import { BackgroundImage, H1, H2, MaxWidthBox, Button } from '../../shared/Elements';

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
      isLoading: true
    };
  }
  public render() {
    let reimbursement = <div></div>;
    if (this.state.travel) {
      switch (this.state.travel.status) {
        case 'None':
          reimbursement = <div>
            Your request to recieve ${this.state.travel.request.toFixed(2)} in reimbursement for travel is still being processed.
          </div>;
          break;
        case 'Bus':
          reimbursement = <div>
            You are taking a bus. We should put more info about the bus here.
          </div>;
          break;
        case 'Policy':
          reimbursement = <div>
            Your travel reimbursement decision has been released. In order to see how much you will be reimbursed, you must first
            agree to our <a href="https://docs.google.com/document/d/1K8WSGQtWfKrybT_O9WrxIp93dETrv3jhy71fkHKZwdM" target="_blank">travel policy</a>.
            <div style={{ textAlign: 'center', marginTop: '18px' }}>
              <Button>I agree to McHacks Travel Policy</Button>
            </div>
          </div>;
          break;
        case 'Offered':
        case 'Valid':
        case 'Invalid':
          // TODO: Handle Valid and Invalid cases once reciepts are handled
          if (this.state.travel.offer > 0) {
            reimbursement = <div>
              We will reimburse you for
              <H2 fontSize={'30px'} textAlign={'center'} marginTop={'30px'} marginBottom={'30px'} fontWeight={'normal'}>
                ${this.state.travel.offer.toFixed(2)}
              </H2>
              <div style={{ textAlign: 'center', border: '2px dashed #ddd', padding: '8px 0' }}>
                Please <a href="https://forms.gle/TdxUaUn31WzXcPvu6" target="_blank">upload your receipts</a>
              </div>
            </div>;
          } else {
            reimbursement = <div>
              Unfortunately, due to financial restrictions, we are unable to provide you reimbursement for funding
              <H2 fontSize={'30px'} textAlign={'center'} marginTop={'30px'} marginBottom={'30px'} fontWeight={'normal'}>
                No Amount
              </H2>
              <div style={{ textAlign: 'center', border: '2px dashed #ddd', padding: '8px 0' }}>
                <a href="mailto:contact@mchacks.ca">Let us know</a> if you think this is an error
              </div>
            </div>;
          }
          break;
        case 'Claimed':
          // TODO: Handle Valid and Invalid cases once reciepts are handled
          reimbursement = <div>
            We reimbursed you for
            <H2 fontSize={'30px'} textAlign={'center'} marginTop={'30px'} marginBottom={'30px'} fontWeight={'normal'}>
              ${this.state.travel.offer.toFixed(2)}
            </H2>
            which you have already claimed.
          </div>;
          break;
      }
    }

    return (
      <div>
        <Helmet>
          <title>Travel | {HACKATHON_NAME}</title>
        </Helmet>
        {
          this.state.isLoading ?
            <div /> :
            <MaxWidthBox maxWidth={'400px'} mx={[5, 'auto']}>
              <H1 fontSize={'30px'} marginTop={'100px'} marginLeft={'0px'}>
                Travel
              </H1>
              <b>Status</b><br />
              {reimbursement}
            </MaxWidthBox>
        }
        <BackgroundImage
          right={'0'}
          bottom={'0'}
          src={Train}
          imgWidth={'80%'}
          position={'fixed' as 'fixed'}
        />
      </div >
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
        travel
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

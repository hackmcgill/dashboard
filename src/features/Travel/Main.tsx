import * as React from 'react';
import Helmet from 'react-helmet';

import { Hacker, Travel } from '../../api';
import { HACKATHON_NAME, IHacker, ITravel } from '../../config';
import { H1, H2, MaxWidthBox } from '../../shared/Elements';

import ValidationErrorGenerator from '../../shared/Form/validationErrorGenerator';
import WithToasterContainer from '../../shared/HOC/withToaster';

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
            You are taking a bus.
          </div>;
          break;
        case 'Offered':
        case 'Valid':
        case 'Invalid':
          // TODO: Handle Valid and Invalid cases once reciepts are handled
          reimbursement = <div>
            Blah blah bleep bloop we will reimburse you for
            <H2 fontSize={'30px'} textAlign={'center'} marginTop={'30px'} marginBottom={'30px'} fontWeight={'normal'}>
              ${this.state.travel.offer.toFixed(2)}
            </H2>
            Something about uploading reciepts goes here
          </div>;
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
          <title>Team | {HACKATHON_NAME}</title>
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

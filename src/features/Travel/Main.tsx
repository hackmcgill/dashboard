import * as React from 'react';
import Helmet from 'react-helmet';

import { Hacker } from '../../api';
import { HACKATHON_NAME, IHacker } from '../../config';
import { H1, H2, MaxWidthBox } from '../../shared/Elements';

import ValidationErrorGenerator from '../../shared/Form/validationErrorGenerator';
import WithToasterContainer from '../../shared/HOC/withToaster';

export interface ITravelState {
  hacker: IHacker | null;
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
      isLoading: true
    };
  }
  public render() {
    let reimbursement = <div>
      <b>Status</b><br />
      Blah blah bleep bloop we will reimburse you for
      <H2 fontSize={'30px'} textAlign={'center'} marginTop={'30px'} marginBottom={'30px'} fontWeight={'normal'}>
        $45.00
      </H2>
      Something about uploading reciepts goes here
    </div>;
    reimbursement = <div>
      <b>Status</b><br />
      Unfortunately we are unable to reimburse you for travel.<br />
      <a href="mailto:contact@mchacks.ca">Let us know</a> if you think this is a mistake.
    </div>;
    reimbursement = <div>
      <b>Status</b><br></br>
      Your request to recieve reimbursement for travel is still being processed.
    </div>;

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
              {reimbursement}
            </MaxWidthBox>
        }
      </div>
    );
  }

  public componentDidMount() {
    return this.getTravelInfo();
  }

  private async getTravelInfo() {
    try {
      const hacker = (await Hacker.getSelf()).data.data;
      this.setState({
        hacker,
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

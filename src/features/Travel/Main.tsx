import * as React from 'react';
import Helmet from 'react-helmet';

import { Hacker } from '../../api';
import { HACKATHON_NAME, IHacker } from '../../config';

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
    return (
      <div>
        <Helmet>
          <title>Team | {HACKATHON_NAME}</title>
        </Helmet>
        {this.state.isLoading ? <div>Loading</div> : <div>Loaded</div>}
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

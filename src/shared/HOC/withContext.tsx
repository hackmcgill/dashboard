import * as React from 'react';
import { Sponsor } from '../../api';
import { ISponsor } from '../../config';
import NomineeContext from '../../Search/Context';

interface IState {
  sponsor?: ISponsor;
}

const withContext = <P extends {}>(Component: React.ComponentType<P>) =>
  class extends React.Component<P, IState> {
    constructor(props: any) {
      super(props);
      this.state = {
        sponsor: undefined,
      };
    }

    public async componentDidMount() {
      try {
        const sponsor = (await Sponsor.getSelf()).data.data;
        this.setState({ sponsor });
      } catch (e) {
        return;
      }
    }

    public render() {
      return (
        <NomineeContext.Provider value={this.state.sponsor}>
          <Component {...this.props} />
        </NomineeContext.Provider>
      );
    }
  };

export default withContext;

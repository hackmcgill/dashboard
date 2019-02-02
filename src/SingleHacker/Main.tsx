import { Box, Flex } from '@rebass/grid';
import * as React from 'react';
import { Redirect, RouteComponentProps } from 'react-router';
import { Account, Hacker } from '../api';
import { IHacker, UserType } from '../config';
import HackerSelect from '../Search/HackerSelect';
import { H1, H2 } from '../shared/Elements';
import withContext from '../shared/HOC/withContext';
import SingleHackerView from './SingleHackerView';

interface IParams {
  id: string;
}

interface ISingleHackerContainerProps extends RouteComponentProps<IParams> {}

interface ISingleHackerContainerState {
  isLoading: boolean;
  hacker: IHacker | null;
  userType: UserType;
}

class SingleHackerContainer extends React.Component<
  ISingleHackerContainerProps,
  ISingleHackerContainerState
> {
  constructor(props: ISingleHackerContainerProps) {
    super(props);
    this.state = {
      isLoading: true,
      hacker: null,
      userType: UserType.UNKNOWN,
    };
  }

  public async componentDidMount() {
    try {
      const hacker = (await Hacker.get(this.props.match.params.id)).data.data;
      const account = (await Account.get(hacker.accountId as string)).data.data;
      hacker.accountId = account;
      this.setState({ hacker, isLoading: false });
    } catch (e) {
      this.setState({ isLoading: false });
    }
    try {
      const viewer = (await Account.getSelf()).data.data;
      this.setState({ userType: viewer.accountType });
      // tslint:disable-next-line:no-empty
    } catch (e) {}
  }

  public render() {
    if (this.state.hacker) {
      return (
        <Flex justify-content={'center'} m={'10px'} flexDirection={'column'}>
          <Box m={'auto'}>
            <SingleHackerView
              hacker={this.state.hacker}
              userType={this.state.userType}
            />
            {this.context && <hr />}
            {this.context && (
              <Flex m={'auto'}>
                <Box>
                  <H2 marginBottom={'3px'}>Save Hacker:</H2>
                </Box>
                <Box>
                  <HackerSelect hackerId={this.state.hacker.id} />
                </Box>
              </Flex>
            )}
          </Box>
        </Flex>
      );
    } else if (this.state.isLoading) {
      return (
        <Flex alignItems={'center'}>
          <Box m={'auto'}>
            <H1>Loading...</H1>
          </Box>
        </Flex>
      );
    } else {
      return <Redirect to={'/404'} />;
    }
  }
}

export default withContext(SingleHackerContainer);

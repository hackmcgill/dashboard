import { Box, Flex } from '@rebass/grid';
import * as React from 'react';
import { Redirect, RouteComponentProps } from 'react-router';
import { Account, Hacker } from '../api';
import { IHacker, UserType } from '../config';
import { H1 } from '../shared/Elements';
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
  }

  public render() {
    if (this.state.hacker) {
      return (
        <Flex justify-content={'center'} m={'10px'}>
          <Box m={'auto'}>
            <SingleHackerView
              hacker={this.state.hacker}
              userType={this.state.userType}
            />
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

export default SingleHackerContainer;

import { Box, Flex } from '@rebass/grid';
import React from 'react';
import { Hacker } from '../api';
// import Team from '../api/team';
import { ITeam } from '../config';
import {
  Button,
  FormDescription,
  H1,
  Image,
  MaxWidthBox,
} from '../shared/Elements';
import ValidationErrorGenerator from '../shared/Form/validationErrorGenerator';
import WithToasterContainer from '../shared/HOC/withToaster';

import CopyImage from '../assets/images/copy-icon.svg';

enum ModalState {
  CLOSED,
  CREATE,
  JOIN,
}

export interface ITeamState {
  team: ITeam | null;
  isLoading: boolean;
  modalState: ModalState;
}

/**
 * Container that renders form to log in.
 */
class TeamContainer extends React.Component<{}, ITeamState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      team: null,
      isLoading: true,
      modalState: ModalState.CLOSED,
    };
    this.onClickFactory = this.onClickFactory.bind(this);
  }
  public render() {
    return (
      <MaxWidthBox maxWidth={'500px'} m={'auto'}>
        <H1 fontSize={'30px'} marginTop={'0px'} marginLeft={'0px'}>
          Team
        </H1>
        {this.state.isLoading ? (
          <div>Loading...</div>
        ) : !this.state.team ? (
          this.renderJoinCreateButtons()
        ) : (
          this.renderTeamDescription()
        )}
      </MaxWidthBox>
    );
  }

  public async componentDidMount() {
    try {
      const hacker = (await Hacker.getSelf()).data.data;
      if (hacker) {
        // && hacker.teamId) {
        // const id = String(hacker.teamId);
        const team = {
          teamName: 'Hackboard 6',
          members: [],
        };
        // (await Team.get(id)).data.data;
        this.setState({
          team,
        });
      }
      this.setState({ isLoading: false });
    } catch (e) {
      if (e && e.data) {
        ValidationErrorGenerator(e.data);
      }
      // For some reason we could not get self. We should switch our state to CREATE.
      this.setState({ isLoading: false });
    }
  }

  private onClickFactory(modalState: ModalState): (e: any) => void {
    return (e) => {
      this.setState({ modalState: ModalState.JOIN });
    };
  }

  private renderJoinCreateButtons() {
    return [
      <FormDescription key={1}>
        Join an existing team, or create a team.
      </FormDescription>,
      <Flex ml={'10px'} key={2}>
        <Box>
          <Button onClick={this.onClickFactory(ModalState.CREATE)}>
            Join Team
          </Button>
        </Box>
        <Box>
          <Button onClick={this.onClickFactory(ModalState.CREATE)}>
            Create Team
          </Button>
        </Box>
      </Flex>,
    ];
  }
  private renderTeamDescription() {
    const firstColumnWidth = 0.3;
    return (
      <Flex ml={'10px'} flexDirection={'column'}>
        <Box>
          <Flex>
            <Box width={firstColumnWidth}>Team name:</Box>
            <Box>
              {(this.state.team as ITeam).teamName}
              <Image src={CopyImage} padding={'0rem'} />
            </Box>
          </Flex>
        </Box>
        <Box>
          <Flex>
            <Box width={firstColumnWidth}>Team members:</Box>
            <Box>
              <Flex flexDirection={'column'}>
                <Box>Theo</Box>
                <Box>Theo</Box>
                <Box>Theo</Box>
                <Box>Theo</Box>
                <Box>Theo</Box>
              </Flex>
            </Box>
          </Flex>
        </Box>
      </Flex>
    );
  }
}

export default WithToasterContainer(TeamContainer);

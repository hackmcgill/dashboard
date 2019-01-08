import React from 'react';

import { Hacker } from '../api';
import Team from '../api/team';
import { IHacker, IMemberName, ITeam } from '../config';

import { ITeamResponse } from '../config/teamGETResponse';
import ValidationErrorGenerator from '../shared/Form/validationErrorGenerator';
import WithToasterContainer from '../shared/HOC/withToaster';
import { JoinCreateTeam } from './JoinCreateTeam';
import { TeamDescription } from './TeamDescription';

export interface ITeamState {
  hacker: IHacker | null;
  team: ITeam | null;
  members: IMemberName[];
  isLoading: boolean;
}

/**
 * Container that renders form to log in.
 */
class TeamContainer extends React.Component<{}, ITeamState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      hacker: null,
      team: null,
      members: [],
      isLoading: true,
    };
  }
  public render() {
    if (this.state.isLoading) {
      return <div>Loading...</div>;
    } else if (!this.state.team && this.state.hacker) {
      return <JoinCreateTeam hacker={this.state.hacker} />;
    } else if (this.state.team) {
      return (
        <TeamDescription team={this.state.team} members={this.state.members} />
      );
    }
    return <div />;
  }

  public async componentDidMount() {
    try {
      const hacker = (await Hacker.getSelf()).data.data;
      if (hacker && hacker.teamId) {
        const id = String(hacker.teamId);
        const teamResponse: ITeamResponse = (await Team.get(id)).data.data;
        this.setState({
          hacker,
          team: teamResponse.team,
          members: teamResponse.members,
        });
      } else if (hacker) {
        this.setState({ hacker });
      }
      this.setState({ isLoading: false });
    } catch (e) {
      if (e && e.data) {
        ValidationErrorGenerator(e.data);
      }
      this.setState({ isLoading: false });
    }
  }
}

export default WithToasterContainer(TeamContainer);

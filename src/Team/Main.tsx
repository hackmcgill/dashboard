import * as React from 'react';
import Helmet from 'react-helmet';

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
  isLeavingTeam: boolean;
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
      isLeavingTeam: false,
    };
    this.onLeaveTeam = this.onLeaveTeam.bind(this);
    this.getTeam = this.getTeam.bind(this);
  }
  public render() {
    let content;
    if (this.state.isLoading) {
      content = <div>Loading...</div>;
    } else if (!this.state.team && this.state.hacker) {
      content = (
        <JoinCreateTeam
          hacker={this.state.hacker}
          onTeamChange={this.getTeam}
        />
      );
    } else if (this.state.team) {
      content = (
        <TeamDescription
          team={this.state.team}
          members={this.state.members}
          onLeaveTeam={this.onLeaveTeam}
          isLeavingTeam={this.state.isLeavingTeam}
        />
      );
    } else {
      content = <div />;
    }
    return (
      <div>
        <Helmet>
          <title>Team | McHacks 6</title>
        </Helmet>
        {content}
      </div>
    );
  }

  public componentDidMount() {
    return this.getTeam();
  }

  private async getTeam() {
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
        this.setState({ hacker, team: null, members: [] });
      }
    } catch (e) {
      if (e && e.data) {
        ValidationErrorGenerator(e.data);
      }
    } finally {
      this.setState({ isLoading: false });
    }
  }

  private async onLeaveTeam() {
    try {
      this.setState({ isLeavingTeam: true });
      await Team.leave();
    } catch (e) {
      if (e && e.data) {
        ValidationErrorGenerator(e.data);
      }
    } finally {
      this.setState({ isLeavingTeam: false });
    }
    return this.getTeam();
  }
}

export default WithToasterContainer(TeamContainer);

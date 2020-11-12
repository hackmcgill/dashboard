import React, { useState, useEffect } from 'react';
import Helmet from 'react-helmet';

import { Hacker } from '../../api';
import Team from '../../api/team';
import { HACKATHON_NAME, IHacker, IMemberName, ITeam } from '../../config';

import { ITeamResponse } from '../../config/teamGETResponse';
import ValidationErrorGenerator from '../../shared/Form/validationErrorGenerator';
import WithToasterContainer from '../../shared/HOC/withToaster';
import { JoinCreateTeam } from '../../features/Team/JoinCreateTeam';
import { TeamDescription } from '../../features/Team/TeamDescription';
import { Flex } from '@rebass/grid';

/**
 * Container that renders form to log in.
 */
const TeamPage: React.FC = () => {
  const [hacker, setHacker] = useState<IHacker | null>(null);
  const [team, setTeam] = useState<ITeam | null>(null);
  const [members, setMembers] = useState<IMemberName[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLeavingTeam, setIsLeavingTeam] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      getTeam();
    })();
  }, []);

  /**
   * Get the hacker's team, if any
   * and if they are on a team, get team's details and data on other members of team
   */
  const getTeam = async () => {
    setIsLoading(true);
    try {
      const hacker = (await Hacker.getSelf()).data.data;
      if (hacker && hacker.teamId) {
        const id = String(hacker.teamId);
        const teamResponse: ITeamResponse = (await Team.get(id)).data.data;
        setHacker(hacker);
        setTeam(teamResponse.team);
        setMembers(teamResponse.members);
      } else if (hacker) {
        setHacker(hacker);
        setTeam(null);
        setMembers([]);
      }
    } catch (e) {
      if (e && e.data) {
        ValidationErrorGenerator(e.data);
      }
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Have signed in hacker leave their current team
   */
  const onLeaveTeam = async () => {
    try {
      setIsLeavingTeam(true);
      await Team.leave();
    } catch (e) {
      if (e && e.data) {
        ValidationErrorGenerator(e.data);
      }
    } finally {
      setIsLeavingTeam(false);
    }
    return getTeam();
  };

  let content;
  if (isLoading) {
    content = <div />;
  } else if (!team && hacker) {
    content = <JoinCreateTeam hacker={hacker} onTeamChange={getTeam} />;
  } else if (team) {
    content = (
      <TeamDescription
        team={team}
        members={members}
        onLeaveTeam={onLeaveTeam}
        isLeavingTeam={isLeavingTeam}
      />
    );
  } else {
    content = <div />;
  }

  return (
    <div>
      <Helmet title={'Team | ' + HACKATHON_NAME} />
      {content}
    </div>
  );
};

export default WithToasterContainer(TeamPage);

import React, { useState, useEffect } from 'react';
import Helmet from 'react-helmet';

import { Hacker } from '../../api';
import Team from '../../api/team';
import { HACKATHON_NAME, IHacker, IMemberName, ITeam, TEAM_OVERVIEW } from '../../config';

import { ITeamResponse } from '../../config/teamGETResponse';
import ValidationErrorGenerator from '../../shared/Form/validationErrorGenerator';
import JoinCreateTeam from '../../features/Team/JoinCreateTeam';
import TeamDescription from '../../features/Team/TeamDescription';
import WithToasterContainer from '../../shared/HOC/withToaster';
import { H1 } from '../../shared/Elements';
import theme from '../../shared/Styles/theme';

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
    <div className="centered">
      <Helmet title={'Team | ' + HACKATHON_NAME} />

      <div className="team-box">
        <div className="title">
          <H1 marginBottom="8px">Your Team</H1>
          <div className="info-text">{TEAM_OVERVIEW}</div>
        </div>
        {content}
      </div>

      <style jsx>{`
        .centered {
          /* Center vertically */
          flex: 1;
          padding-top: 24px;
          padding-bottom: 114px; /* Offset for navbar (90px) + 24px vertical padding */

          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .team-box {
          max-width: 400px;
          text-align: left;
        }

        .title {
          margin-bottom: 32px;
        }

        .title .info-text {
          border-left: 4px solid ${theme.colors.purpleLight};
          padding: 4px 16px;
          margin-left: -20px;
          color: ${theme.colors.black80};
          font-size: 14px;
        }
      `}</style>
    </div>
  );
};

export default WithToasterContainer(TeamPage);

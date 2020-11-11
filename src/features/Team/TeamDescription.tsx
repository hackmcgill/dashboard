import * as React from 'react';

import { IMemberName, ITeam, TEAM_OVERVIEW } from '../../config';
import { H1 } from '../../shared/Elements';
import theme from '../../shared/Styles/theme';

interface ITeamDescriptionProps {
  team: ITeam;
  members: IMemberName[];
  onLeaveTeam: () => void;
  isLeavingTeam: boolean;
}

const TeamDescription: React.FC<ITeamDescriptionProps> = (
  props: ITeamDescriptionProps
) => {
  return (
    <div className="centered">
      <div className="team-box">
        <div className="title">
          <H1 marginBottom="8px">Your Team</H1>
          <div className="info-text">{TEAM_OVERVIEW}</div>
        </div>

        <div className="team-code-container">
          <div className="label">Team code</div>
          <div className="info-text">Share this code with your team members to let them join:</div>
          <div className="team-code">{props.team.name}</div>
        </div>

        <div className="team-members-container">
          <div className="label">Members</div>
          <div className="members">
            {props.members.map((member, index) => (
              <div className="member" key={index}>{member.firstName} {member.lastName}</div>
            ))}
          </div>
        </div>

        {
          !props.isLeavingTeam ?
            <div className="text-button" onClick={props.onLeaveTeam}>
              Leave team
            </div> :
            <div>
              Leaving team...
            </div>
        }
      </div>

      <style jsx>{`
        .centered {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          /* Once dashboard pr is merged can switch to automatic centering */
          padding-top: 120px;
        }

        .team-box {
          max-width: 400px;
          text-align: left;
        }

        .title {
          margin-bottom: 32px;
        }

        .label {
          font-family: ${theme.fonts.header};
          margin-bottom: 8px;
        }

        .team-code {
          color: ${theme.colors.black60};
          font-family: ${theme.fonts.header};
          font-size: 24px;

          text-align: center;
          margin-top: 36px;
          margin-bottom: 48px;
        }

        .members {
          margin-top: 24px;
          margin-bottom: 16px;
        }

        .member:first-child {
          border-top: 1px solid ${theme.colors.black10};
        }

        .member {
          border-bottom: 1px solid ${theme.colors.black10};
          padding: 16px 24px;
        }

        .text-button {
          display: inline-block;
          color: ${theme.colors.black60};
          text-decoration: underline;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export { TeamDescription };

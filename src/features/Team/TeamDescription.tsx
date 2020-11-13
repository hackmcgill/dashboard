import * as React from 'react';

import { HackerStatus, IMemberName, ITeam, TEAM_OVERVIEW } from '../../config';
import { H1 } from '../../shared/Elements';
import theme from '../../shared/Styles/theme';

import { toast } from 'react-toastify';
import ClipboardComponent from '../../shared/Elements/Clipboard';
import WithToasterContainer from '../../shared/HOC/withToaster';
import TextButton from '../../shared/Elements/TextButton';

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
          <div className="label">Team name</div>
          <div className="info-text">Share this code with your team members to let them join:</div>
          <div className="team-code">
            <ClipboardComponent
              value={props.team.name}
              onSuccess={onCopied}
              onError={onCopyFailed}
            />
          </div>
        </div>

        <div className="team-members-container">
          <div className="label">Members</div>
          <div className="members">
            {props.members.map((member, index) => {
              const applied = member.status === HackerStatus.HACKER_STATUS_NONE;

              return <div className="member" key={index}>
                <div>
                  <div className="name">{member.firstName} {member.lastName}</div>
                  <div className="school">{member.school}</div>
                </div>
                <div className={'status' + (applied ? ' incomplete' : ' applied')}>
                  {applied ? 'Incomplete Application' : 'Applied'}
                </div>
              </div>
            })}
          </div>
        </div>

        <TextButton isLoading={props.isLeavingTeam} onClick={props.onLeaveTeam}>
          Leave team
        </TextButton>
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
        }

        .label {
          font-family: ${theme.fonts.header};
          margin-bottom: 8px;
        }

        .info-text {
          color: ${theme.colors.black80};
          font-size: 14px;
        }

        .team-code {
          border: 1px solid ${theme.colors.purpleLight};
          font-family: ${theme.fonts.header};
          color: ${theme.colors.black70};
          font-size: 24px;
          padding: 16px;
          border-radius: 8px;

          margin-top: 8px;
          margin-bottom: 48px;

          /* Horizontally center contents */
          display: flex;
          justify-content: center;
        }

        .members {
          margin-top: 16px;
          margin-bottom: 16px;
        }

        .member {
          border-bottom: 1px solid ${theme.colors.purpleLight};
          padding: 16px 24px;
          
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .member:first-child {
          border-top: 1px solid ${theme.colors.purpleLight};
        }

        .member .school {
          font-size: 14px;
          color: ${theme.colors.black60};
        }

        .member .status {
          font-size: 14px;
          color: ${theme.colors.purple};
        }

        .member .status.incomplete {
          color: ${theme.colors.redMed};
        }
      `}</style>
    </div>
  );
};

function onCopied(e: any) {
  toast.success('Copied!');
}

function onCopyFailed(e: any) {
  toast.error('Error.');
}

export default WithToasterContainer(TeamDescription);

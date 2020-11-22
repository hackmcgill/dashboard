import React from 'react';

import { IMemberName, ITeam } from '../../config';
import theme from '../../shared/Styles/theme';

import { toast } from 'react-toastify';
import ClipboardComponent from '../../shared/Elements/Clipboard';
import WithToasterContainer from '../../shared/HOC/withToaster';
import TextButton from '../../shared/Elements/TextButton';
import MemberList from './MemberList/MemberList';

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
    <>
      <div className="team-code-container">
        <div className="label">Team code</div>
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
        <MemberList members={props.members} />
      </div>

      <TextButton isLoading={props.isLeavingTeam} onClick={props.onLeaveTeam}>
        Leave team
      </TextButton>

      <style jsx>{`
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
      `}</style>
    </>
  );
};

function onCopied(e: any) {
  toast.success('Copied!');
}

function onCopyFailed(e: any) {
  toast.error('Error.');
}

export default WithToasterContainer(TeamDescription);

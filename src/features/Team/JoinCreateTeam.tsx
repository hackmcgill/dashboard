import React, {FormEvent, useState} from 'react';

import {
  Button,
  ButtonVariant,
} from '../../shared/Elements';

import { IHacker } from '../../config';

// import Team from '../../api/team';
import { Form, Label } from '../../shared/Form';
import {
  Input,
} from '../../shared/Form';
import theme from '../../shared/Styles/theme';
import ValidationErrorGenerator from '../../shared/Form/validationErrorGenerator';
import Team from '../../api/team';
import WithToasterContainer from '../../shared/HOC/withToaster';

interface IJoinCreateTeamProps {
  hacker: IHacker;
  onTeamChange: () => void;
}

const JoinCreateTeam: React.FC<IJoinCreateTeamProps> = (props) => {
  // Is the user currently trying to join or create a team?
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Keep track of team code that user entered
  const [teamCode, setTeamCode] = useState<string>('');

  // Create a new team with a random team name
  const createTeam = async () => {
    setIsLoading(true);
    try {
      await Team.create({
        name: generateRandomTeamCode(14),
        members: [props.hacker.id],
      });
      props.onTeamChange();
    } catch (e) {
      if (e.status === 409) {
        if (e && e.data) {
          ValidationErrorGenerator(e.data);
        }
      }
    }
    setIsLoading(false);
  }

  // Attempt to join the team with a name of state.teamCode
  const joinTeam = async () => {
    setIsLoading(true);
    try {
      await Team.join(teamCode);
      props.onTeamChange();
    } catch (e) {
      if (e && e.data) {
        ValidationErrorGenerator(e.data);
      }
    }
    setIsLoading(false);
  }

  return (
    <>
      <div className="create">
        <Button
          variant={ButtonVariant.Primary}
          isLoading={isLoading}
          disabled={isLoading}
          onClick={createTeam}
        >
          Create new team
        </Button>
      </div>

      <Form onSubmit={(e: any) => { e.preventDefault(); joinTeam(); }}>
        <div className="join">
          <Label style={{ maxWidth: '272px' }}>
            Already have a team?
            <Input
              type="text"
              name="name"
              value={teamCode}
              onChange={(e: any) => setTeamCode(e.target.value)}
              placeholder="Enter team code"
              style={{ marginBottom: 0 }}
            />
          </Label>

          <Button
            type="submit"
            variant={ButtonVariant.Secondary}
            isLoading={isLoading}
            disabled={isLoading}
          >
            Join team
          </Button>
        </div>
      </Form>

      <style jsx>{`
        .create {
          text-align: center;

          padding-top: 8px;
          padding-bottom: 48px;
          border-bottom: 1px solid ${theme.colors.purpleLight};
          margin-bottom: 32px;
        }

        .join {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }
      `}</style>
    </>
  );
}

// Create a new random n-long character alphanumeric team code.
// Since there are 1.24017694e25 team names possible when n=14 and
// penalty for collision is minimal, don't have to worry
// about handling that
function generateRandomTeamCode(n: number): string {
  let id = '';
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  for (let i = 0; i < n; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}

export default WithToasterContainer(JoinCreateTeam);

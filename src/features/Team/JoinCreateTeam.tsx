import React, { useState } from 'react';

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

interface IJoinCreateTeamProps {
  hacker: IHacker;
  onTeamChange: () => void;
}

const JoinCreateTeam: React.FC<IJoinCreateTeamProps> = (props) => {
  // Is the user currently trying to join or create a team?
  const isLoading = useState(false)[0];

  // Keep track of which button was clicked
  // const [submissionBtn, setSubmissionBtn] = useState(0);

  // const handleSubmit = async (values: FormikValues) => {
  //   setIsLoading(true);
  //   if (submissionBtn === 0) {
  //     try {
  //       await Team.create({
  //         name: values.name,
  //         members: [props.hacker.id],
  //       });
  //       props.onTeamChange();
  //     } catch (e) {
  //       if (e.status === 409) {
  //         if (e && e.data) {
  //           ValidationErrorGenerator(e.data);
  //         }
  //       }
  //     }
  //   } else {
  //     try {
  //       await Team.join(values.name);
  //       props.onTeamChange();
  //     } catch (e) {
  //       if (e && e.data) {
  //         ValidationErrorGenerator(e.data);
  //       }
  //     }
  //   }
  //   setIsLoading(false);
  // }

  return (
    <>
      <div className="create">
        <Button
          variant={ButtonVariant.Primary}
          isLoading={isLoading}
          disabled={isLoading}
        >
          Create new team
        </Button>
      </div>

      <Form>
        <div className="join">
          <Label style={{ maxWidth: '272px' }}>
            Already have a team?
            <Input type="text" name="name" placeholder="Enter team code" style={{ marginBottom: 0 }} />
          </Label>

          <Button
            type="button"
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

export default JoinCreateTeam;

import React, { useState } from 'react';

import { Box, Flex } from '@rebass/grid';
import {
  ErrorMessage,
  FastField,
  Formik,
  FormikProps,
  FormikValues,
} from 'formik';

import {
  Button,
  ButtonVariant,
  H1,
} from '../../shared/Elements';

import { IHacker, TEAM_OVERVIEW } from '../../config';

import Team from '../../api/team';
import { Form } from '../../shared/Form';
import {
  Error as ErrorComponent,
  Input,
} from '../../shared/Form/FormikElements';
import ValidationErrorGenerator from '../../shared/Form/validationErrorGenerator';
import getValidationSchema from './validationSchema';
import theme from '../../shared/Styles/theme';

interface IJoinCreateTeamProps {
  hacker: IHacker;
  onTeamChange: () => void;
}

const JoinCreateTeam: React.FC<IJoinCreateTeamProps> = (props) => {
  // Is the user currently trying to join or create a team?
  const [isLoading, setIsLoading] = useState(false);

  // Keep track of which button was clicked
  const [submissionBtn, setSubmissionBtn] = useState(0);

  const renderFormik = (fp: FormikProps<any>) => {
    return (
      <Form>
        <FastField
          name={'name'}
          component={Input}
          label={'Enter your team name:'}
          placeholder={'Team name'}
          value={fp.values.name}
          required={true}
        />
        <ErrorMessage component={ErrorComponent} name="name" />
        <Flex justifyContent={'flex-end'}>
          <Box mr={'12px'}>
            <Button
              type="button"
              variant={ButtonVariant.Secondary}
              onClick={onClickFactory(0, fp.submitForm)}
              isLoading={isLoading}
              disabled={isLoading}
            >
              Create new team
            </Button>
          </Box>
          <Box>
            <Button
              type="button"
              variant={ButtonVariant.Secondary}
              onClick={onClickFactory(1, fp.submitForm)}
              isLoading={isLoading}
              disabled={isLoading}
            >
              Join team
            </Button>
          </Box>
        </Flex>
      </Form>
    );
  }

  const onClickFactory = (
    btn: number,
    submitForm: () => void
  ): (e: any) => void => {
    return (e) => {
      setSubmissionBtn(btn)
      submitForm();
    };
  }

  const handleSubmit = async (values: FormikValues) => {
    setIsLoading(true);
    if (submissionBtn === 0) {
      try {
        await Team.create({
          name: values.name,
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
    } else {
      try {
        await Team.join(values.name);
        props.onTeamChange();
      } catch (e) {
        if (e && e.data) {
          ValidationErrorGenerator(e.data);
        }
      }
    }
    setIsLoading(false);
  }

  return (
    <div className="centered">
      <div className="team-box">
        <div className="title">
          <H1 marginBottom="8px">Your Team</H1>
          <div className="info-text">{TEAM_OVERVIEW}</div>
        </div>
        <Formik
          initialValues={{
            name: '',
          }}
          onSubmit={handleSubmit}
          render={renderFormik}
          validationSchema={getValidationSchema}
        />
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
      `}</style>
    </div>
  );
}

export default JoinCreateTeam;

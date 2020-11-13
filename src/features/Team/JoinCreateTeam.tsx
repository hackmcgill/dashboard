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
} from '../../shared/Elements';

import { IHacker } from '../../config';

import Team from '../../api/team';
import { Form } from '../../shared/Form';
import {
  Error as ErrorComponent,
  Input,
} from '../../shared/Form/FormikElements';
import ValidationErrorGenerator from '../../shared/Form/validationErrorGenerator';
import getValidationSchema from './validationSchema';

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
    <Formik
      initialValues={{
        name: '',
      }}
      onSubmit={handleSubmit}
      render={renderFormik}
      validationSchema={getValidationSchema}
    />
  );
}

export default JoinCreateTeam;

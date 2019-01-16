import { Box, Flex } from '@rebass/grid';
import {
  ErrorMessage,
  FastField,
  Formik,
  FormikProps,
  FormikValues,
} from 'formik';
import * as React from 'react';
import Helmet from 'react-helmet';

import { Button, FormDescription, H1, MaxWidthBox } from '../shared/Elements';

import { IHacker } from '../config';

import Team from '../api/team';
import { Form } from '../shared/Form';
import { Error as ErrorComponent, Input } from '../shared/Form/FormikElements';
import ValidationErrorGenerator from '../shared/Form/validationErrorGenerator';
import getValidationSchema from './validationSchema';

interface IJoinCreateTeamProps {
  hacker: IHacker;
  onTeamChange: () => void;
}

interface IJoinCreateTeamState {
  submissionBtn: number;
  isLoading: boolean;
}

class JoinCreateTeam extends React.Component<
  IJoinCreateTeamProps,
  IJoinCreateTeamState
> {
  constructor(props: IJoinCreateTeamProps) {
    super(props);
    this.state = {
      submissionBtn: 0,
      isLoading: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderFormik = this.renderFormik.bind(this);
  }
  public render() {
    return (
      <MaxWidthBox maxWidth={'500px'} m={'auto'}>
        <Helmet>
          <title>Team | McHacks 6</title>
        </Helmet>
        <H1 fontSize={'30px'} marginTop={'0px'} marginLeft={'0px'}>
          Team
        </H1>
        <FormDescription>
          Join an existing team, or create a team.
        </FormDescription>
        <Formik
          initialValues={{
            name: '',
          }}
          onSubmit={this.handleSubmit}
          render={this.renderFormik}
          validationSchema={getValidationSchema}
        />
      </MaxWidthBox>
    );
  }
  private renderFormik(fp: FormikProps<any>) {
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
        <Flex justifyContent={'center'}>
          <Box>
            <Button
              type="button"
              onClick={this.onClickFactory(0, fp.submitForm)}
              isLoading={this.state.isLoading}
              disabled={this.state.isLoading}
            >
              Create team
            </Button>
          </Box>
          <Box>
            <Button
              type="button"
              onClick={this.onClickFactory(1, fp.submitForm)}
              isLoading={this.state.isLoading}
              disabled={this.state.isLoading}
            >
              Join team
            </Button>
          </Box>
        </Flex>
      </Form>
    );
  }
  private onClickFactory(
    submissionBtn: number,
    submitForm: () => void
  ): (e: any) => void {
    return (e) => {
      this.setState({ submissionBtn });
      submitForm();
    };
  }

  private async handleSubmit(values: FormikValues) {
    this.setState({ isLoading: true });
    if (this.state.submissionBtn === 0) {
      try {
        await Team.create({
          name: values.name,
          members: [this.props.hacker.id],
        });
        this.props.onTeamChange();
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
        this.props.onTeamChange();
      } catch (e) {
        if (e && e.data) {
          ValidationErrorGenerator(e.data);
        }
      }
    }
    this.setState({ isLoading: false });
  }
}

export { JoinCreateTeam };

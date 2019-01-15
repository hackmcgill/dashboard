import { Box, Flex } from '@rebass/grid';
import {
  ErrorMessage,
  FastField,
  Formik,
  FormikProps,
  FormikValues,
} from 'formik';
import * as React from 'react';

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
}

class JoinCreateTeam extends React.Component<
  IJoinCreateTeamProps,
  IJoinCreateTeamState
> {
  constructor(props: IJoinCreateTeamProps) {
    super(props);
    this.state = {
      submissionBtn: 0,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderFormik = this.renderFormik.bind(this);
  }
  public render() {
    return (
      <MaxWidthBox maxWidth={'500px'} m={'auto'}>
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
            >
              Create team
            </Button>
          </Box>
          <Box>
            <Button
              type="button"
              onClick={this.onClickFactory(1, fp.submitForm)}
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
    if (this.state.submissionBtn === 0) {
      try {
        await Team.create({
          name: values.name,
          members: [this.props.hacker.id],
        });
        this.props.onTeamChange();
      } catch (e) {
        if (e.status === 409) {
          console.log(e);
          if (e && e.data) {
            ValidationErrorGenerator(e.data);
          }
        } else {
          console.log(e);
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
  }
}

export { JoinCreateTeam };

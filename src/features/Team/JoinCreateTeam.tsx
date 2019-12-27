import * as React from 'react';
import Helmet from 'react-helmet';

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
  FormDescription,
  H1,
  MaxWidthBox,
} from '../../shared/Elements';

import { HACKATHON_NAME, IHacker } from '../../config';

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
      <MaxWidthBox maxWidth={'500px'} m={'auto'} mt={'50px'}>
        <Flex alignItems={'center'} flexDirection={'column'}>
          <Helmet>
            <title>Create/Join Team | {HACKATHON_NAME}</title>
          </Helmet>
          <H1 fontSize={'30px'} marginTop={'0px'} marginLeft={'0px'}>
            Create/Join a Team
          </H1>
          <FormDescription>
            Join an existing team, or create a team.
          </FormDescription>
          <Button variant={ButtonVariant.CallToAction}>Create a Team</Button>
          <hr
            style={{
              border: '1px solid #D2D2D2',
              width: '500px',
              marginTop: '25px',
            }}
          />
          <Formik
            initialValues={{
              name: '',
            }}
            onSubmit={this.handleSubmit}
            render={this.renderFormik}
            validationSchema={getValidationSchema}
          />
        </Flex>
      </MaxWidthBox>
    );
  }
  private renderFormik(fp: FormikProps<any>) {
    return (
      <Form>
        <FastField
          name={'name'}
          component={Input}
          label={'Already have a team?'}
          placeholder={'Enter your team code'}
          value={fp.values.name}
          required={false}
        />
        <ErrorMessage component={ErrorComponent} name="name" />
        <Flex justifyContent={'center'}>
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

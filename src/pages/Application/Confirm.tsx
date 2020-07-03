import { Box, Flex } from '@rebass/grid';
import { ErrorMessage, FastField, Formik, FormikProps } from 'formik';
import * as React from 'react';
import Helmet from 'react-helmet';
import { Redirect } from 'react-router';
import { boolean, object } from 'yup';

import { Hacker } from '../../api';
import { FrontendRoute } from '../../config';
import { H1, H2, MaxWidthBox, Paragraph } from '../../shared/Elements';
import Button, { ButtonVariant } from '../../shared/Elements/Button';
import { Form } from '../../shared/Form';
import * as FormikElements from '../../shared/Form/FormikElements';
import ValidationErrorGenerator from '../../shared/Form/validationErrorGenerator';
import WithToasterContainer from '../../shared/HOC/withToaster';
import theme from '../../shared/Styles/theme';
import * as DashboardText from '../../features/Dashboard/DashboardText';

interface IConfirmAttendanceState {
  submitted: boolean;
  submissionBtn: number;
}

class ConfirmAttendanceContainer extends React.Component<
  {},
  IConfirmAttendanceState
  > {
  constructor(props: {}) {
    super(props);
    this.state = {
      submissionBtn: 0,
      submitted: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.renderFormik = this.renderFormik.bind(this);
    this.onClickFactory = this.onClickFactory.bind(this);
  }
  public render() {
    if (this.state.submitted) {
      return <Redirect to={FrontendRoute.HOME_PAGE} />;
    }
    return (
      <Flex
        justifyContent={'center'}
        alignItems={'center'}
        flexDirection={'column'}
      >
        <Helmet>
          <title> {DashboardText.ConfirmPresence} </title>
        </Helmet>
        <MaxWidthBox width={1}>
          <H1 textAlign={'center'}>{DashboardText.ConfirmHeader}</H1>
          <Paragraph fontSize={'16px'}>
            {DashboardText.ConfirmParagraph}
          </Paragraph>
          <Paragraph fontSize={'16px'}>
            {DashboardText.ConfirmDeadLine}
          </Paragraph>
        </MaxWidthBox>
        <MaxWidthBox width={1}>
          <H2 color={theme.colors.black80}>{DashboardText.Liability}</H2>
          <Paragraph fontSize={'14px'}>{DashboardText.LegalReview}</Paragraph>
          <Formik
            enableReinitialize={true}
            initialValues={{
              liability: false,
            }}
            onSubmit={this.onSubmit}
            validationSchema={object().shape({
              liability: boolean()
                .test('true', 'You must agree.', (value) => value)
                .required('Required'),
            })}
            render={this.renderFormik}
          />
        </MaxWidthBox>
      </Flex>
    );
  }
  private renderFormik(fp: FormikProps<any>) {
    return (
      <Form onSubmit={fp.handleSubmit}>
        <FastField
          name={'liability'}
          component={FormikElements.Checkbox}
          label={
            <span>
              I accept the terms of the{' '}
              <a
                href="https://mchacks.ca/waiver"
                rel="noopener noreferrer"
                target="_blank"
              >
                McHacks Liability and Photo Release Agreement
              </a>
            </span>
          }
          required={true}
        />
        <ErrorMessage component={FormikElements.Error} name="liability" />
        <Flex justifyContent={'center'} mb={'20px'}>
          <Box>
            <Button
              onClick={this.onClickFactory(0, fp.submitForm)}
              variant={ButtonVariant.Secondary}
              isLoading={fp.isSubmitting}
              disabled={fp.isSubmitting}
            >
              Decline
            </Button>
          </Box>
          <Box>
            <Button
              onClick={this.onClickFactory(1, fp.submitForm)}
              isLoading={fp.isSubmitting}
              disabled={fp.isSubmitting}
            >
              Confirm
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

  private async onSubmit() {
    try {
      const hackerId = (await Hacker.getSelf()).data.data.id;
      switch (this.state.submissionBtn) {
        case 0:
          await Hacker.confirm(hackerId, false);
          break;
        case 1:
          await Hacker.confirm(hackerId, true);
          break;
      }
      this.setState({ submitted: true });
    } catch (e) {
      ValidationErrorGenerator(e.data);
    }
  }
}

export default WithToasterContainer(ConfirmAttendanceContainer);

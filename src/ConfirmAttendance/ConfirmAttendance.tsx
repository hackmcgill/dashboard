import { Box, Flex } from '@rebass/grid';
import { ErrorMessage, FastField, Formik, FormikProps } from 'formik';
import * as React from 'react';
import { boolean, object } from 'yup';

import { Redirect } from 'react-router';
import { Hacker } from '../api';
import { FrontendRoute, HackerStatus } from '../config';
import { Button, H1, H2, MaxWidthBox, Paragraph } from '../shared/Elements';
import { Form } from '../shared/Form';
import * as FormikElements from '../shared/Form/FormikElements';
import ValidationErrorGenerator from '../shared/Form/validationErrorGenerator';
import WithToasterContainer from '../shared/HOC/withToaster';
import theme from '../shared/Styles/theme';

interface IConfirmAttendanceProps {
  status: HackerStatus;
}

interface IConfirmAttendanceState {
  confirmed: boolean;
}

class ManageAccountContainer extends React.Component<
  IConfirmAttendanceProps,
  IConfirmAttendanceState
> {
  constructor(props: IConfirmAttendanceProps) {
    super(props);
    this.state = {
      confirmed: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
  }
  public render() {
    if (this.state.confirmed) {
      return <Redirect to={FrontendRoute.HOME_PAGE} />;
    }
    return (
      <Flex
        justifyContent={'center'}
        alignItems={'center'}
        flexDirection={'column'}
      >
        <MaxWidthBox width={1}>
          <H1 textAlign={'center'}>Confirm your Attendance</H1>
          <Paragraph fontSize={'16px'}>
            We are excited to offer you a spot at McHacks 6 taking place on
            February 2-3rd 2019 at the Theatre St. James in the Old Port of
            Montreal.
          </Paragraph>
          <Paragraph fontSize={'16px'}>
            Please confirm your attendance before January 15th.
          </Paragraph>
        </MaxWidthBox>
        <MaxWidthBox width={1}>
          <H2 color={theme.colors.greyDark}>Libaility and Photo Release</H2>
          <Paragraph fontSize={'14px'}>
            *Students under the age of 18 must have their parent or legal
            guardian review the following document.
          </Paragraph>
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
              <a href="https://mchacks.ca/liability" target="_blank">
                McHacks Liability and Photo Release Agreement
              </a>
            </span>
          }
          required={true}
        />
        <ErrorMessage component={FormikElements.Error} name="liability" />
        <Flex justifyContent={'center'}>
          <Box>
            <Button type="submit">Submit</Button>
          </Box>
        </Flex>
      </Form>
    );
  }

  private async onSubmit() {
    try {
      const hackerId = (await Hacker.getSelf()).data.data.id;
      console.log('Got hacker id', hackerId);
      await Hacker.confirm(hackerId, true);
      console.log('confirmed!');
      this.setState({ confirmed: true });
    } catch (e) {
      ValidationErrorGenerator(e.data);
    }
  }
}

export default WithToasterContainer(ManageAccountContainer);

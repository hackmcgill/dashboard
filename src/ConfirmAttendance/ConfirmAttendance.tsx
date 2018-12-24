import { Flex } from '@rebass/grid';
import { ErrorMessage, FastField, Formik } from 'formik';
import * as React from 'react';
import { object } from 'yup';
import { HackerStatus } from '../config';
import { Button, H1, MaxWidthBox, Paragraph } from '../shared/Elements';
import { Form } from '../shared/Form';
import * as FormikElements from '../shared/Form/FormikElements';
import WithToasterContainer from '../shared/HOC/withToaster';

interface IConfirmAttendanceProps {
  status: HackerStatus;
}

interface IConfirmAttendanceState {
  submitting: boolean;
}

class ManageAccountContainer extends React.Component<
  IConfirmAttendanceProps,
  IConfirmAttendanceState
> {
  constructor(props: IConfirmAttendanceProps) {
    super(props);
    this.state = {
      submitting: false,
    };
  }
  public render() {
    return (
      <Flex
        justifyContent={'center'}
        alignItems={'center'}
        flexDirection={'column'}
      >
        <MaxWidthBox mb={'0px'}>
          <H1 fontSize={'40px'}>Confirm your Attendance</H1>
        </MaxWidthBox>
        <Formik
          enableReinitialize={true}
          initialValues={{
            liability: false,
          }}
          // tslint:disable
          onSubmit={() => {}}
          validationSchema={object().shape({})}
        >
          {({ isSubmitting }) => (
            <Form>
              <FastField
                name={'liability'}
                component={FormikElements.Checkbox}
                label={
                  'I accept the terms of the McHacks Liability and Photo Release Agreement'
                }
                subtitle={CONSTANTS.BUS_REQUEST_SUBTITLE}
                required={false}
              />
              <ErrorMessage name="email" component="div" />
              <Button type="submit" disabled={isSubmitting}>
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Flex>
    );
  }
}

export default WithToasterContainer(ManageAccountContainer);

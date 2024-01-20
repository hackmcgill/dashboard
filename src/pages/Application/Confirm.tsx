import { Box, Flex } from '@rebass/grid';
import { ErrorMessage, FastField, Formik, FormikProps } from 'formik';
import React, { useState } from 'react';
import Helmet from 'react-helmet';
import { Navigate } from 'react-router';
import { boolean, object } from 'yup';

import { Hacker } from '../../api';
import { FrontendRoute } from '../../config';
import * as DashboardText from '../../features/Dashboard/DashboardText';
import { H1, H2, MaxWidthBox, Paragraph } from '../../shared/Elements';
import Button, { ButtonVariant } from '../../shared/Elements/Button';
import { Form } from '../../shared/Form';
import * as FormikElements from '../../shared/Form/FormikElements';
import ValidationErrorGenerator from '../../shared/Form/validationErrorGenerator';
import WithToasterContainer from '../../shared/HOC/withToaster';
import theme from '../../shared/Styles/theme';

const ConfirmAttendancePage: React.FC = () => {
  // TODO: Think this has to do with whether the hacker is attending or not
  // with 1 being attending and 0 being declining
  const [submissionButton, setSubmissionButton] = useState<number>(0);

  // Has this form been submitted yet?
  const [submitted, setSubmitted] = useState<boolean>(false);

  // Display form asking user (who is a hacker) if they wish to attend the event or not
  const renderFormik = (fp: FormikProps<any>) => {
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
              onClick={onClickFactory(0, fp.submitForm)}
              variant={ButtonVariant.Secondary}
              isLoading={fp.isSubmitting}
              disabled={fp.isSubmitting}
            >
              Decline
            </Button>
          </Box>
          <Box>
            <Button
              onClick={onClickFactory(1, fp.submitForm)}
              isLoading={fp.isSubmitting}
              disabled={fp.isSubmitting}
            >
              Confirm
            </Button>
          </Box>
        </Flex>
      </Form>
    );
  };

  /**
   * TODO: ???
   * @param submissionBtn
   * @param submitForm
   */
  function onClickFactory(
    submissionBtn: number,
    submitForm: () => void
  ): (e: any) => void {
    return (e) => {
      setSubmissionButton(submissionBtn);
      submitForm();
    };
  }

  /**
   * Submit the ahckers application
   */
  const onSubmit = async () => {
    try {
      const hackerId = (await Hacker.getSelf()).data.data.id;
      switch (submissionButton) {
        case 0:
          await Hacker.confirm(hackerId, false);
          break;
        case 1:
          await Hacker.confirm(hackerId, true);
          break;
      }
      setSubmitted(true);
    } catch (e: any) {
      ValidationErrorGenerator(e.data);
    }
  };

  // If form has been submitted, redirect to home page
  if (submitted) {
    return <Navigate to={FrontendRoute.HOME_PAGE} />;
  }

  // Display page asking user to confirm their attendance of the hackathon
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
        <Paragraph fontSize={'16px'}>{DashboardText.ConfirmDeadLine}</Paragraph>
      </MaxWidthBox>
      <MaxWidthBox width={1}>
        <H2 color={theme.colors.black80}>{DashboardText.Liability}</H2>
        <Paragraph fontSize={'14px'}>{DashboardText.LegalReview}</Paragraph>
        <Formik
          enableReinitialize={true}
          initialValues={{
            liability: false,
          }}
          onSubmit={onSubmit}
          validationSchema={object().shape({
            liability: boolean()
              .test('true', 'You must agree.', (value) => value)
              .required('Required'),
          })}
        >
          {renderFormik}
        </Formik>
      </MaxWidthBox>
    </Flex>
  );
};

export default WithToasterContainer(ConfirmAttendancePage);

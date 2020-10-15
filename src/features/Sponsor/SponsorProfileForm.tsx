import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Redirect, RouteProps } from 'react-router';

import {
  ErrorMessage,
  FastField,
  Formik,
  FormikProps,
  FormikValues,
} from 'formik';

import { Account, Sponsor } from '../../api';
import {
  FrontendRoute,
  HACKATHON_NAME,
  ISponsor,
  UserType,
} from '../../config';
import * as CONSTANTS from '../../config/constants';
import { FormDescription, H1, MaxWidthBox } from '../../shared/Elements';
import { Form, SubmitBtn } from '../../shared/Form';
import * as FormikElements from '../../shared/Form/FormikElements';
import ValidationErrorGenerator from '../../shared/Form/validationErrorGenerator';
import WithToasterContainer from '../../shared/HOC/withToaster';

import getValidationSchema from './validationSchema';

export enum ManageSponsorModes {
  CREATE,
  EDIT,
}

interface ISponsorProfileFormValues extends FormikValues {
  company: string;
  url: string;
}

interface IManageSponsorContainerProps extends RouteProps {
  mode: ManageSponsorModes;
}

const ManageSponsorContainer: React.FC<IManageSponsorContainerProps> = (
  props
) => {
  // just a boolean check to redirect the page once submitted
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  // either creating or editing the sponsor profile
  const [mode, setMode] = useState<ManageSponsorModes>(props.mode);
  const [sponsorDetails, setSponsorDetails] = useState<ISponsor>({
    id: '',
    tier: 0,
    accountId: '',
    company: '',
    contractURL: 'https://default_url.com',
    nominees: [],
  });

  // to check if there is an error in the sponsor's info
  useEffect(() => {
    (async () => {
      if (mode === ManageSponsorModes.EDIT) {
        try {
          const response = await Sponsor.getSelf();
          const spDetails = response.data.data;
          setSponsorDetails(spDetails);
        } catch (e) {
          if (e && e.data) {
            ValidationErrorGenerator(e.data);
          }
          // For some reason we could not get self. We should switch our state to CREATE.
          setMode(ManageSponsorModes.CREATE);
        }
      }
    })();
  }, []);

  const renderFormik = (fp: FormikProps<any>) => {
    return (
      <Form onSubmit={fp.handleSubmit}>
        <FastField
          id="companyName"
          name={'company'}
          component={FormikElements.Input}
          label={CONSTANTS.SPONSOR_COMPANY_LABEL}
          required={true}
        />
        <ErrorMessage component={FormikElements.Error} name="company" />

        <SubmitBtn isLoading={fp.isSubmitting} disabled={fp.isSubmitting}>
          Submit
        </SubmitBtn>
      </Form>
    );
  };

  // triggered on submit button
  const handleSubmit = async (values: ISponsorProfileFormValues) => {
    try {
      await submit(values);
      setFormSubmitted(true);
    } catch (e) {
      if (e && e.data) {
        ValidationErrorGenerator(e.data);
      }
    }
  };

  // function to send profile submition
  const submit = async (values: ISponsorProfileFormValues): Promise<void> => {
    const acctResponse = await Account.getSelf();

    const account = acctResponse.data.data;
    let sponsorTier = 0;

    // sponsor tiers
    switch (account.accountType) {
      case UserType.SPONSOR_T1:
        sponsorTier = 1;
        break;
      case UserType.SPONSOR_T2:
        sponsorTier = 2;
        break;
      case UserType.SPONSOR_T3:
        sponsorTier = 3;
        break;
      case UserType.SPONSOR_T4:
        sponsorTier = 4;
        break;
      case UserType.SPONSOR_T5:
        sponsorTier = 5;
        break;
      default:
        sponsorTier = -1;
    }

    // this will content the sponsor's details in an object
    const sponsorApplication = convertFormikToSponsor(
      values,
      sponsorDetails.id,
      account.id,
      sponsorTier,
      sponsorDetails.contractURL
    );

    switch (mode) {
      case ManageSponsorModes.CREATE:
        await Sponsor.create(sponsorApplication);
        break;
      case ManageSponsorModes.EDIT:
        await Sponsor.update(sponsorApplication);
        break;
    }
  };

  // convert the values in formik form to object to pass to submit fct
  const convertFormikToSponsor = (
    values: FormikValues,
    sponsorId: string,
    accountId: string,
    sponsorTier: number,
    contractURL: string
  ): ISponsor => {
    return {
      id: sponsorId,
      accountId,
      tier: sponsorTier,
      company: values.company,
      contractURL,
      nominees: values.nominees,
    };
  };

  // redirect after submition
  if (formSubmitted) {
    return <Redirect to={FrontendRoute.HOME_PAGE} />;
  }

  return (
    <MaxWidthBox m={'auto'} maxWidth={'500px'}>
      <Helmet>
        <title>
          {mode === ManageSponsorModes.CREATE ? 'Create' : 'Edit'} Sponsor
          Profile | {HACKATHON_NAME}
        </title>
      </Helmet>
      <MaxWidthBox maxWidth={'500px'} m={'auto'}>
        <H1
          color={'#F2463A'}
          fontSize={'30px'}
          textAlign={'left'}
          marginTop={'0px'}
          marginBottom={'20px'}
          marginLeft={'0px'}
        >
          {mode === ManageSponsorModes.CREATE ? 'Create' : 'Edit'} your Sponsor
          profile
        </H1>
        <FormDescription>{CONSTANTS.REQUIRED_DESCRIPTION}</FormDescription>
      </MaxWidthBox>
      <Formik
        enableReinitialize={true}
        initialValues={{
          company: sponsorDetails.company,
        }}
        onSubmit={handleSubmit}
        render={renderFormik}
        validationSchema={getValidationSchema()}
      />
    </MaxWidthBox>
  );
};

export default WithToasterContainer(ManageSponsorContainer);

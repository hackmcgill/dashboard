import {
  ErrorMessage,
  FastField,
  Formik,
  FormikProps,
  FormikValues,
} from 'formik';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { Redirect, RouteProps } from 'react-router';

import { Account, Sponsor } from '../api';
import { FrontendRoute, ISponsor, UserType } from '../config';
import * as CONSTANTS from '../config/constants';
import { FormDescription, H1, MaxWidthBox } from '../shared/Elements';
import { Form, SubmitBtn } from '../shared/Form';
import * as FormikElements from '../shared/Form/FormikElements';
import getValidationSchema from './validationSchema';

import ValidationErrorGenerator from '../shared/Form/validationErrorGenerator';
import WithToasterContainer from '../shared/HOC/withToaster';

export enum ManageSponsorModes {
  CREATE,
  EDIT,
}

interface ISponsorProfileFormValues extends FormikValues {
  company: string;
  url: string;
}
interface IManageSponsorContainerState {
  mode: ManageSponsorModes;
  formSubmitted: boolean;
  sponsorDetails: ISponsor;
}

interface IManageSponsorContainerProps extends RouteProps {
  mode: ManageSponsorModes;
}

class ManageSponsorContainer extends React.Component<
  IManageSponsorContainerProps,
  IManageSponsorContainerState
> {
  constructor(props: IManageSponsorContainerProps) {
    super(props);
    this.state = {
      formSubmitted: false,
      mode: props.mode,
      sponsorDetails: {
        id: '',
        tier: 0,
        accountId: '',
        company: '',
        contractURL: 'https://default_url.com',
        nominees: [],
      },
    };
    this.renderFormik = this.renderFormik.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.submit = this.submit.bind(this);
  }

  public render() {
    const { mode, sponsorDetails, formSubmitted } = this.state;

    if (formSubmitted) {
      return <Redirect to={FrontendRoute.HOME_PAGE} />;
    }

    return (
      <MaxWidthBox m={'auto'} maxWidth={'500px'}>
        <Helmet>
          <title>
            {mode === ManageSponsorModes.CREATE ? 'Create' : 'Edit'}
            Sponsor Profile | {CONSTANTS.HACKATHON_NAME}
          </title>
        </Helmet>
        <MaxWidthBox maxWidth={'500px'} m={'auto'}>
          <H1
            fontSize={'30px'}
            textAlign={'left'}
            marginTop={'0px'}
            marginBottom={'20px'}
            marginLeft={'0px'}
          >
            {mode === ManageSponsorModes.CREATE ? 'Create' : 'Edit'} your
            Sponsor profile
          </H1>
          <FormDescription>{CONSTANTS.REQUIRED_DESCRIPTION}</FormDescription>
        </MaxWidthBox>
        <Formik
          enableReinitialize={true}
          initialValues={{
            company: sponsorDetails.company,
          }}
          onSubmit={this.handleSubmit}
          render={this.renderFormik}
          validationSchema={getValidationSchema()}
        />
      </MaxWidthBox>
    );
  }

  public async componentDidMount() {
    const { mode } = this.state;
    if (mode === ManageSponsorModes.EDIT) {
      try {
        const response = await Sponsor.getSelf();
        const sponsorDetails = response.data.data;
        this.setState({ sponsorDetails });
      } catch (e) {
        if (e && e.data) {
          ValidationErrorGenerator(e.data);
        }
        // For some reason we could not get self. We should switch our state to CREATE.
        this.setState({ mode: ManageSponsorModes.CREATE });
      }
    }
  }

  private renderFormik(fp: FormikProps<any>) {
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
  }

  private async handleSubmit(values: ISponsorProfileFormValues) {
    try {
      await this.submit(values);
      this.setState({ formSubmitted: true });
    } catch (e) {
      if (e && e.data) {
        ValidationErrorGenerator(e.data);
      }
    }
  }

  private async submit(values: ISponsorProfileFormValues): Promise<void> {
    const acctResponse = await Account.getSelf();

    const account = acctResponse.data.data;
    let sponsorTier = 0;

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

    const sponsorApplication = this.convertFormikToSponsor(
      values,
      this.state.sponsorDetails.id,
      account.id,
      sponsorTier,
      this.state.sponsorDetails.contractURL
    );

    switch (this.state.mode) {
      case ManageSponsorModes.CREATE:
        await Sponsor.create(sponsorApplication);
        break;
      case ManageSponsorModes.EDIT:
        await Sponsor.update(sponsorApplication);
        break;
    }
  }

  private convertFormikToSponsor(
    values: FormikValues,
    sponsorId: string,
    accountId: string,
    sponsorTier: number,
    contractURL: string
  ): ISponsor {
    return {
      id: sponsorId,
      accountId,
      tier: sponsorTier,
      company: values.company,
      contractURL,
      nominees: values.nominees,
    };
  }
}

export default WithToasterContainer(ManageSponsorContainer);

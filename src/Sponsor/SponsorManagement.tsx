import { ISponsor, FrontendRoute, UserType } from "../config";
import { RouteProps, Redirect } from "react-router";
import React from "react";
import { H1, MaxWidthBox, FormDescription } from "../shared/Elements";
import WithToasterContainer from "../shared/HOC/withToaster";
import { FormikProps, Formik, FormikValues, FastField, ErrorMessage } from "formik";
import { Sponsor, Account, APIResponse } from "../api";
import { Helmet } from "react-helmet";
import * as CONSTANTS from '../config/constants';
import getValidationSchema from "./validationSchema";
import { toast } from "react-toastify";
import ValidationErrorGenerator from "../shared/Form/validationErrorGenerator";
import { AxiosResponse } from "axios";
import { Form, SubmitBtn } from "../shared/Form";
import * as FormikElements from '../shared/Form/FormikElements';

export enum ManageSponsorModes {
    CREATE,
    EDIT,
    READ,
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
                tier: 0,
                accountId: '',
                company: '',
                contractURL: '',
                nominees: []
            }
        }
        this.renderFormik = this.renderFormik.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
    }

    public render() {
        const { mode, sponsorDetails, formSubmitted } = this.state;

        if (formSubmitted) {
            return <Redirect to={FrontendRoute.HOME_PAGE} />
        }

        return (
            <MaxWidthBox m={'auto'} maxWidth={'500px'}>
                <Helmet>
                    <title>
                        {mode === ManageSponsorModes.CREATE ? 'Create' : 'Edit'}
                        Application | McHacks 6
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
                        {mode === ManageSponsorModes.CREATE ? 'Create' : 'Edit'} your
                        Sponsor profile
                    </H1>
                    <FormDescription>{CONSTANTS.REQUIRED_DESCRIPTION}</FormDescription>
                </MaxWidthBox>
                <Formik
                    enableReinitialize={true}
                    initialValues={{
                        company: sponsorDetails.company,
                        contractURL: sponsorDetails.contractURL,
                        nominees: sponsorDetails.nominees
                    }}
                    onSubmit={this.handleSubmit}
                    render={this.renderFormik}
                    validationSchema={getValidationSchema()}
                />
            </MaxWidthBox>
        )
    }

    private renderFormik(fp: FormikProps<any>) {
        return (
            <Form onSubmit={fp.handleSubmit}>
                <FastField
                    id="companyName"
                    name={'company'}
                    component={FormikElements.Input}
                    label={CONSTANTS.SPONSOR_COMPANY_LABEL}
                    retuired={true}
                />
                <ErrorMessage
                    component={FormikElements.Error}
                    name="company"
                />

                <FastField
                    name={'contractURL'}
                    inputType="url"
                    component={FormikElements.Input}
                    label={CONSTANTS.SPONSOR_CONTRACT_URL_LABEL}
                />
                <ErrorMessage
                    component={FormikElements.Error}
                    name="contractURL"
                />

                <FastField
                    name={'nominees'}
                    isMulti={true}
                    creatable={true}
                    label={CONSTANTS.SPONSOR_NOMINEE_LABEL}
                    component={FormikElements.Input}
                />

                <ErrorMessage
                    component={FormikElements.Error}
                    name="nominees"
                />

                <SubmitBtn isLoading={fp.isSubmitting} disabled={fp.isSubmitting}>
                    Submit
                </SubmitBtn>
            </Form>
        )
    }

    private handleSubmit(values: any) {
        const { mode } = this.state;
        let handler;
        switch (mode) {
            case ManageSponsorModes.CREATE:
                handler = this.handleCreate;
                break;
            default:
                return;
        }

        handler(values)
            .then((success: boolean) => {
                if (success) {
                    console.log('Submitted sponsor application');
                    toast.success(
                        `Sponsor created!`
                    );
                    this.setState({ formSubmitted: true });
                } else {
                    toast.error(`There was an error when submitting the sponsor application`);
                }
            })
            .catch((response: AxiosResponse<APIResponse<any>> | undefined) => {
                console.log(response);
                if (response) {
                    ValidationErrorGenerator(response.data);
                }
            });
    }

    private async handleCreate(values: any): Promise<boolean> {
        const acctResponse = await Account.getSelf();

        if (acctResponse.status !== 200) {
            console.error('Error while getting current user');
            return false;
        }

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

        const sponsorApplication = this.convertFormikToSponsor(values, account.id, sponsorTier);
        const sponsorResponse = await Sponsor.create(sponsorApplication);

        if (sponsorResponse.status !== 200) {
            console.error('Error while creating sponsor application.');
            return false;
        }

        return true;
    }

    private convertFormikToSponsor(
        values: FormikValues,
        accountId: string,
        sponsorTier: number,
    ): ISponsor {
        return {
            accountId: accountId,
            tier: sponsorTier,
            company: values.company,
            contractURL: values.contractURL,
            nominees: values.nominees
        };
    }
}

export default WithToasterContainer(ManageSponsorContainer);

import * as React from 'react';
import Account from 'src/api/account';
import EmailInput from 'src/components/emailInputComponent';
import DietaryRestrictionComponent from 'src/components/dietaryRestrictionsComponent';
import ShirtSize from 'src/config/shirtSizes';
import ShirtSizeComponent from 'src/components/shirtSizeComponent';
import FullNameInput from 'src/components/fullNameInputComponent';
import PasswordInput from 'src/components/passwordInputComponent';
import Button from 'src/shared/Button';
import { Flex, Box } from '@rebass/grid'
import { NumberFormatValues } from 'react-number-format';
import NumberFormat from 'src/components/numberFormatComponent';
import PronounInput from 'src/components/pronounComponent';
import H1 from 'src/shared/H1';
import Form from 'src/shared/Form';
import ConfirmationEmailSentComponent from 'src/containers/confirmEmail';
import Auth from 'src/api/auth';
import MaxWidthBox from 'src/shared/MaxWidthBox';
import { FormDescription } from 'src/shared/Paragraph';
import ValidationErrorGenerator from 'src/components/ValidationErrorGenerator';
import WithToasterContainer from 'src/hoc/withToaster';
import { UserType, IAccount } from 'src/config/userTypes';
import * as CONSTANTS from 'src/config/constants';
import { Redirect } from 'react-router';
import FrontendRoute from 'src/config/FrontendRoute';
import { RouteProps } from 'react-router';
import { padStart, getNestedProp } from 'src/util/util';

export enum ManageAccountModes {
    CREATE,
    EDIT
}

interface IManageAccountContainerState {
    mode: ManageAccountModes;
    formSubmitted: boolean;
    accountDetails: IAccount;
    oldPassword: string;
}

interface IManageAccountContainerProps extends RouteProps {
    mode: ManageAccountModes
}

class ManageAccountContainer extends React.Component<IManageAccountContainerProps, IManageAccountContainerState>{
    constructor(props: IManageAccountContainerProps) {
        super(props);
        this.state = {
            formSubmitted: false,
            mode: props.mode,
            accountDetails: {
                accountType: UserType.UNKNOWN,
                birthDate: '',
                confirmed: false,
                dietaryRestrictions: [],
                email: getNestedProp(props, ['location', 'state', 'email']) || '',
                firstName: '',
                id: '',
                lastName: '',
                password: getNestedProp(props, ['location', 'state', 'password']) || '',
                phoneNumber: '',
                pronoun: '',
                shirtSize: '',
            },
            oldPassword: '',
        };
        this.onDietaryRestrictionsChanged = this.onDietaryRestrictionsChanged.bind(this);
        this.onShirtSizeChanged = this.onShirtSizeChanged.bind(this);
        this.onEmailChanged = this.onEmailChanged.bind(this);
        this.onFirstNameChanged = this.onFirstNameChanged.bind(this);
        this.onLastNameChanged = this.onLastNameChanged.bind(this);
        this.onOldPasswordChanged = this.onOldPasswordChanged.bind(this);
        this.onPasswordChanged = this.onPasswordChanged.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onPhoneChanged = this.onPhoneChanged.bind(this);
        this.onBirthDateChanged = this.onBirthDateChanged.bind(this);
        this.onPronounChanged = this.onPronounChanged.bind(this);
    }

    public async componentDidMount() {
        const { mode } = this.state;
        if (mode === ManageAccountModes.EDIT) {
            try {
                const response = await Account.getSelf();
                const accountDetails = response.data.data;
                accountDetails.birthDate = this.date2input(accountDetails.birthDate);
                this.setState({ accountDetails });
            } catch (e) {
                if (e && e.data) {
                    ValidationErrorGenerator(e.data);
                }
            }
        }
    }


    public render() {
        const { mode, formSubmitted } = this.state;

        if (mode === ManageAccountModes.CREATE && formSubmitted) {
            return <ConfirmationEmailSentComponent />
        } else if (mode === ManageAccountModes.EDIT && formSubmitted) {
            return <Redirect to={FrontendRoute.HOME_PAGE} />
        } else {
            return this.renderForm();
        }
    }

    private renderForm() {
        const { mode, accountDetails } = this.state;
        return (
            <MaxWidthBox m={'auto'} maxWidth={'500px'}>
                <MaxWidthBox maxWidth={'500px'} m={'auto'}>
                    <H1 color={'#F2463A'} fontSize={'30px'} textAlign={'left'} marginTop={'0px'} marginBottom={'20px'} marginLeft={'0px'}>
                        {mode === ManageAccountModes.CREATE ? 'Create' : 'Edit'} your Account
                    </H1>
                    <FormDescription>
                        {CONSTANTS.REQUIRED_DESCRIPTION}
                    </FormDescription>
                </MaxWidthBox>
                <Form onSubmit={this.handleSubmit}>
                    <FullNameInput
                        firstNameValue={accountDetails.firstName}
                        lastNameValue={accountDetails.lastName}
                        onFirstNameChanged={this.onFirstNameChanged}
                        onLastNameChanged={this.onLastNameChanged}
                    />
                    <EmailInput
                        label={CONSTANTS.EMAIL_LABEL}
                        value={accountDetails.email}
                        onEmailChanged={this.onEmailChanged}
                        disabled={mode === ManageAccountModes.EDIT}
                        required={true}
                    />
                    {
                        (mode === ManageAccountModes.CREATE) ?
                            <PasswordInput
                                label={CONSTANTS.PASSWORD_LABEL}
                                onPasswordChanged={this.onPasswordChanged}
                                value={accountDetails.password}
                                required={true}
                            /> :
                            (
                                <MaxWidthBox>
                                    <PasswordInput
                                        label={CONSTANTS.OLD_PASSWORD_LABEL}
                                        onPasswordChanged={this.onOldPasswordChanged}
                                    />
                                    <PasswordInput
                                        label={CONSTANTS.NEW_PASSWORD_LABEL}
                                        onPasswordChanged={this.onPasswordChanged}
                                    />
                                </MaxWidthBox>
                            )
                    }
                    <DietaryRestrictionComponent
                        label={CONSTANTS.DIETARY_RESTRICTIONS_LABEL}
                        value={accountDetails.dietaryRestrictions}
                        onDietaryRestrictionsChanged={this.onDietaryRestrictionsChanged}
                        required={false}
                    />
                    <PronounInput
                        label={CONSTANTS.PRONOUN_LABEL}
                        value={accountDetails.pronoun}
                        placeholder={CONSTANTS.PRONOUN_PLACEHOLDER}
                        onPronounChanged={this.onPronounChanged}
                        required={true}
                    />
                    <ShirtSizeComponent
                        label={CONSTANTS.SHIRT_SIZE_LABEL}
                        value={accountDetails.shirtSize}
                        onShirtSizeChanged={this.onShirtSizeChanged}
                        required={true}
                    />
                    <NumberFormat
                        value={accountDetails.phoneNumber}
                        label={CONSTANTS.PHONE_NUMBER_LABEL}
                        placeholder="+# (###) ###-####"
                        onValueChange={this.onPhoneChanged}
                        format="+# (###) ###-####"
                        required={true}
                    />
                    <NumberFormat
                        value={accountDetails.birthDate}
                        label={CONSTANTS.BIRTH_DATE_LABEL}
                        placeholder="MM-DD-YYYY"
                        onValueChange={this.onBirthDateChanged}
                        format="##-##-####"
                        required={true}
                    />
                    <Flex justifyContent={'center'}>
                        <Box>
                            <Button type='button' onClick={this.handleSubmit}>Submit</Button>
                        </Box>
                    </Flex>
                </Form>
            </MaxWidthBox>
        )
    }

    private handleSubmit() {
        const { mode, accountDetails } = this.state;

        // special formatting for date
        const formattedDetails = {
            ...accountDetails,
            birthDate: this.input2date(accountDetails.birthDate)
        };

        switch (mode) {
            case ManageAccountModes.CREATE:
                this.handleCreate(formattedDetails);
                break;
            case ManageAccountModes.EDIT:
                this.handleEdit(formattedDetails);
                break;
        }
    }

    private async handleCreate(payload: IAccount) {
        try {
            await Account.create(payload);
            console.log('Created an account');
            await Auth.login(payload.email, payload.password);
            this.setState({ formSubmitted: true });
        } catch (e) {
            if (e && e.data) {
                ValidationErrorGenerator(e.data);
            }
        }
    }

    private async handleEdit(payload: IAccount) {
        try {
            await Account.update(payload);
            console.log('Edited account');
            if (this.state.oldPassword && payload.password) {
                await Auth.changePassword(this.state.oldPassword, payload.password);
                console.log('Updated password');
            }
            this.setState({ formSubmitted: true });
        } catch (e) {
            if (e && e.data) {
                ValidationErrorGenerator(e.data);
            }
        }
    }
    private onDietaryRestrictionsChanged(dietaryRestrictions: string[]) {
        const accountDetails = { ...this.state.accountDetails, dietaryRestrictions };
        this.setState({ accountDetails });
    }
    private onShirtSizeChanged(shirtSize: ShirtSize) {
        const accountDetails = { ...this.state.accountDetails, shirtSize };
        this.setState({ accountDetails });
    }
    private onEmailChanged(email: string) {
        const accountDetails = { ...this.state.accountDetails, email };
        this.setState({ accountDetails });
    }
    private onFirstNameChanged(firstName: string) {
        const accountDetails = { ...this.state.accountDetails, firstName };
        this.setState({ accountDetails });
    }
    private onLastNameChanged(lastName: string) {
        const accountDetails = { ...this.state.accountDetails, lastName };
        this.setState({ accountDetails });
    }
    private onOldPasswordChanged(oldPassword: string) {
        this.setState({ oldPassword });
    }
    private onPasswordChanged(password: string) {
        const accountDetails = { ...this.state.accountDetails, password };
        this.setState({ accountDetails });
    }
    private onPhoneChanged(phone: NumberFormatValues) {
        const accountDetails = { ...this.state.accountDetails, phoneNumber: phone.value };
        this.setState({ accountDetails });
    }
    private onBirthDateChanged(birthdate: NumberFormatValues) {
        const accountDetails = { ...this.state.accountDetails, birthDate: birthdate.formattedValue };
        this.setState({ accountDetails });
    }
    private onPronounChanged(pronoun: string) {
        const accountDetails = { ...this.state.accountDetails, pronoun };
        this.setState({ accountDetails });
    }

    private input2date(date: string): string {
        const dateFields = date.split('-');
        const formattedDate = new Date(Number(dateFields[2]), Number(dateFields[0]) - 1, Number(dateFields[1]));
        return formattedDate.toString();
    }

    private date2input(date: string): string {
        const parsed = new Date(date);
        const day = padStart(2, '0', String(parsed.getDate()));
        const month = padStart(2, '0', String(parsed.getMonth() + 1));
        const year = parsed.getUTCFullYear();
        return `${month}-${day}-${year}`;
    }
}

export default WithToasterContainer(ManageAccountContainer);

import * as React from 'react';
import Account from 'src/api/account';
import EmailInput from 'src/components/emailInputComponent';
import DietaryRestrictionComponent from 'src/components/dietaryRestrictionsComponent';
import ShirtSize from 'src/config/shirtSizes';
import ShirtSizeComponent from 'src/components/shirtSizeComponent';
import FullNameInput from 'src/components/fullNameInputComponent';
import PasswordInput from 'src/components/passwordInputComponent';
import Button from 'src/shared/Button';
import Container from 'src/shared/Container';
import { Flex, Box } from '@rebass/grid'
import { NumberFormatValues } from 'react-number-format';
import NumberFormat from 'src/components/numberFormatComponent';
import PronounInput from 'src/components/pronounComponent';
import H1 from 'src/shared/H1';
import Form from 'src/shared/Form';
import ConfirmationEmailSentComponent from 'src/containers/confirmEmail';
import Auth from 'src/api/auth';
import MaxWidthBox from 'src/shared/MaxWidthBox';
import Paragraph from 'src/shared/Paragraph';
import ValidationErrorGenerator from 'src/components/ValidationErrorGenerator';
import WithToasterContainer from 'src/hoc/withToaster';
import { UserType, IAccount } from 'src/config/userTypes';

export enum ManageAccountModes {
    CREATE,
    EDIT
}

interface IManageAccountContainerState {
    mode: ManageAccountModes;
    accountCreated: boolean;
    accountDetails: IAccount;
}

interface IManageAccountContainerProps {
    mode: ManageAccountModes
}

class ManageAccountContainer extends React.Component<IManageAccountContainerProps, IManageAccountContainerState>{
    constructor(props: IManageAccountContainerProps) {
        super(props);
        this.state = {
            accountCreated: props.mode !== ManageAccountModes.CREATE,
            mode: props.mode,
            accountDetails: {
                accountType: UserType.UNKNOWN,
                birthDate: new Date(),
                confirmed: false,
                dietaryRestrictions: [],
                email: '',
                firstName: '',
                id: '',
                lastName: '',
                password: '',
                phoneNumber: '',
                pronoun: '',
                shirtSize: ShirtSize.M,
            }
        };
        this.onDietaryRestrictionsChanged = this.onDietaryRestrictionsChanged.bind(this);
        this.onShirtSizeChanged = this.onShirtSizeChanged.bind(this);
        this.onEmailChanged = this.onEmailChanged.bind(this);
        this.onFirstNameChanged = this.onFirstNameChanged.bind(this);
        this.onLastNameChanged = this.onLastNameChanged.bind(this);
        this.onPasswordChanged = this.onPasswordChanged.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onPhoneChanged = this.onPhoneChanged.bind(this);
        this.onBirthDateChanged = this.onBirthDateChanged.bind(this);
        this.onPronounChanged = this.onPronounChanged.bind(this);
    }

    public async componentDidMount() {
        const {mode} = this.state;
        if (mode === ManageAccountModes.EDIT) {
            try {
                const response = await Account.getSelf();
                const accountDetails = response.data.data;


                console.log(accountDetails);

                this.setState({
                    accountDetails:
                    {...this.state.accountDetails, email: accountDetails.email}});
            } catch(e) {
                if (e && e.data) {
                    ValidationErrorGenerator(e.data);
                }
            }
        }
    }

    
    public render() {
        const {mode, accountCreated} = this.state;

        if (mode === ManageAccountModes.CREATE && accountCreated) {
            return <ConfirmationEmailSentComponent />
        } else {
            return this.renderForm();
        }
    }

    private renderForm() {
        const {mode, accountDetails} = this.state;
        return (
            <Container>
                <MaxWidthBox width={'80%'} maxWidth={'500px'} m={'auto'}>
                    <H1 color={'#F2463A'} fontSize={'30px'} textAlign={'left'} marginTop={'0px'} marginBottom={'20px'} marginLeft={'0px'}>
                        Your Account
                    </H1>
                </MaxWidthBox>
                <MaxWidthBox width={'80%'} maxWidth={'500px'} m={'auto'}>
                    <Paragraph color={'#4D4D4D'} fontSize={'18px'} textAlign={'left'} marginTop={'0px'} marginBottom={'20px'}>
                        {mode === ManageAccountModes.CREATE ? 'Create' : 'Edit'} your account
                    </Paragraph>
                </MaxWidthBox>
                <Form onSubmit={this.handleSubmit}>
                    <FullNameInput
                        onFirstNameChanged={this.onFirstNameChanged}
                        onLastNameChanged={this.onLastNameChanged}
                    />
                    <EmailInput
                        value={accountDetails.email}
                        onEmailChanged={this.onEmailChanged}
                    />
                    <PasswordInput
                        onPasswordChanged={this.onPasswordChanged}
                    />
                    <DietaryRestrictionComponent
                        onDietaryRestrictionsChanged={this.onDietaryRestrictionsChanged}
                    />
                    <PronounInput
                        placeholder="Preferred pronoun"
                        onPronounChanged={this.onPronounChanged}
                    />
                    <ShirtSizeComponent
                        onShirtSizeChanged={this.onShirtSizeChanged}
                    />
                    <NumberFormat
                        label="Phone number:"
                        placeholder="+# (###) ###-####"
                        onValueChange={this.onPhoneChanged}
                        format="+# (###) ###-####"
                    />
                    <NumberFormat
                        label="Birth date:"
                        placeholder="MM-DD-YYYY"
                        onValueChange={this.onBirthDateChanged}
                        format="##-##-####"
                    />
                    <Flex justifyContent={'center'}>
                        <Box>
                            <Button type='button' onClick={this.handleSubmit}>Submit</Button>
                        </Box>
                    </Flex>
                </Form>
            </Container>
        )
    }

    private handleSubmit() {
        const {mode} = this.state;
        switch (mode) {
            case ManageAccountModes.CREATE:
                this.handleCreate();
                break;
            case ManageAccountModes.EDIT:
                this.handleEdit();
                break;
        }
    }

    private async handleCreate() {
        try {
            await Account.create(this.state.accountDetails);
            console.log('Created an account');
            await Auth.login(this.state.accountDetails.email, this.state.accountDetails.password);
            this.setState({accountCreated: true});
        } catch(e) {
            if (e && e.data) {
                ValidationErrorGenerator(e.data);
            }
        }
            
    }

    private async handleEdit() {
        try {
            await Account.update(this.state.accountDetails);
            console.log('Created an account');
            this.setState({accountCreated: true});
        } catch(e) {
            if (e && e.data) {
                ValidationErrorGenerator(e.data);
            }
        }
    }
    private onDietaryRestrictionsChanged(dietaryRestrictions: string[]) {
        const accountDetails = {...this.state.accountDetails, dietaryRestrictions};
        this.setState({accountDetails});
    }
    private onShirtSizeChanged(shirtSize: ShirtSize) {
        const accountDetails = {...this.state.accountDetails, shirtSize};
        this.setState({accountDetails});
    }
    private onEmailChanged(email: string) {
        const accountDetails = {...this.state.accountDetails, email};
        this.setState({accountDetails});
    }
    private onFirstNameChanged(firstName: string) {
        const accountDetails = {...this.state.accountDetails, firstName};
        this.setState({accountDetails});
    }
    private onLastNameChanged(lastName: string) {
        const accountDetails = {...this.state.accountDetails, lastName};
        this.setState({accountDetails});
    }
    private onPasswordChanged(password: string) {
        const accountDetails = {...this.state.accountDetails, password};
        this.setState({accountDetails});
    }
    private onPhoneChanged(phone: NumberFormatValues) {
        const accountDetails = {...this.state.accountDetails, phoneNumber: phone.value};
        this.setState({accountDetails});
    }
    private onBirthDateChanged(birthdate: NumberFormatValues) {
        const dateFields = birthdate.formattedValue.split('-');
        const date = new Date(Number(dateFields[2]), Number(dateFields[0]) - 1, Number(dateFields[1]));
        const accountDetails = {...this.state.accountDetails, birthDate: date};
        this.setState({accountDetails});
    }
    private onPronounChanged(pronoun: string) {
        const accountDetails = {...this.state.accountDetails, pronoun};
        this.setState({accountDetails});
    }
}

export default WithToasterContainer(ManageAccountContainer);

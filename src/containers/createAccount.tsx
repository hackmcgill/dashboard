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
import { AxiosResponse } from 'axios';
import { Flex, Box } from '@rebass/grid'
import { NumberFormatValues } from 'react-number-format';
import NumberFormat from 'src/components/numberFormatComponent';
import PronounInput from 'src/components/pronounComponent';
import H1 from 'src/shared/H1';
import Form from 'src/shared/Form';
import ConfirmationEmailSentComponent from 'src/containers/confirmEmail';
import Auth from 'src/api/auth';


interface ICreateAccountContainerState {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    dietaryRestrictions: string[];
    shirtSize: ShirtSize;
    pronoun: string;
    phone: string;
    birthdate: Date;

    accountCreated: boolean;
}

class CreateAccountContainer extends React.Component<{}, ICreateAccountContainerState>{
    constructor(props: {}) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            dietaryRestrictions: [],
            shirtSize: ShirtSize.M,
            pronoun: '',
            phone: '',
            birthdate: new Date(),
            accountCreated: false
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
    public render() {
        if (this.state.accountCreated) {
            return <ConfirmationEmailSentComponent />
        } else {
            return this.renderForm();
        }
    }

    private renderForm() {
        return (
            <Container>
                <form onSubmit={this.handleSubmit}>
                    <Flex flexWrap={'wrap'} name='Title wrap'>
                        <Box width={1} ml={0.1} name='Title box'>
                            <H1 color={'#F2463A'} fontSize={'24px'}>
                                Your account
                            </H1>
                        </Box>
                        <Box width={1} ml={0.9} name='Description box'>
                            <H1 color={'#000000'} fontSize={'12px'}>
                                create account
                            </H1>
                        </Box>
                    </Flex>


                    <Flex flexWrap={'wrap'}>
                        <Box width={1}>
                            <FullNameInput
                                onFirstNameChanged={this.onFirstNameChanged}
                                onLastNameChanged={this.onLastNameChanged}
                            />
                        </Box>
                        <Box width={1}>
                            <EmailInput
                                onEmailChanged={this.onEmailChanged}
                            />
                        </Box>
                        <Box width={1}>
                            <PasswordInput
                                onPasswordChanged={this.onPasswordChanged}
                            />
                        </Box>
                    </Flex>
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
        Account.create(
            {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                password: this.state.password,
                dietaryRestrictions: this.state.dietaryRestrictions,
                shirtSize: this.state.shirtSize,
                id: '',
                phoneNumber: this.state.phone,
                birthDate: this.state.birthdate,
                pronoun: this.state.pronoun
            }
        ).then((value: AxiosResponse) => {
            // Good response
            if (value.status === 200) {
                console.log('Created an account');
                Auth.login(this.state.email, this.state.password).then(
                    (success) => {
                        this.setState({
                            accountCreated: true
                        });
                    }, (reason) => {
                        console.error(reason);
                    }
                );
            }
        }).catch((reason) => {
            console.error(reason);
        });
    }
    private onDietaryRestrictionsChanged(dietaryRestrictions: string[]) {
        this.setState({ dietaryRestrictions });
    }
    private onShirtSizeChanged(shirtSize: ShirtSize) {
        this.setState({ shirtSize });
    }
    private onEmailChanged(email: string) {
        this.setState({ email });
    }
    private onFirstNameChanged(firstName: string) {
        this.setState({ firstName });
    }
    private onLastNameChanged(lastName: string) {
        this.setState({ lastName });
    }
    private onPasswordChanged(password: string) {
        this.setState({ password });
    }
    private onPhoneChanged(phone: NumberFormatValues) {
        console.log(phone);
        this.setState({ phone: phone.value });
    }
    private onBirthDateChanged(birthdate: NumberFormatValues) {
        console.log(new Date(birthdate.formattedValue));
        this.setState({ birthdate: new Date(birthdate.formattedValue) });
    }
    private onPronounChanged(pronoun: string) {
        this.setState({ pronoun });
    }
}

export default CreateAccountContainer;

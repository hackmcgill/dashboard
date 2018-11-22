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
import { ThemeProvider } from 'styled-components';
import PhoneInput from 'react-phone-number-input';
import DayPickerInput from 'react-day-picker/DayPickerInput';

import theme from '../theme';
import 'react-phone-number-input/style.css'
import 'react-day-picker/lib/style.css';
import PronounInput from 'src/components/pronounComponent';


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
            birthdate: new Date()
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
        return (
            <ThemeProvider theme={theme}>
                <Container>
                    <form onSubmit={this.handleSubmit}>
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
                        <PhoneInput
                            placeholder="Enter phone number"
                            value={this.state.phone}
                            onChange={this.onPhoneChanged} />
                        <DayPickerInput
                            placeholder="Enter your birthdate"
                            onDayChange={this.onBirthDateChanged}
                            format="MM-DD-YYYY"
                        />
                        <Flex justifyContent={'center'}>
                            <Box>
                                <Button type='button' onClick={this.handleSubmit}>Submit</Button>
                            </Box>
                        </Flex>

                    </form>
                </Container>
            </ThemeProvider>
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
    private onPhoneChanged(phone: string) {
        this.setState({ phone });
    }
    private onBirthDateChanged(birthdate: Date) {
        this.setState({ birthdate });
    }
    private onPronounChanged(pronoun: string) {
        this.setState({ pronoun });
    }
}

export default CreateAccountContainer;

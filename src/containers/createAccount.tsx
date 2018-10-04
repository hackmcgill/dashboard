import * as React from 'react';
import Account from '../api/account';
import EmailInput from '../components/emailInputComponent';
import DietaryRestrictionComponent from '../components/dietaryRestrictionsComponent';
import ShirtSize from '../shared/shirtSizes';
import { ShirtSizeComponent } from '../components/shirtSize';
import FullNameInput from 'src/components/fullNameInputComponent';
import PasswordInput from 'src/components/passwordInputComponent';
import { AxiosResponse } from 'axios';

interface ICreateAccountContainerState {
    firstName: string;
    lastName: string;
    email: string;
    password: string
    dietaryRestrictions: string[];
    shirtSize: ShirtSize;
}

export class CreateAccountContainer extends React.Component<{}, ICreateAccountContainerState>{
    constructor(props: {}) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            dietaryRestrictions: [],
            shirtSize: ShirtSize.M
        };
        this.onDietaryRestrictionsChanged = this.onDietaryRestrictionsChanged.bind(this);
        this.onShirtSizeChanged = this.onShirtSizeChanged.bind(this);
        this.onEmailChanged = this.onEmailChanged.bind(this);
        this.onFirstNameChanged = this.onFirstNameChanged.bind(this);
        this.onLastNameChanged = this.onLastNameChanged.bind(this);
        this.onPasswordChanged = this.onPasswordChanged.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    public render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <FullNameInput
                    onFirstNameChanged={this.onFirstNameChanged}
                    onLastNameChanged={this.onLastNameChanged}
                />
                <EmailInput
                    onEmailChanged={this.onEmailChanged}
                />
                <PasswordInput 
                    onPasswordChanged={this.onPasswordChanged}
                />
                <DietaryRestrictionComponent
                    onDietaryRestrictionsChanged={this.onDietaryRestrictionsChanged}
                />
                <ShirtSizeComponent
                    onShirtSizeChanged={this.onShirtSizeChanged}
                />
                <input type="button" value="Submit" onClick={this.handleSubmit} />
            </form>
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
                id: ''
            }
        ).then((value:AxiosResponse) => {
            // Good response
            if(value.status === 200) {
                console.log("Created an account");
            }
        }).catch((reason) => {
            console.error(reason);
        })
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

}

export default CreateAccountContainer;
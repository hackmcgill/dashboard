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
import { Flex, Box} from '@rebass/grid'

interface ICreateAccountContainerState {
    firstName: string;
    lastName: string;
    email: string;
    password: string
    dietaryRestrictions: string[];
    shirtSize: ShirtSize;
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
                    <ShirtSizeComponent
                        onShirtSizeChanged={this.onShirtSizeChanged}
                    />
                    <Flex justifyContent={'center'}>
                        <Box>
                            <Button type='button' onClick={this.handleSubmit}>Submit</Button>
                        </Box>
                        
                    </Flex>
                    
                </form>
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
                id: ''
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

}

export default CreateAccountContainer;

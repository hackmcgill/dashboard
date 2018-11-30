import * as React from 'react';
import Auth from '../api/auth';
import { AxiosResponse } from 'axios';
import EmailInputComponent from 'src/components/emailInputComponent';
import Key from 'src/assets/images/key.svg';
import Container from 'src/shared/Container';
import Button from 'src/shared/Button';
import Image from 'src/shared/Image';
import { Flex, Box } from '@rebass/grid';
import Paragraph from 'src/shared/Paragraph';
import H1 from 'src/shared/H1';
import Form from 'src/shared/Form';

export interface IForgotState {
    email: string;
}

/**
 * Container that renders form to log in.
 */
export default class ForgotPasswordContainer extends React.Component<{}, IForgotState>{
    constructor(props: {}) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onEmailChanged = this.onEmailChanged.bind(this);
    }
    public render() {
        return (
            <Container>
                <Flex flexWrap={'wrap'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>
                    <Box>
                        <Image src={Key} height={"4rem"} padding={'1rem'} />
                    </Box>
                    <Box>
                        <H1 color={'#F2463A'} fontSize={'36px'}>
                            Password Reset
                                </H1>
                    </Box>
                    <Box>
                        <Paragraph
                            fontSize={'16px'}
                            center={true}
                            paddingBottom={'32px'}
                            color={'#4D4D4D'}
                        >
                            Enter your email and we will send you a link to reset your password
                        </Paragraph>
                    </Box>
                    <Box width={'100%'}>
                        <Form>
                            <Flex justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>
                                <Box width={'80%'}>
                                    <EmailInputComponent
                                        onEmailChanged={this.onEmailChanged}
                                        placeholder={'foo@bar.ca'}
                                    />
                                </Box>
                                <Box>
                                    <Button type='button' onClick={this.handleSubmit}>Reset password</Button>
                                </Box>
                            </Flex>
                        </Form>

                    </Box>
                </Flex>
            </Container>
        );
    }
    /**
     * Function that calls the login function once the form is submitted.
     */
    private handleSubmit(): void {
        Auth.forgotPassword(
            this.state.email,
        ).then((value: AxiosResponse) => {
            // Good response
            if (value.status === 200) {
                // Probably want to redirect to login page or something
                console.log('reset password');
                // check if there's a redirect link
            } else {
                console.error(value);
            }
        }).catch((reason) => {
            console.error(reason);
        });
    }
    /**
     * Callback that is called once email is added.
     * @param email The updated email
     */
    private onEmailChanged(email: string) {
        this.setState({ email });
    }
}

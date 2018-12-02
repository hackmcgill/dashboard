import * as React from 'react';
import * as QueryString from 'query-string';
import { AxiosResponse } from 'axios';
import { Link } from 'react-router-dom';
import { Flex, Box } from '@rebass/grid';

import PasswordInputComponent from 'src/components/passwordInputComponent';
import Auth from 'src/api/auth';
import EmailInputComponent from 'src/components/emailInputComponent';
import Button from 'src/shared/Button';
import H1 from 'src/shared/H1';
import FrontendRoute from 'src/config/FrontendRoute';
import Form from 'src/shared/Form';
import MaxWidthBox from 'src/shared/MaxWidthBox';
import LeftContainer from 'src/shared/LeftContainer';
import ForgotPasswordLinkComponent from 'src/components/forgotPasswordLinkComponent';
import BackgroundLandscape from 'src/assets/images/backgroundLandscape.svg';
import BackgroundImage from 'src/shared/BackgroundImage';
import MediaQuery from 'react-responsive';
import Container from 'src/shared/Container';
export interface ILoginState {
    email: string;
    password: string;
}

/**
 * Container that renders form to log in.
 */
export default class LoginContainer extends React.Component<{}, ILoginState>{
    constructor(props: {}) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onPasswordChanged = this.onPasswordChanged.bind(this);
        this.onEmailChanged = this.onEmailChanged.bind(this);
    }
    public render() {
        return (
            <Flex
                justifyContent={'center'}
                alignItems={'center'}
                flexDirection={'column'}
            >
                <Box width={1}>
                    {this.renderLargeHeight()}
                    {this.renderSmallHeight()}
                </Box>
            </ Flex>
        );
    }

    private renderLargeHeight() {
        return (
            <MediaQuery minHeight={'600px'}>
                <Flex
                    justifyContent={'center'}
                    alignItems={'center'}
                    flexDirection={'column'}
                    pb={'25%'}
                >
                    {this.renderLargeWidth()}
                    {this.renderSmallWidth()}
                </Flex>
            </MediaQuery>
        )
    }
    private renderSmallHeight() {
        return (
            <MediaQuery maxHeight={'600px'}>
                <Flex
                    justifyContent={'center'}
                    alignItems={'center'}
                    flexDirection={'column'}
                    pb={0}
                >
                    {this.renderLargeWidth()}
                    {this.renderSmallWidth()}
                </Flex>
            </MediaQuery>
        )
    }

    private renderForm() {
        return (
            <Form>
                <Flex
                    alignItems={'center'}
                    flexDirection={'column'}
                >
                    <MaxWidthBox width={'80%'} maxWidth={'500px'} ml={'12%'}>
                        <H1 color={'#F2463A'} fontSize={'24px'} textAlign={'left'}>
                            Sign in / Register
                        </H1>
                    </MaxWidthBox>
                    <MaxWidthBox width={'80%'} maxWidth={'500px'}>
                        <EmailInputComponent
                            onEmailChanged={this.onEmailChanged}
                            isTight={true}
                        />
                    </MaxWidthBox>
                    <MaxWidthBox width={'80%'} maxWidth={'500px'} pb={'30px'}>
                        <PasswordInputComponent
                            onPasswordChanged={this.onPasswordChanged}
                            isTight={true}
                        />
                        <ForgotPasswordLinkComponent />
                    </MaxWidthBox>
                    <Flex>
                        <Box pr={'5px'}>
                            <Button type='button' onClick={this.handleSubmit}>Sign in</Button>
                        </Box>
                        <Box pl={'5px'}>
                            <Link to={FrontendRoute.CREATE_ACCOUNT_PAGE}>
                                <Button type='button' onClick={this.handleSubmit} secondary={true}>Register</Button>
                            </Link>
                        </Box>
                    </Flex>
                </Flex>
            </Form>);

    }

    private renderLargeWidth() {
        return (
            <MediaQuery minWidth={1224}>
                <Box width={1}>
                    <LeftContainer>
                        {this.renderForm()}
                    </LeftContainer>
                    <BackgroundImage src={BackgroundLandscape} top={'0px'} left={'0px'} width={'100%'} height={'100%'} />
                </Box>
            </MediaQuery >
        );
    }
    private renderSmallWidth() {
        return (
            <MediaQuery maxWidth={1224}>
                <Box width={1}>
                    <Container>
                        {this.renderForm()}
                    </Container>
                    <BackgroundImage src={BackgroundLandscape} top={'0px'} left={'0px'} height={'100%'} />
                </Box>
            </MediaQuery>
        );
    }

    /**
     * Function that calls the login function once the form is submitted.
     */
    private handleSubmit(): void {
        Auth.login(
            this.state.email,
            this.state.password
        ).then((value: AxiosResponse) => {
            // Good response
            if (value.status === 200) {
                // Probably want to redirect to login page or something
                console.log('Logged in');
                // check if there's a redirect link
                const redir = this.getRedirectLink();
                if (redir) {
                    console.log("requested redirect.")
                    // TODO: implement redirect after react-router is implemented.
                }
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
    /**
     * Callback that is called once password is added.
     * @param password The updated password
     */
    private onPasswordChanged(password: string) {
        this.setState({ password });
    }
    /**
     * Returns the redirect link, or undefined if it doesn't exist.
     */
    private getRedirectLink(): any {
        const queries: any = QueryString.parse(location.search);
        if (queries.redir) {
            return queries.redir.toString();
        } else {
            return undefined;
        }
    }
}

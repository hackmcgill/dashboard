import * as React from 'react';
import * as QueryString from 'query-string';
import { AxiosResponse } from 'axios';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
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
// import Container from 'src/shared/Container';
import WithToasterContainer from 'src/hoc/withToaster';
import ValidationErrorGenerator from 'src/components/ValidationErrorGenerator';
import APIResponse from 'src/api/APIResponse';
export interface ILoginState {
    email: string;
    password: string;
}

/**
 * Container that renders form to log in.
 */
class LoginContainer extends React.Component<RouteComponentProps, ILoginState>{
    constructor(props: RouteComponentProps) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onPasswordChanged = this.onPasswordChanged.bind(this);
        this.onEmailChanged = this.onEmailChanged.bind(this);
    }
    public render() {
        return (
            <MediaQuery minWidth={1224}>
            {
                (matches) => 
                    matches ?
                    <LeftContainer>
                        {this.renderForm()}
                        <BackgroundImage
                            src={BackgroundLandscape}
                            top={'0px'}
                            left={'0px'}
                            imgWidth={'100%'}
                            imgHeight={'100%'}
                            minHeight={'600px'}
                        />
                    </LeftContainer> :
                <div>
                    {this.renderForm()}
                    <BackgroundImage
                        src={BackgroundLandscape}
                        top={'0px'}
                        left={'0px'}
                        imgHeight={'100%'}
                    />
                </div>  
            }
            </MediaQuery >
        );
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
                                <Button type='button' secondary={true}>Register</Button>
                            </Link>
                        </Box>
                    </Flex>
                </Flex>
            </Form>);

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
                const redir = this.getRedirectLink();
                if (redir) {
                    this.props.history.push(redir);
                } else {
                    this.props.history.push(FrontendRoute.HOME_PAGE);
                }
            } else {
                console.error(value);
            }
        }).catch((response: AxiosResponse<APIResponse<any>> | undefined) => {
            if (response) {
                ValidationErrorGenerator(response.data);
            }
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

export default withRouter<RouteComponentProps>(WithToasterContainer(LoginContainer));

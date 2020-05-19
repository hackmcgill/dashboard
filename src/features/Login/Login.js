import { Box, Flex } from '@rebass/grid';
import * as QueryString from 'query-string';
import * as React from 'react';
import Helmet from 'react-helmet';
import MediaQuery from 'react-responsive';
import { Link, withRouter } from 'react-router-dom';

import ValidationErrorGenerator from '../../shared/Form/validationErrorGenerator';
import ForgotPasswordLinkComponent from './ForgotPasswordLink';

import {
    BackgroundImage,
    H1,
    LeftContainer,
    MaxWidthBox,
} from '../../shared/Elements';
import Button, { ButtonVariant } from '../../shared/Elements/Button';
import { EmailInput, Form, PasswordInput } from '../../shared/Form';

import BackgroundLandscape from '../../assets/images/backgroundLandscape.svg';

import WithToasterContainer from '../../shared/HOC/withToaster';

import { Auth } from '../../api';

import {
    EMAIL_LABEL,
    FrontendRoute,
    HACKATHON_NAME,
    PASSWORD_LABEL,
} from '../../config';

/**
 * Container that renders form to log in.
 */
class LoginContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onPasswordChanged = this.onPasswordChanged.bind(this);
        this.onEmailChanged = this.onEmailChanged.bind(this);
    }
    render() {
        return (
            <MediaQuery minWidth={1224}>
                {(matches) =>
                    matches ? (
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
                        </LeftContainer>
                    ) : (
                            <div>
                                {this.renderForm()}
                                <BackgroundImage
                                    src={BackgroundLandscape}
                                    top={'0px'}
                                    left={'0px'}
                                    imgHeight={'100%'}
                                />
                            </div>
                        )
                }
            </MediaQuery>
        );
    }

    renderForm() {
        return (
            <MaxWidthBox maxWidth={'600px'} pl={'50px'} pr={'50px'}>
                <Helmet>
                    <title>Login | {HACKATHON_NAME}</title>
                </Helmet>
                <Form>
                    <Flex
                        alignItems={'center'}
                        flexDirection={'column'}
                        p={'4rem 0rem 0rem 5.8rem'}
                    >
                        <Box alignSelf={'flex-start'}>
                            <H1 fontSize={'24px'} marginLeft={'0px'}>
                                Sign in / Register
              </H1>
                        </Box>
                        <EmailInput
                            label={EMAIL_LABEL}
                            onEmailChanged={this.onEmailChanged}
                            value={this.state.email}
                            isTight={true}
                        />
                        <PasswordInput
                            label={PASSWORD_LABEL}
                            onPasswordChanged={this.onPasswordChanged}
                            value={this.state.password}
                            isTight={true}
                        />
                        <Box alignSelf={'flex-end'} mb={'30px'} pr={'10px'}>
                            <ForgotPasswordLinkComponent />
                        </Box>
                        <Flex>
                            <Box pr={'5px'}>
                                <Button type="button" onClick={this.handleSubmit}>
                                    Sign in
                </Button>
                            </Box>
                            <Box pl={'5px'}>
                                <Link
                                    to={{
                                        pathname: FrontendRoute.CREATE_ACCOUNT_PAGE,
                                        state: { ...this.state },
                                    }}
                                >
                                    <Button type="button" variant={ButtonVariant.Secondary}>
                                        Register
                  </Button>
                                </Link>
                            </Box>
                        </Flex>
                    </Flex>
                </Form>
            </MaxWidthBox>
        );
    }

    /**
     * Function that calls the login function once the form is submitted.
     */
    handleSubmit() {
        Auth.login(this.state.email, this.state.password)
            .then((value) => {
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
            })
            .catch((response) => {
                if (response && response.data) {
                    ValidationErrorGenerator(response.data);
                }
            });
    }
    /**
     * Callback that is called once email is added.
     * @param email The updated email
     */
    onEmailChanged(email) {
        this.setState({ email });
    }
    /**
     * Callback that is called once password is added.
     * @param password The updated password
     */
    onPasswordChanged(password) {
        this.setState({ password });
    }
    /**
     * Returns the redirect link, or undefined if it doesn't exist.
     */
    getRedirectLink() {
        const queries = QueryString.parse(window.location.search);
        if (queries.redir) {
            return queries.redir.toString();
        } else {
            return undefined;
        }
    }
}
export default WithToasterContainer(
    withRouter(LoginContainer)
);

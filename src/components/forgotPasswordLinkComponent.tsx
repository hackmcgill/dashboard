import * as React from 'react';
import { Link } from 'react-router-dom';
import FrontendRoute from 'src/config/FrontendRoute';
import styled from 'styled-components';

const RHSDiv = styled.div`
    text-align: right;
    font-size: 12px;
    font-family: Brown, Hind Siliguri, -apple-system, system-ui, BlinkMacSystemFont, sans-serif;
    color: #4D4D4D;
    padding-right: 15%;
`

const ForgotPasswordLinkComponent: React.StatelessComponent<{}> = (props) => {
    return (
        <Link to={FrontendRoute.FORGOT_PASSWORD_PAGE}>
            <RHSDiv>
                Forgot password?
            </RHSDiv>
        </Link>
    );
}

export default ForgotPasswordLinkComponent;
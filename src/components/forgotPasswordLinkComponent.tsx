import * as React from 'react';
import { Link } from 'react-router-dom';
import FrontendRoute from 'src/config/FrontendRoute';
import { Flex } from '@rebass/grid';

const ForgotPasswordLinkComponent: React.StatelessComponent<{}> = (props) => {
    return (
        <Link to={FrontendRoute.FORGOT_PASSWORD_PAGE}>
            <Flex justifyContent={'flex-end'} m={'10px'}>
                <span>Forgot password?</span>
            </Flex>
        </Link>
    );
}

export default ForgotPasswordLinkComponent;

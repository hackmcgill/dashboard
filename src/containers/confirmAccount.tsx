import * as React from 'react';
import { Flex, Box } from '@rebass/grid';
import { Link } from 'react-router-dom';

import resetLogo from 'src/assets/images/passwordReset.svg';
import Image from 'src/shared/Image';
import H1 from 'src/shared/H1';
import Button from 'src/shared/Button';
import getTokenFromQuery from 'src/config/authToken';
import AuthAPI from 'src/api/auth';

interface IConfirmAccountState {
    attempting: boolean;
    wasConfirmed: boolean;
}


class ConfirmAccountContainer extends React.Component<{}, IConfirmAccountState>{
    constructor(props: {}) {
        super(props);
        this.state = {
            attempting: true,
            wasConfirmed: false
        };
    }
    public render() {
        let result;
        let buttonMessage;
        let link;
        if (this.state.wasConfirmed) {
            result = 'Account confirmed!';
            buttonMessage = 'Continue';
            link = '/';
        } else if (!this.state.attempting) {
            result = 'Unable to confirm account';
            buttonMessage = 'Create account';
            link = '/account/create';
        } else {
            result = 'Attempting to confirm account...';
            buttonMessage = ''
            link = '';
        }
        return (
            <Flex justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>
                <Flex alignItems={'center'}>
                    {
                        (this.state.wasConfirmed) ? (<Box>
                            <Image src={resetLogo} height={"4rem"} padding={'2.0rem'} />
                        </Box>
                        ) : ''
                    }
                    <Box>
                        <H1 color={'#F2463A'} fontSize={'40px'}>
                            {result}
                        </H1>
                    </Box>
                </Flex>
                <Box hidden={this.state.attempting}>
                    <Link to={link}>
                        <Button>
                            {buttonMessage}
                        </Button>
                    </Link>
                </Box>
            </Flex>
        )
    }

    public async componentDidMount() {
        try {
            const token = getTokenFromQuery();
            const response = await AuthAPI.confirm(token);
            if (response.status === 200) {
                console.log("Confirmed account");
                this.setState({
                    attempting: false,
                    wasConfirmed: true
                });
            } else {
                this.setState({
                    attempting: false
                })
                console.error("Did not confirm account");
            }
        } catch (e) {
            this.setState({
                attempting: false
            });
            console.error('No token found in the query parameters');
        }
    }
}
export default ConfirmAccountContainer;
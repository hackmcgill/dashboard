import * as React from 'react';
import { Flex } from '@rebass/grid';
import { Link } from 'react-router-dom';

import constructionCone from 'src/assets/images/construction-cone.svg';
import Image from 'src/shared/Image';
import H1 from 'src/shared/H1';
import Button from 'src/shared/Button';
import getTokenFromQuery from 'src/config/authToken';
import AuthAPI from 'src/api/auth';
import Paragraph from 'src/shared/Paragraph';
import MaxWidthBox from 'src/shared/MaxWidthBox';

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
        let paragraphMessage;
        let buttonMessage;
        let link;
        if (this.state.wasConfirmed) {
            result = 'Account Confirmed';
            paragraphMessage = 'Your account was successfully created! Click continue to start your application, view your teams or manage your account.';
            buttonMessage = 'Continue';
            link = '/';
        } else if (!this.state.attempting) {
            result = 'Unable to confirm account';
            paragraphMessage = 'Something went wrong when we made your account. Please try again later.';
            buttonMessage = 'Create account';
            link = '/account/create';
        } else {
            result = 'Confirming...';
            paragraphMessage = '';
            buttonMessage = '';
            link = '';
        }
        return (
            <Flex justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>
                <MaxWidthBox hidden={this.state.wasConfirmed && !this.state.attempting} mb={'20px'}>
                    <Image src={constructionCone} imgHeight={'6rem'} />
                </MaxWidthBox>
                <MaxWidthBox mb={'0px'}>
                    <H1 fontSize={'40px'}>
                        {result}
                    </H1>
                </MaxWidthBox>
                <MaxWidthBox hidden={this.state.attempting} mb={'20px'}>
                    <Paragraph fontSize={'24px'} maxWidth={'600px'} textAlign={'center'}>
                        {paragraphMessage}
                    </Paragraph>
                </MaxWidthBox>
                <MaxWidthBox hidden={this.state.attempting}>
                    <Link to={link}>
                        <Button>
                            {buttonMessage}
                        </Button>
                    </Link>
                </MaxWidthBox>
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

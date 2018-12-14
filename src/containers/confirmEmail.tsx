import * as React from 'react';
import { Flex, Box } from '@rebass/grid'
import { AxiosResponse } from 'axios';

import { Auth, APIResponse } from 'src/api';
import constructionSVG from 'src/assets/images/construction.svg';
import { Button, H1, Image, MaxWidthBox, Paragraph } from 'src/shared';
import ValidationErrorGenerator from 'src/components/ValidationErrorGenerator';
import WithToasterContainer from 'src/hoc/withToaster';
import { RESEND_CONF_EMAIL, EMAIL_SENT } from 'src/config';

interface IConfirmationEmailSentState {
    buttonDisabled: boolean;
}


class ConfirmationEmailSentComponent extends React.Component<{}, IConfirmationEmailSentState>{
    private sendDelay: number;

    constructor(props: {}) {
        super(props);
        this.state = {
            buttonDisabled: false
        }
        this.sendDelay = 10000; // 10,000ms
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    public render() {
        return (
            <Flex justifyContent={'center'} alignItems={'center'} flexDirection={'column'} mx={3}>
                <Flex alignItems={'center'} flexDirection={'column'}>
                    <Box>
                        <Image src={constructionSVG} imgHeight={"6rem"} padding={'0.5rem'} />
                    </Box>
                    <Box>
                        <H1 fontSize={'48px'}>
                            Confirm your Email
                        </H1>
                    </Box>
                </Flex>
                <MaxWidthBox width={1} fontSize={[2, 3, 4]} mb={'20px'}>
                    <Paragraph paddingBottom={'32px'} textAlign={'center'}>
                        Please check your inbox for a confirmation email. Click the link in the email to confirm your email address.
                    </Paragraph>
                </MaxWidthBox>
                <Box>
                    <Button type='button' onClick={this.handleSubmit} disabled={(this.state.buttonDisabled)}>
                        {(!this.state.buttonDisabled) ? RESEND_CONF_EMAIL : EMAIL_SENT}
                    </Button>
                </Box>
            </Flex>
        )
    }
    private handleSubmit() {
        this.setState({
            buttonDisabled: true
        });
        Auth.resendConfirmationEmail().then((value) => {
            if (value.status === 200) {
                setTimeout(() => {
                    this.setState({
                        buttonDisabled: false
                    });
                }, this.sendDelay);
            }
        }).catch((response: AxiosResponse<APIResponse<any>> | undefined) => {
            if (response && response.data) {
                ValidationErrorGenerator(response.data);
            }
        });
    }
}

export default WithToasterContainer(ConfirmationEmailSentComponent);

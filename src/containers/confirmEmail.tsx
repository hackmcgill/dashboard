import * as React from 'react';
import Auth from 'src/api/auth';
import Button from 'src/shared/Button';
import { Flex, Box } from '@rebass/grid'
import constructionSVG from 'src/assets/images/construction.svg';
import H1 from 'src/shared/H1';
import Image from 'src/shared/Image';
import Paragraph from 'src/shared/Paragraph';
import MaxWidthBox from 'src/shared/MaxWidthBox';
import { AxiosResponse } from 'axios';
import APIResponse from 'src/api/APIResponse';
import ValidationErrorGenerator from 'src/components/ValidationErrorGenerator';
import WithToasterContainer from 'src/hoc/withToaster';

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
                        <Image src={constructionSVG} height={"6rem"} padding={'0.5rem'} />
                    </Box>
                    <Box>
                        <H1 color={'#F2463A'} fontSize={'48px'}>
                            Confirm your Email
                        </H1>
                    </Box>
                </Flex>
                <MaxWidthBox width={1} fontSize={[2, 3, 4]}>
                    <Paragraph center={true} paddingBottom={'32px'} color={'#4D4D4D'}>
                        Please check your inbox for a confirmation email. Click the link in the email to confirm your email address.
                    </Paragraph>
                </MaxWidthBox>
                <Box>
                    <Button type='button' onClick={this.handleSubmit} disabled={(this.state.buttonDisabled)}>
                        {(!this.state.buttonDisabled) ? 'Resend confirmation email' : 'Sent!'}
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

import * as React from 'react';
import Auth from 'src/api/auth';
import Button from 'src/shared/Button';
import { Flex, Box } from '@rebass/grid'
import constructionSVG from 'src/assets/images/construction.svg';
import H1 from 'src/shared/H1';
import Image from 'src/shared/Image';
import Paragraph from 'src/shared/Paragraph';

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
    }
    public render() {
        return (
            <Flex justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>
                <Flex alignItems={'center'}>
                    <Box>
                        <Image src={constructionSVG} height={"4rem"} padding={'2.0rem'} />
                    </Box>
                    <Box>
                        <H1 color={'#F2463A'} fontSize={'48px'}>
                            Confirm your Email
                        </H1>
                    </Box>
                </Flex>
                <Box width={1}>
                    <Paragraph fontSize={'23px'} center={true} paddingBottom={'32px'}>
                        Please check your inbox for a confirmation email. Click the link in the email to confirm your email address.
                    </Paragraph>
                </Box>
                <Box>
                    <Button type='button' onClick={this.handleSubmit} disabled={(this.state.buttonDisabled)}>Resend confirmation email</Button>
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
            } else if (value.status === 422) {
                console.log("Already confirmed");
            }
        })
    }
}

export default ConfirmationEmailSentComponent;

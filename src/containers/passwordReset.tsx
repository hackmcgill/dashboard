import * as React from 'react';
import resetLogo from 'src/passwordReset.svg';
import Image from 'src/shared/Image';
import {Flex, Box} from '@rebass/grid';
import H1 from 'src/shared/H1';
import Paragraph from 'src/shared/Paragraph';
import Container from 'src/shared/Container'
import { ThemeProvider } from 'styled-components';
import Button from 'src/shared/Button';

import theme from '../theme';

export interface IPasswordResetContainerState {
    redirectURL: string;
}

class PasswordResetContainer extends React.Component<{}, IPasswordResetContainerState>{
    constructor(props: {}) {
        super(props);
        // this.loginRedirect = this.loginRedirect.bind(this);
        this.state = {
            redirectURL: ""
        }
    }
    public render() {
        return (
        <ThemeProvider theme={theme}>
            <Container>
                <Flex alignItems={'center'}>
                    <Flex flexWrap={'wrap'} justifyContent={'center'}>
                        <Box>
                            <H1 color={'#F2463A'} fontSize={'45px'}>
                                Password reset
                            </H1>
                        </Box>
                        <Box width={1}>
                            <Paragraph fontSize={'23px'} center={true}>
                                We've sent you a link to reset your password. Check your inbox and follow the instructions there.
                            </Paragraph>
                        </Box>
                        <Box>
                            <Image src={resetLogo} height={"6rem"} padding={'2.2rem'}/>
                        </Box>
                        <Box>
                            <Button type='button' onClick={}>Submit</Button>
                        </Box>
                    </Flex>
                </Flex>
            </Container>
        </ThemeProvider>
        )
    }
}


export default PasswordResetContainer;




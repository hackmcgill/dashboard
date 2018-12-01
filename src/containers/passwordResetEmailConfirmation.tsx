import * as React from 'react';
import resetLogo from 'src/passwordReset.svg';
import Image from 'src/shared/Image';
import { Flex, Box } from '@rebass/grid';
import H1 from 'src/shared/H1';
import Paragraph from 'src/shared/Paragraph';
import Container from 'src/shared/Container'
import Button from 'src/shared/Button';
import { ThemeProvider } from 'styled-components';
import theme from 'src/theme';
import { Link } from 'react-router-dom';

class PasswordResetContainer extends React.Component<{}, {}>{
    constructor(props: {}) {
        super(props);
    }
    public render() {
        return (
            <ThemeProvider theme={theme}>
                <Container>
                    <Flex height={'100%'} flexWrap={'wrap'} justifyContent={'center'} alignItems={'center'} flex-direction={'column'}>
                        <Flex alignItems={'center'}>
                            <Box>
                                <Image src={resetLogo} height={"4rem"} padding={'2.0rem'} />
                            </Box>
                            <Box>
                                <H1 color={'#F2463A'} fontSize={'45px'}>
                                    Password reset
                            </H1>
                            </Box>
                        </Flex>
                        <Box width={1}>
                            <Paragraph fontSize={'23px'} center={true} paddingBottom={'32px'}>
                                We've sent you a link to reset your password. Check your inbox and follow the instructions there.
                                </Paragraph>
                        </Box>
                        <Box>
                            <Link to="/login">
                                <Button type='button'>Take me home!</Button>
                            </Link>
                        </Box>
                    </Flex>
                </Container>
            </ThemeProvider>
        )
    }
}
export default PasswordResetContainer;
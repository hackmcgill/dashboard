import * as React from 'react';
import resetLogo from 'src/passwordReset.svg';
import Image from 'src/shared/Image';
import { Flex, Box } from '@rebass/grid';
import H1 from 'src/shared/H1';
import Paragraph from 'src/shared/Paragraph';
import Container from 'src/shared/Container'
import Button from 'src/shared/Button';
import { Link } from 'react-router-dom';

export interface IPasswordResetContainerState {
    redirectURL: string;
}

class PasswordResetContainer extends React.Component<{}, IPasswordResetContainerState>{
    constructor(props: {}) {
        super(props);
<<<<<<< HEAD
        // this.loginRedirect = this.loginRedirect.bind(this);
=======

>>>>>>> added redirect function
        this.state = {
            redirectURL: ""
        }
    }
    public render() {
        return (
<<<<<<< HEAD
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
                            <Image src={resetLogo} height={"6rem"} padding={'2.2rem'} />
                        </Box>
                        <Box>
                            <Link to="/login">
                                <Button type='button'>Take me home!</Button>
                            </Link>
                        </Box>
                    </Flex>
                </Flex>
            </Container>
=======
        <Flex flexWrap={'wrap'}>
        <Box width={3}>
            <H1>
                <h1>Password reset</h1>
            </H1>
        </Box>
        <Box width={3}>
            <H3>
                <h3>We've sent you a link to reset your password. Check your inbox and follow the instructions there.</h3>
            </H3>
        </Box>
        <Box width={3}>
            <Image>
                <img src={resetLogo} height={'10px'} width={'10px'}/>
            </Image>
        </Box>
        </Flex>
>>>>>>> added redirect function
        )
    }
    private loginRedirect(): void {
        setTimeout(function () {
            // after 2 seconds
            // window.location = "/";
         }, 2000)
    }
}
<<<<<<< HEAD
export default PasswordResetContainer;
=======


export default PasswordResetContainer;
>>>>>>> added redirect function

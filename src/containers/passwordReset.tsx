import * as React from 'react';
import resetLogo from 'src/passwordReset.svg';
import Image from 'src/shared/Image';
import {Flex, Box} from '@rebass/grid';
import H1 from 'src/shared/H1';
import H3 from 'src/shared/H3';

export interface IPasswordResetContainerState {
    redirectURL: string;
}

class PasswordResetContainer extends React.Component<{}, IPasswordResetContainerState>{
    constructor(props: {}) {
        super(props);

        this.state = {
            redirectURL: ""
        }
    }
    public render() {
        return (
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
        )
    }
    private loginRedirect(): void {
        setTimeout(function () {
            // after 2 seconds
            // window.location = "/";
         }, 2000)
    }
}


export default PasswordResetContainer;
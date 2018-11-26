import * as React from 'react';
import resetLogo from 'src/passwordReset.svg';
import Image from 'src/shared/Image';
import {Flex, Box} from '@rebass/grid';
import H1 from 'src/shared/H1';
import H3 from 'src/shared/H3';

class PasswordResetContainer extends React.Component<{}>{
    public render() {
        return (
        <Flex flexWrap={'wrap'}>
        <Box width={1}>
            <H1>
                Password reset
            </H1>
        </Box>
        <Box width={3}>
            <H3>
                We've sent you a link to reset your password. Check your inbox and follow the instructions there.
            </H3>
        </Box>
        <Box width={1}>
            <Image>
                <img src={resetLogo} height={'10px'} width={'auto'}/>
            </Image>
        </Box>
        </Flex>
        )
    }
}

export default PasswordResetContainer;
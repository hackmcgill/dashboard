import * as React from 'react';
import Construction from 'src/assets/images/construction-notfound.svg'
import Button from 'src/shared/Button';
import Image from 'src/shared/Image';
import { Flex, Box } from '@rebass/grid';
import Paragraph from 'src/shared/Paragraph';
import H1 from 'src/shared/H1';
import { withRouter, RouteComponentProps } from 'react-router';
import MaxWidthBox from 'src/shared/MaxWidthBox';
import { Link } from 'react-router-dom';

/**
 * Container that renders 404 not found page.
 */
class NotFoundContainer extends React.Component<RouteComponentProps>{
    constructor(props: RouteComponentProps) {
        super(props);
        
    }
    public render() {
        
            return (
                <Flex
                    flexWrap={'wrap'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    flexDirection={'column'}
                    px={3}
                >
                    <Box>
                        <Image src={Construction} imgHeight={"7rem"} padding={'0rem'} />
                    </Box>
                    <Box>
                        <H1>
                            404: Page not Found
                        </H1>
                    </Box>
                    <MaxWidthBox fontSize={[2, 3, 4]}>
                        <Paragraph
                            center={true}
                            paddingBottom={'20px'}
                            color={'#4D4D4D'}
                        >
                            The page you're looking for doesn't exist or has been moved
                        </Paragraph>
                    </MaxWidthBox>
                    <Box width={'100%'}>
                        
                            <Flex
                                justifyContent={'center'}
                                alignItems={'center'}
                                flexDirection={'column'}>
                                <Box>
                                    <Link to={'/'}><Button type='button'>Click to go home</Button></Link>
                                </Box>
                            </Flex>
                    </Box>
                </Flex>
            );
        
    }

}

export default withRouter<RouteComponentProps>(NotFoundContainer);

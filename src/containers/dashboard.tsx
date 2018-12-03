    import * as React from "react";
    import Card from "src/shared/Card";
    import { Flex, Box } from "@rebass/grid";
    import iconAccount from "src/assets/images/dashboard-account.svg";
    import iconApplication from "src/assets/images/dashboard-application.svg";
    // import iconTeam from 'src/assets/images/dashboard-team.svg';
    import BackgroundLandscape from "src/assets/images/backgroundLandscape.svg";
    import H2 from "src/shared/H2";
    import Image from "src/shared/Image";
    import { Link } from "react-router-dom";
    import HackerStatus from "src/config/hackerStatus";
    import BackgroundImage from "src/shared/BackgroundImage";

    import MediaQuery from 'react-responsive';

    export interface IDashboardState {
    status: HackerStatus;
    }

    /**
     * Container that renders form to log in.
     */
    class DashboardContainer extends React.Component<{}, IDashboardState> {
    constructor(props: {}) {
        super(props);
    }
    public render() {
        return (
            <Flex flexWrap={"wrap"} alignItems={"center"} justifyContent={"center"}>
                <Link to="/">
                <Card width={"250px"} flexDirection={"column"}>
                    <H2 fontSize={"28px"}>Application</H2>
                    <Image src={iconApplication} height={"125px"} />
                </Card>
                </Link>
                <Link to="/">
                <Card width={"250px"} flexDirection={"column"}>
                    <H2 fontSize={"28px"}>Account</H2>
                    <Image src={iconAccount} height={"125px"} />
                </Card>
                </Link>

                <MediaQuery minWidth={960}>
                    <Box width={1}>
                        <BackgroundImage src={BackgroundLandscape} top={'0px'} left={'0px'} width={'100%'} height={'100%'} />
                    </Box>
                </MediaQuery>
            </Flex>
        
        );
    }
    }

    export default DashboardContainer;

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
import hacker from 'src/api/hacker';
import H1 from 'src/shared/H1';
import { IHacker } from 'src/config/userTypes';
import FrontendRoute from 'src/config/FrontendRoute';

export interface IDashboardState {
    status: HackerStatus;
}

/**
 * Container that renders form to log in.
 */
class DashboardContainer extends React.Component<{}, IDashboardState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            status: HackerStatus.HACKER_STATUS_NONE
        }
    }

    public async componentDidMount() {
        try {
            const response = await hacker.getSelf();
            saveHackerInfo(response.data);
        } catch (e) {
            if (e.status === 401) {
                this.setState({ status: HackerStatus.HACKER_STATUS_NONE })
            }
        }
    }

    public render() {
        const { status } = this.state;
        return (
            <Flex flexDirection={'column'} alignItems={'center'}>
                <H1>status: {status.toLowerCase()}</H1>
                <Flex flexWrap={"wrap"} alignItems={"center"} justifyContent={"center"}>
                    <Link to={FrontendRoute.CREATE_APPLICATION_PAGE}>
                        <Card width={"250px"} flexDirection={"column"}>
                            <H2 fontSize={"28px"}>Application</H2>
                            <Image src={iconApplication} imgHeight={"125px"} />
                        </Card>
                    </Link>
                    <Link to={FrontendRoute.HOME_PAGE}>
                        <Card width={"250px"} flexDirection={"column"}>
                            <H2 fontSize={"28px"}>Account</H2>
                            <Image src={iconAccount} imgHeight={"125px"} />
                        </Card>
                    </Link>

                    <MediaQuery minWidth={960}>
                        <Box width={1}>
                            <BackgroundImage src={BackgroundLandscape} top={'0px'} left={'0px'} imgWidth={'100%'} imgHeight={'100%'} />
                        </Box>
                    </MediaQuery>
                </Flex>
            </Flex>
        );
    }
}

function saveHackerInfo(info: IHacker) {
    console.log(info);
}

export default DashboardContainer;

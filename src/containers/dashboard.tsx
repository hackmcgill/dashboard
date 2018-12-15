import * as React from "react";
import { AxiosResponse } from 'axios';
import { Flex, Box } from "@rebass/grid";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import MediaQuery from 'react-responsive';

import iconAccount from "../assets/images/dashboard-account.svg";
import iconApplication from "../assets/images/dashboard-application.svg";
import BackgroundLandscape from "../assets/images/backgroundLandscape.svg";
// import iconTeam from '../assets/images/dashboard-team.svg';


import { BackgroundImage, Card, H1, H2, Image } from "../shared";
import { HackerStatus, FrontendRoute, ACCOUNT_NOT_CONFIRMED_MSG, RESEND_CONF_EMAIL, EMAIL_SENT } from "../config";

import { APIResponse, Auth, Hacker } from '../api';

import { isConfirmed } from '../util/UserInfoHelperFunctions';

import WithToasterContainer from '../hoc/withToaster';

import ValidationErrorGenerator from '../components/ValidationErrorGenerator';

export interface IDashboardState {
    status: HackerStatus;
    confirmed: boolean;
}

/**
 * Container that renders form to log in.
 */
class DashboardContainer extends React.Component<{}, IDashboardState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            status: HackerStatus.HACKER_STATUS_NONE,
            confirmed: true
        }
        this.confirmAccountToastError = this.confirmAccountToastError.bind(this);
        this.resendConfirmationEmaill = this.resendConfirmationEmaill.bind(this);
    }

    public async componentDidMount() {
        try {
            const response = await Hacker.getSelf();
            this.setState({ status: response.data.data.status })
        } catch (e) {
            if (e.status === 401) {
                this.setState({ status: HackerStatus.HACKER_STATUS_NONE })
            }
        }
        try {
            const confirmed = await isConfirmed();
            this.setState({ confirmed });
        } catch (e) {
            this.setState({ confirmed: false });
        }
    }

    public render() {
        const { status, confirmed } = this.state;

        let applicationBtnLink;
        if (status === HackerStatus.HACKER_STATUS_APPLIED) {
            applicationBtnLink = FrontendRoute.EDIT_APPLICATION_PAGE;
        } else if (status === HackerStatus.HACKER_STATUS_NONE && confirmed) {
            applicationBtnLink = FrontendRoute.CREATE_APPLICATION_PAGE;
        } else {
            applicationBtnLink = FrontendRoute.HOME_PAGE;
        }

        return (
            <Flex flexDirection={'column'} alignItems={'center'}>
                <H1>status: {status.toLowerCase()}</H1>
                <Flex flexWrap={"wrap"} alignItems={"center"} justifyContent={"center"}>
                    <Link to={applicationBtnLink} onClick={this.confirmAccountToastError} style={{ textDecoration: 'none' }}>
                        <Card width={"250px"} flexDirection={"column"}>
                            <H2 fontSize={"28px"} marginBottom={"30px"} textAlign={"center"}>Application</H2>
                            <Image src={iconApplication} imgHeight={"125px"} />
                        </Card>
                    </Link>
                    <Link to={FrontendRoute.EDIT_ACCOUNT_PAGE} style={{ textDecoration: 'none' }}>
                        <Card width={"250px"} flexDirection={"column"}>
                            <H2 fontSize={"28px"} marginBottom={"30px"} textAlign={"center"}>Account</H2>
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

    private confirmAccountToastError() {
        const { status, confirmed } = this.state;
        if (!confirmed) {
            const reactMsg = (
                <Flex flexWrap={"wrap"} alignItems={"center"} justifyContent={"center"}>
                    <Box mb={'3px'}>{ACCOUNT_NOT_CONFIRMED_MSG}</Box>
                    <Box onClick={this.resendConfirmationEmaill} style={{ textDecoration: 'underline' }}>{RESEND_CONF_EMAIL}</Box>
                </Flex>);
            toast.error(reactMsg, {
                autoClose: false,
            });
        } else if (!(status === HackerStatus.HACKER_STATUS_NONE || status === HackerStatus.HACKER_STATUS_APPLIED)) {
            // can only access application if their status is NONE, or APPLIED.
            toast.error('You can no longer access your application.');
        }
    }
    private resendConfirmationEmaill() {
        Auth.resendConfirmationEmail().then((value: AxiosResponse<APIResponse<{}>>) => {
            if (value.status === 200) {
                toast.success(EMAIL_SENT);
            }
        }).catch((response: AxiosResponse<APIResponse<any>> | undefined) => {
            if (response && response.data) {
                ValidationErrorGenerator(response.data);
            }
        });
    }
}
export default WithToasterContainer(DashboardContainer);

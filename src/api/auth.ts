import API from 'src/api/api';
import APIRoute from 'src/config/APIRoute';
import { AxiosPromise } from 'axios';
import APIResponse from './APIResponse';

class AuthAPI {
    constructor() {
        API.createEntity(APIRoute.LOGIN);
        API.createEntity(APIRoute.LOGOUT);
        API.createEntity(APIRoute.FORGOT_PASS);
        API.createEntity(APIRoute.RESET_PASS);
        API.createEntity(APIRoute.RESEND_CONF_EMAIL);
    }
    /**
     * Logs in a user to the API.
     * @param {String} email 
     * @param {String} password 
     */
    public login(email: string, password: string): AxiosPromise {
        return API.getEndpoint(APIRoute.LOGIN).create(
            { email, password }
        );
    }
    /**
     * Logs out a user from the API
     * @returns {AxiosPromise<AxiosResponse>} a promise which resolves to a response
     */
    public logout(): AxiosPromise {
        return API.getEndpoint(APIRoute.LOGOUT).getOne({ id: '' });

    }
    /**
     * Sends a request for a reset-password email.
     * @param {string} email 
     */
    public forgotPassword(email: string): AxiosPromise {
        return API.getEndpoint(APIRoute.FORGOT_PASS).create({ email });
    }
    /**
     * Reset a password given an authentication token (provided by API in email).
     * @param {string} password 
     * @param {string} authToken 
     */
    public resetPassword(password: string, authToken: string): AxiosPromise {
        const config = {
            headers: {
                Authentication: authToken
            }
        }
        return API.getEndpoint(APIRoute.RESET_PASS).create({ password }, { config });
    }
    /**
     * Resends the confirmation email.
     */
    public resendConfirmationEmail(): AxiosPromise<APIResponse> {
        return API.getEndpoint(APIRoute.RESEND_CONF_EMAIL).getAll();
    }
}

export default new AuthAPI();

import API from './api';
import Route from '../config/APIRoute';
import { AxiosPromise } from 'axios';
import APIResponse from './APIResponse';

class AuthAPI {
    constructor() {
        API.createEntity(Route.LOGIN);
        API.createEntity(Route.LOGOUT);
        API.createEntity(Route.FORGOT_PASS);
        API.createEntity(Route.RESET_PASS);
        API.createEntity(Route.RESEND_CONF_EMAIL);
        API.createEntity(Route.CHANGE_PASS);
    }
    /**
     * Logs in a user to the API.
     * @param {String} email 
     * @param {String} password 
     */
    public login(email: string, password: string): AxiosPromise {
        return API.getEndpoint(Route.LOGIN).create(
            { email, password }
        );
    }
    /**
     * Logs out a user from the API
     * @returns {AxiosPromise<AxiosResponse>} a promise which resolves to a response
     */
    public logout(): AxiosPromise {
        return API.getEndpoint(Route.LOGOUT).getOne({ id: '' });

    }
    /**
     * Sends a request for a reset-password email.
     * @param {string} email 
     */
    public forgotPassword(email: string): AxiosPromise {
        return API.getEndpoint(Route.FORGOT_PASS).create({ email });
    }
    /**
     * Reset a password given an authentication token (provided by API in email).
     * @param {string} password 
     * @param {string} authToken 
     */
    public resetPassword(password: string, authToken: string): AxiosPromise {
        return API.getEndpoint(Route.RESET_PASS).create({ password },
            {
                config: {
                    headers: {
                        Authentication: authToken
                    }
                }
            }
        );
    }

    /**
     * Change the password of the logged in user from an old password to a new password.
     * @param {string} oldPassword The current password of the user
     * @param {string} newPassword The new password of the user
     */
    public changePassword(oldPassword: string, newPassword: string): AxiosPromise {
        const changePasswordObject = {
            "oldPassword": oldPassword,
            "newPassword": newPassword
        };
        return API.getEndpoint(Route.CHANGE_PASS).patch({ id: "" }, changePasswordObject);
    }

    /**
     * Resends the confirmation email.
     */
    public resendConfirmationEmail(): AxiosPromise<APIResponse> {
        return API.getEndpoint(Route.RESEND_CONF_EMAIL).getAll();
    }
}

export default new AuthAPI();

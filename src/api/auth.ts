import API from './api';
import Route from '../config/route';
import { AxiosPromise } from 'axios';

class AuthAPI {
    constructor() {
        API.createEntity(Route.LOGIN);
        API.createEntity(Route.LOGOUT);
        API.createEntity(Route.FORGOT_PASS);
        API.createEntity(Route.RESET_PASS);
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
        const config = {
            headers: {
                Authentication: authToken
            }
        }
        return API.getEndpoint(Route.RESET_PASS).create({ password }, { config });
    }
}

export default new AuthAPI();

import API from './api';
import * as CONSTANTS from '../shared/constants';
import {AxiosPromise, AxiosResponse} from 'axios';

class AuthAPI {
    constructor() {
        API.createEntity(CONSTANTS.LOGIN_URL);
        API.createEntity(CONSTANTS.LOGOUT_URL);
        API.createEntity(CONSTANTS.FORGOT_PASS);
        API.createEntity(CONSTANTS.RESET_PASS);
    }
    /**
     * Logs in a user to the API.
     * @param {String} email 
     * @param {String} password 
     * @returns {AxiosPromise<AxiosResponse>} a promise which resolves to a response
     */
    public login(email: string, password: string): AxiosPromise<AxiosResponse> { 
        return API.getEndpoint(CONSTANTS.LOGIN_URL).create(
            { email, password }
        );
    }
    /**
     * Logs out a user from the API
     * @returns {AxiosPromise<AxiosResponse>} a promise which resolves to a response
     */
    public logout(): AxiosPromise<AxiosResponse> {
        return API.getEndpoint(CONSTANTS.LOGIN_URL).getOne({id:''});

    }
    /**
     * Sends a request for a reset-password email.
     * @param {string} email 
     * @returns {AxiosPromise<AxiosResponse>} a promise which resolves to a response
     */
    public forgotPassword(email: string): AxiosPromise<AxiosResponse> { 
        return API.getEndpoint(CONSTANTS.LOGOUT_URL).create({ email });
    }
    /**
     * Reset a password given an authentication token (provided by API in email).
     * @param {string} password 
     * @param {string} authToken 
     */
    public resetPassword(password: string, authToken: string) {
        API.getEndpoint(CONSTANTS.RESET_PASS).create({ password }, {
            headers: {
                Authentication: authToken
            }
        }).then(
            (value) => {
                if(value.status >= 200 && value.status <= 299) {
                    console.log(value.data);
                } else {
                    console.error(value.data);
                }
            }
        ).catch((reason) => {
            console.error(reason);
        });
    }
}

export default new AuthAPI();
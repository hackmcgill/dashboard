import Account from 'src/api/account';
import Auth from 'src/api/auth';

import { AxiosResponse } from 'axios';
import APIResponse from 'src/api/APIResponse';
import { IAccount, UserType } from './userTypes';

class UserInfoController {
    /**
     * When we last queried for user information
     */
    private lastQueried: Date;
    /**
     * how long we assume the localStorage information is valid for, in milliseconds
     */
    private expiryTime: number;
    /**
     * The key used in localstorage
     */
    private userKey: string;
    constructor() {
        this.expiryTime = 60 * 60 * 500 // (30 min)
        this.userKey = 'userInfo';
        this.querySelf();
    }

    public userCanAccessCreateApplicationPage(user: IAccount) {
        return user.confirmed && user.accountType === UserType.HACKER;
    }

    public async isLoggedIn(): Promise<boolean> {
        try {
            const userInfo = await this.getUserInfo();
            if (userInfo) {
                return true;
            }
            return false;
        } catch (error) {
            return false;
        }
    }

    /**
     * Returns whether the current user is confirmed
     */
    public async isConfirmed(): Promise<boolean> {
        try {
            const user: IAccount | null = await this.getUserInfo();
            return !!user && user.confirmed;
        } catch (error) {
            return false;
        }
    }

    /**
     * Gets a previously queried 
     */
    public async getUserInfo(): Promise<IAccount | null> {
        const now = Date.now();
        const elapsed = this.lastQueried.getTime() - now;
        if (elapsed > this.expiryTime || this._getUserInfo() === null) {
            await this.querySelf();
        }
        const user: string | null = this._getUserInfo();
        if (user) {
            return (JSON.parse(user) as IAccount)
        }
        return null;
    }

    public async logOut(): Promise<AxiosResponse<APIResponse>> {
        const result: AxiosResponse<APIResponse> = await Auth.logout();
        this.deleteUserInfo();
        console.log('logged out');
        return result;
    }
    public async logIn(email: string, password: string): Promise<AxiosResponse<APIResponse>> {
        const result: AxiosResponse<APIResponse> = await Auth.login(email, password);
        await this.querySelf();
        console.log('logged in');
        return result;
    }

    /**
     * attempts to query user information
     * @returns Promise<boolean> whether or not the query self was successful
     */
    private async querySelf(): Promise<boolean> {
        try {
            this.lastQueried = new Date();
            const response: AxiosResponse<APIResponse<IAccount>> = await Account.getSelf();
            const user = response.data.data;
            this.setUserInfo(user);
            return true;
        } catch (error) {
            console.error(error);
            this.deleteUserInfo();
            return false;
        }
    }
    private _getUserInfo(): string | null {
        return window.localStorage.getItem(this.userKey);
    }
    private setUserInfo(user: IAccount) {
        window.localStorage.setItem(this.userKey, JSON.stringify(user));
    }
    private deleteUserInfo() {
        window.localStorage.removeItem(this.userKey);
    }
}

export default new UserInfoController();
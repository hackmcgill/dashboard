import { IHacker } from 'src/config/userTypes';
import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from 'axios';
import Route from 'src/config/APIRoute';
import API from 'src/api/api';
import HackerStatus from 'src/config/hackerStatus';
import APIResponse from './APIResponse';
import LocalCache from 'src/util/LocalCache';
import { CACHE_HACKER_KEY } from 'src/config/constants';
import IResumeResponse from 'src/config/resumeResponse';

class AccountAPI {
    constructor() {
        API.createEntity(Route.HACKER);
        API.createEntity(Route.HACKER_SELF);
        API.createEntity(Route.HACKER_RESUME);
    }
    /**
     * Create an account.
     * @param hacker The account that you want to create
     * @param authToken If there is an authentication token associated with the account creation, then provide it here.
     */
    public async create(hacker: IHacker): Promise<AxiosResponse<APIResponse<IHacker>>> {
        const config: AxiosRequestConfig = {};
        // return API.getEndpoint(Route.HACKER).create(hacker, { config });
        const value = await API.getEndpoint(Route.ACCOUNT).create(hacker, { config });
        LocalCache.set(CACHE_HACKER_KEY, value);
        return value;
    }
    /**
     * Get the logged-in user's hacker information, if they have a hacker info.
     */
    public async getSelf(overrideCache?: boolean): Promise<AxiosResponse<APIResponse<IHacker>>> {
        const cached: any = LocalCache.get(CACHE_HACKER_KEY);
        if (cached && !overrideCache) {
            return (cached as AxiosResponse<APIResponse<IHacker>>);
        }
        const value = await API.getEndpoint(Route.HACKER_SELF).getAll();
        LocalCache.set(CACHE_HACKER_KEY, value);
        return value;
    }
    /**
     * Get information about a hacker
     * @param id the ID of the hacker
     */
    public async get(id: string, overrideCache?: boolean): Promise<AxiosResponse<APIResponse<IHacker>>> {
        const key = CACHE_HACKER_KEY + '-' + id;
        const cached: any = LocalCache.get(key);
        if (cached && !overrideCache) {
            return (cached as Promise<AxiosResponse<APIResponse<IHacker>>>);
        }
        const value = await API.getEndpoint(Route.HACKER).getOne({ id });
        LocalCache.set(key, value);
        return value;
    }
    /**
     * Update a hacker information. In the future, we might want to relax the attributes being passed in
     * so that it's not the entirety of the Account object.
     * @param {IHacker} hacker 
     */
    public update(hacker: IHacker): AxiosPromise {
        const key = CACHE_HACKER_KEY + '-' + hacker.id;
        const value = API.getEndpoint(Route.HACKER).patch(hacker, hacker);
        LocalCache.remove(key);
        return value;
    }

    /**
     * Update's a hacker's status any status to any status of type HackerStatus
     * @param {String} id The id of the hacker to be updated
     * @param {HackerStatus} status The new status of the hacker
     */
    public updateStatus(id: string, status: HackerStatus): AxiosPromise {
        const key = CACHE_HACKER_KEY + '-' + id;
        const value = API.getEndpoint(Route.HACKER_STATUS).patch({ id }, { "status": status });
        LocalCache.remove(key);
        return value;
    }

    /**
     * Update's a hacker's status to checked-in if the hacker is accepted or confirmed.
     * @param {String} id The id of the hacker to be updated
     */
    public checkinStatus(id: string): AxiosPromise {
        const key = CACHE_HACKER_KEY + '-' + id;
        const value = API.getEndpoint(Route.HACKER_CHECKIN).patch({ id }, undefined);
        LocalCache.remove(key);
        return value;
    }

    /**
     * Allows an accepted hacker confirm attendance, and allow an confirmed hacker to unconfirm attendance.
     * @param id The id of the hacker
     * @param confirm Whether the hacker wishes to confirm their attendence or not.
     */
    public confirm(id: string, confirm: boolean): AxiosPromise {
        const key = CACHE_HACKER_KEY + '-' + id;
        const value = API.getEndpoint(Route.HACKER_STATUS).patch({ id }, { "confirm": confirm });
        LocalCache.remove(key);
        return value;
    }

    /**
     * Downloads a hacker's resume
     * @param id The id of the hacker who the resume belongs to
     */
    public downloadResume(id: string): AxiosPromise<AxiosResponse<APIResponse<IResumeResponse>>> {
        return API.getEndpoint(Route.HACKER_RESUME).getOne({ id });
    }

    public async uploadResume(id: string, resume: File): Promise<AxiosResponse<APIResponse<{}>>> {
        const data = new FormData();
        data.append('resume', resume);
        const key = CACHE_HACKER_KEY + '-' + id;
        const value = await API.getEndpoint(Route.HACKER_RESUME).create(data, { subURL: id });
        LocalCache.remove(key);
        return value;
    }
}
export default new AccountAPI();

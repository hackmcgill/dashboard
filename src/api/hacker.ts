import { IHacker } from 'src/config/userTypes';
import { AxiosPromise, AxiosRequestConfig } from 'axios';
import Route from 'src/config/APIRoute';
import API from 'src/api/api';
import HackerStatus from 'src/config/hackerStatus';
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
    public create(hacker: IHacker): AxiosPromise {
        const config: AxiosRequestConfig = {};
        return API.getEndpoint(Route.HACKER).create(hacker, { config });
    }
    /**
     * Get the logged-in user's hacker information, if they have a hacker info.
     */
    public getSelf(): AxiosPromise {
        return API.getEndpoint(Route.HACKER_SELF).getAll();
    }
    /**
     * Get information about a hacker
     * @param id the ID of the hacker
     */
    public get(id: string): AxiosPromise {
        return API.getEndpoint(Route.HACKER).getOne({ id });
    }
    /**
     * Update a hacker information. In the future, we might want to relax the attributes being passed in
     * so that it's not the entirety of the Account object.
     * @param {IHacker} hacker 
     */
    public update(hacker: IHacker): AxiosPromise {
        return API.getEndpoint(Route.HACKER).patch(hacker, hacker);
    }

    /**
     * Update's a hacker's status any status to any status of type HackerStatus
     * @param {String} id The id of the hacker to be updated
     * @param {HackerStatus} status The new status of the hacker
     */
    public updateStatus(id: string, status: HackerStatus): AxiosPromise {
        return API.getEndpoint(Route.HACKER_STATUS).patch({ id }, { "status": status });
    }

    /**
     * Update's a hacker's status to checked-in if the hacker is accepted or confirmed.
     * @param {String} id The id of the hacker to be updated
     */
    public checkinStatus(id: string): AxiosPromise {
        return API.getEndpoint(Route.HACKER_CHECKIN).patch({ id }, undefined);
    }

    /**
     * Allows an accepted hacker confirm attendance, and allow an confirmed hacker to unconfirm attendance.
     * @param id The id of the hacker
     * @param confirm Whether the hacker wishes to confirm their attendence or not.
     */
    public comfirm(id: string, confirm: boolean): AxiosPromise {
        return API.getEndpoint(Route.HACKER_STATUS).patch({ id }, { "confirm": confirm })
    }

    /**
     * Downloads a hacker's resume
     * @param id The id of the hacker who the resume belongs to
     */
    public downloadResume(id: string): AxiosPromise {
        return API.getEndpoint(Route.HACKER_RESUME).getOne({ id });
    }

    public uploadResume(resume: File, hackerId: string): AxiosPromise {
        const data = new FormData();
        data.append('resume', resume);
        return API.getEndpoint(Route.HACKER_RESUME).create(data, { subURL: hackerId });
    }
}
export default new AccountAPI();

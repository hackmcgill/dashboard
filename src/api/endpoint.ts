import axios, { AxiosPromise } from 'axios';
import { AxiosRequestConfig } from 'axios';
export default class Endpoint {
    private resourceURL: string;
    private name: string;

    constructor(name: string, resourceURL: string) {
        this.resourceURL = resourceURL
        this.name = name;
    }
    /**
     * Get a specific resource
     * @param {*} id the the id for a given resource
     * @param {AxiosRequestConfig} config 
     */
    public getOne({ id }: { id: string }, config: AxiosRequestConfig = {}): AxiosPromise {
        return axios.get(`${this.resourceURL}/${id}`, config);
    }
    /**
     * Get all resources
     * @param {AxiosRequestConfig} config 
     */
    public getAll(config: AxiosRequestConfig = {}): AxiosPromise {
        return axios.get(this.resourceURL, config);
    }
    /**
     * Create a specified resource by calling axios.post
     * @param {*} toCreate object to create. 
     * @param {AxiosRequestConfig} config 
     */
    public create(toCreate: any, config: AxiosRequestConfig = {}): AxiosPromise {
        return axios.post(this.resourceURL, toCreate, config);
    }
    /**
     * Update a specified resource by calling axios.put
     * @param {{id:string}} object object to update. Should contain an id. 
     * @param {*} toUpdate the update data. 
     * @param {AxiosRequestConfig} config 
     */
    public update({ id }: { id: string; }, toUpdate: any, config: AxiosRequestConfig = {}): AxiosPromise {
        return axios.put(`${this.resourceURL}/${id}`, toUpdate, config);
    }
    /**
     * Patch a specified resource by calling axios.patch
     * @param {{id:string}} object object to patch. Should contain an id. 
     * @param {*} toPatch the patched data. 
     * @param {AxiosRequestConfig} config 
     */
    public patch({ id }: { id: string; }, toPatch: any, config: AxiosRequestConfig = {}): AxiosPromise {
        return axios.patch(`${this.resourceURL}/${id}`, toPatch, config);
    }
    /**
     * Delete a specified resource by calling axios.delete
     * @param {{id:string}} object object to delete. Must contain an id. 
     * @param {AxiosRequestConfig} config 
     */
    public delete({ id }: { id: string; }, config: AxiosRequestConfig = {}): AxiosPromise {
        return axios.delete(`${this.resourceURL}/${id}`, config);
    }
    /**
     * Gets the name of api
     */
    public getName(): string {
        return this.name;
    }
}

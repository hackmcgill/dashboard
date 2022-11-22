import axios, { AxiosPromise } from 'axios';
import { AxiosRequestConfig } from 'axios';
axios.defaults.withCredentials = true;

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error.response);
  }
);

type IdentifierWithNumber = { identifier: number };
type IdentifierWithString = { identifier: string };
type Identifier = IdentifierWithNumber | IdentifierWithString;

export default class Endpoint {
  private resourceURL: string;
  private name: string;

  constructor(name: string, resourceURL: string) {
    this.resourceURL = resourceURL;
    this.name = name;
  }
  /**
   * Get a specific resource
   * @param {*} id the the id for a given resource
   * @param {AxiosRequestConfig} config
   */
  public getOne(
    { identifier }: Identifier,
    config: AxiosRequestConfig = {}
  ): AxiosPromise {
    return axios.get(`${this.resourceURL}/${identifier}`, config);
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
   * @param {subURL?: string, config?: AxiosRequestConfig} options a subURL, which is appended to resourceURL, and the AxiosRequestConfig.
   */
  public create(
    toCreate: any,
    options?: { subURL?: string; config?: AxiosRequestConfig }
  ): AxiosPromise {
    const url =
      options && options.subURL
        ? `${this.resourceURL}/${options.subURL}`
        : this.resourceURL;
    const config = options && options.config ? options.config : {};
    return axios.post(url, toCreate, config);
  }
  /**
   * Update a specified resource by calling axios.put
   * @param {{identifier}:Identifier} object object to update. Should contain an id.
   * @param {*} toUpdate the update data.
   * @param {AxiosRequestConfig} config
   */
  public update(
    { identifier }: Identifier,
    toUpdate: any,
    config: AxiosRequestConfig = {}
  ): AxiosPromise {
    return axios.put(`${this.resourceURL}/${identifier}`, toUpdate, config);
  }
  /**
   * Patch a specified resource by calling axios.patch
   * @param {{identifier}:Identifier} object object to patch. Should contain an id.
   * @param {*} toPatch the patched data.
   * @param {AxiosRequestConfig} config
   */
  public patch(
    { identifier }: Identifier,
    toPatch: any,
    config: AxiosRequestConfig = {}
  ): AxiosPromise {
    return axios.patch(`${this.resourceURL}/${identifier}`, toPatch, config);
  }
  /**
   * Sends a patch request directly to the endpoint without appending an indentifier
   * @param {*} toPatch the patched data.
   * @param {AxiosRequestConfig} config
   */
  public patchDirectly(
    toPatch: any,
    config: AxiosRequestConfig = {}
  ) {
    return axios.patch(this.resourceURL, toPatch, config);
  }
  /**
   * Delete a specified resource by calling axios.delete
   * @param {{identifier}:Identifier} object object to delete. Must contain an id.
   * @param {AxiosRequestConfig} config
   */
  public delete(
    { identifier }: Identifier,
    config: AxiosRequestConfig = {}
  ): AxiosPromise {
    return axios.delete(`${this.resourceURL}/${identifier}`, config);
  }
  /**
   * Gets the name of api
   */
  public getName(): string {
    return this.name;
  }
}

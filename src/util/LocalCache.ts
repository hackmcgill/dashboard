class LocalCache {
  private expiry: { [key: string]: number };
  private expiryTime: number;

  /**
   * Creates a Cache object.
   * @param expiryTime number of milliseconds after creation you want an item to expire in.
   */
  constructor(expiryTime: number = 60 * 60 * 500) {
    this.expiry = {};
    this.expiryTime = expiryTime;
  }

  /**
   * Gets an item in the cache, or null if it has expired / does not exist
   * @param key the key of the item you want to retrieve
   */
  public get(key: string): any {
    if (!this.expiry[key] || this.expiry[key] < Date.now()) {
      return null;
    } else {
      return this._get(key);
    }
  }

  /**
   * Set an item in the cache.
   * @param key key of the item you want to store in the cache
   * @param item value of the item you want to store in the cache
   * @param customExpiry Custom time you want this cache to expire at.
   */
  public set(key: string, item: any, customExpiry?: Date) {
    this.expiry[key] = customExpiry
      ? customExpiry.getTime()
      : Date.now() + this.expiryTime;
    this._set(key, item);
  }

  public remove(key: string) {
    delete this.expiry[key];
    this._remove(key);
  }

  private _get(key: string): any {
    const stored = window.localStorage.getItem(key);
    if (!stored) {
      return null;
    }
    return JSON.parse(stored);
  }
  private _set(key: string, item: any) {
    window.localStorage.setItem(key, JSON.stringify(item));
  }
  private _remove(key: string) {
    window.localStorage.removeItem(key);
  }
}
export default new LocalCache();

export default class APIResponse<T> {
    public data: T;
    public message: string;

    constructor() {
        this.data = null as any;
        this.message = '';
    }
}

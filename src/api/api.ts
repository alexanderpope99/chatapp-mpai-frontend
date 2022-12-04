import axios, {AxiosInstance} from 'axios';

export default class Api {
	private caller: AxiosInstance;

	constructor(params: { baseURL: any }) {
		this.caller = axios.create(params);
	}

	getToken() {
		return this.caller.defaults.headers.common['Authorization'];
	}

	setToken(jwtToken?: string) {
		this.caller.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
	}

	async get(resource: string, config?: object, root: boolean = false) {
		return await this.caller
			.get(resource, config)
			.then(res => root ? res : res.data)
			.catch(err => {
				console.error(err)
				throw err
			});
	}

	async post(resource: string, body?: object, config?: object) {
		return await this.caller
			.post(resource, body, config)
			.then(res => res.data)
			.catch(err => {
				console.error(err)
				throw err
			});
	}

	async put(resource: string, body?: object, config?: object) {
		return await this.caller
			.put(resource, body, config)
			.then(res => res.data)
			.catch(err => {
				console.error(err)
				throw err
			});
	}

	async patch(resource: string, body?: object, config?: object) {
		return await this.caller
			.patch(resource, body, config)
			.then(res => res.data)
			.catch(err => {
				console.error(err)
				throw err
			});
	}

	async delete(resource: string, config?: object) {
		return await this.caller
			.delete(resource, config)
			.then(res => res.data)
			.catch(err => {
				console.error(err)
				throw err
			});
	}

}

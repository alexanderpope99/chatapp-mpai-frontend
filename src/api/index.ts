import Api from './api';

const base = new Api({ baseURL: import.meta.env.VITE_API_URL });

export default {
	base,
}

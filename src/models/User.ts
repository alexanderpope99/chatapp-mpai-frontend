import axios from 'axios'
import api from "../api/index";

export default class User {
	id?: string = undefined
	username?: string = undefined
	firstName?: string = undefined
	lastName?: string = undefined
	lastSeen?: Date = undefined
	avatar?: string = undefined

	constructor(userResponse?: User) {
		if (!userResponse) return
		this.init(userResponse)
	}

	init(userResponse: User) {
		this.id = userResponse.id
		this.username = userResponse.username
		this.firstName = userResponse.firstName
		this.lastName = userResponse.lastName
		this.lastSeen = userResponse.lastSeen
		this.avatar = userResponse.avatar
	}

	async getUser() {
		let jwt = sessionStorage.getItem('jwt')
		if (jwt != null)
			api.base.setToken(jwt)
		await api.base.get('/users/whoami')
			.then(response => {
				this.init(response);
			})
		return this;
	}

	async login(username: string, password: string) {
		await api.base.post('/auth/login', {
			username: username,
			password: password
		})
			.then(response => {
				this.init(response);
				sessionStorage.setItem('jwt', response.token);
				api.base.setToken(response.token)
			})
	}

	async logout() {
		await api.base.get('/auth/logout')
			.then(response => {
				sessionStorage.removeItem('jwt');
				api.base.setToken(undefined);
			})
	}


	async register(username: string, firstName: string, lastName: string, password: string) {
		await api.base.post('/auth/register', {
			username: username,
			firstName: firstName,
			lastName: lastName,
			password: password
		})
	}

	getChats() {
		return api.base.get('/chats')
			.then(res => {
				return res
			})
	}

	createSimpleChat(username: string) {
		return api.base.post('/chats/simple', {
			username: username
		})
			.then(res => {
				return res
			})
	}

	createGroupChat(name: string, usernames: string[]) {
		return api.base.post('/chats/group', {
			name: name,
			usernames: usernames
		})
			.then(res => {
				return res
			})
	}

	getContacts() {
		return api.base.get('/users/contacts')
			.then(res => {
				return res
			})
	}

	addContact(username: string) {
		return api.base.post('/users/contacts', {
			username: username,
		})
			.then(res => {
				return res
			})
	}

	sendMessage(id: string, content: string) {
		return api.base.post(`/chats/${id}/message`, {
			content: content
		})
			.then(res => {
				return res
			})
	}
}

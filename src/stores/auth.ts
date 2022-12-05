import {defineStore} from 'pinia'
import UserModel from '../models/User'

export interface User {
	id: string
	username: string
	firstName: string
	lastName: string
	lastSeen: Date
	avatar: string
};

const useAuthStore = defineStore({
	id: 'authStore',
	state: () =>
		({
			user: new UserModel(),
			stompClient: undefined,
		}),
	actions: {
		async login(username: string, password: string) {
			return this.user.login(username, password)
		},
		async register(username: string, firstName: string, lastName: string, password: string) {
			return this.user.register(username, firstName, lastName, password)
		},
		logout() {
			return this.user.logout()
		},
		getUser() {
			this.user.getUser()
				.then(res => {
					return res;
				})
		},
		async getChats() {
			return this.user.getChats()
		},
		async createSimpleChat(username: string) {
			return this.user.createSimpleChat(username)
		},
		async createGroupChat(name: string, usernames: string[]) {
			return this.user.createGroupChat(name, usernames)
		},
		async getContacts() {
			return this.user.getContacts()
		},
		async addContact(username: string) {
			return this.user.addContact(username)
		},
		async sendMessage(chatId: string, content: string) {
			return this.user.sendMessage(chatId, content)
		}
	}
})

export default useAuthStore

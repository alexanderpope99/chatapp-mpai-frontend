import User from "./User";

export default class Chat {
	id?: string = undefined
	type?: string = undefined
	contacts: object[] = []
	admins?: string[] = []

	constructor(chatResponse?: Chat) {
		if (!chatResponse) return
		this.id = chatResponse.id
		this.type = chatResponse.type
		if (chatResponse.contacts) {
			this.contacts = [];
			for (let contact of chatResponse.contacts) {
				// @ts-ignore
				this.contacts.push(new User(contact))
			}
		}
		this.admins = chatResponse.admins
	}
}

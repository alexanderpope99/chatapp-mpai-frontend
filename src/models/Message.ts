import User from "./User";

export default class Message {
	id?: string = undefined
	content?: string = undefined
	date?: Date = undefined
	sender?: object = undefined
	replyTo?: string = undefined

	constructor(messageResponse?: Message) {
		if (!messageResponse) return
		this.id = messageResponse.id
		this.content = messageResponse.content
		this.date = messageResponse.date
		// @ts-ignore
		this.sender = new User(messageResponse.sender)
		this.replyTo = messageResponse.replyTo
	}
}

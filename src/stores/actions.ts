import useAuthStore from "./auth";

export const NOTIFICATIONS = [
	{
		flag: 'security',
		title: 'Recent Login',
		message: 'there was a recent login to you account from this device',

	},
	{
		flag: 'added-to-group',
		title: 'New Group',
		message: 'Your friend added you to a new group',

	},
	{
		flag: 'account-update',
		title: 'Password Reset',
		message: 'Your password has been restored successfully',

	},
	{
		flag: 'security',
		title: 'Recent Login',
		message: 'there was a recent login to you account from this device',

	},
	{
		flag: 'added-to-group',
		title: 'New Group',
		message: 'Your friend added you to a new group',

	},
];
export const fetchData = async () => {

	const auth = useAuthStore();
	await auth.getUser();
	const contacts = await auth.getContacts();
	const chats = await auth.getChats();

	return {
		data: {
			contacts: contacts,
			conversations: chats,
			notifications: NOTIFICATIONS,
		}
	};
};

export const updateAccount = async () => {

	return await {
		data: {
			detail: 'Your account has been updated successfully',
		}
	};
};

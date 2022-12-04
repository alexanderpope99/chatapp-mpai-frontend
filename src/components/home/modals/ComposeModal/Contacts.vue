<script setup lang="ts">
import useChatStore, {Contact} from '../../../../stores/chat';

import Loading1 from '../../../reusables/loading/Loading1.vue';
import SearchInput from '../../../reusables/SearchInput.vue';
import ContactItem from '../../Sidebar/Contacts/ContactItem.vue';
import NoContacts from "../../../reusables/emptyStates/NoContacts.vue";
import {computed} from "vue";
import PrimaryButton from '../../../reusables/PrimaryButton.vue';
import useAuthStore from "../../../../stores/auth";

const chat = useChatStore();

const newContacts = computed(() => {
	let contacts = []
	let contactIds = []
	//@ts-ignore
	let simpleChats = []
	if (chat.conversations)
		simpleChats = chat.conversations.filter(conversation => conversation.type === 'simple');

	//@ts-ignore
	for (let simpleChat of simpleChats) {
		contactIds.push(simpleChat.contacts[0].id)
		contactIds.push(simpleChat.contacts[1].id)
	}

	if (chat.contacts)
		for (let contact of chat.contacts)
			if (!contactIds.includes(contact.id))
				contacts.push(contact)

	return contacts
});

const startChat = () => {
	let username: string | never[] = []
	newContacts.value.forEach(function (contact, index) {
		//@ts-ignore
		if (document.getElementById('contact-item-' + index).classList.contains('bg-indigo-50'))
			username = contact.username
	});

	const store = useAuthStore()
	let conversations = chat.conversations;
	if (username)
		//@ts-ignore
		store.createSimpleChat(username)
			.then((res) => {
				//@ts-ignore
				conversations.push(res)

				//TODO nu se inchide modalul de compose
				chat.$patch({
					status: 'success',
					contacts: chat.contacts,
					conversations: conversations,
					notifications: chat.notifications,
				});
			})
}

const selectContact = (index: number) => {
	console.log(index)
	newContacts.value.forEach((contact, contactIndex) => {
		if (contactIndex === index) {
			//@ts-ignore
			document.getElementById('contact-item-' + contactIndex).classList.add('bg-indigo-50');
			//@ts-ignore
			document.getElementById('contact-item-' + contactIndex).classList.add('dark:bg-gray-600');
		} else {
			console.log("IL SCOT")
			//@ts-ignore
			document.getElementById('contact-item-' + contactIndex).classList.remove('bg-indigo-50');
			//@ts-ignore
			document.getElementById('contact-item-' + contactIndex).classList.remove('dark:bg-gray-600');
		}
	})
}
</script>

<template>
	<div>
		<!--search-->
		<div class="mx-5">
			<SearchInput :outline="true" />
		</div>

		<!--contacts-->
		<div class="overflow-y-scroll scrollbar scrollbar-hidden max-h-[200px] mb-5">
			<Loading1
				v-if="chat.status === 'loading'  || chat.delayLoading"
				v-for="item in 3"
			/>

			<ContactItem
				v-else-if="chat.status === 'success' && !chat.delayLoading && (chat.contacts as Contact[])?.length > 0"
				v-for="(contact, index) in newContacts" :key="index" :contact="contact"
				:id="'contact-item-' + index"
				@click="selectContact(index)"
			/>

			<NoContacts vertical v-else />
		</div>

		<div class="flex px-5 mt-5 pb-6">
			<div class="grow"></div>

			<!--next button-->
			<PrimaryButton
				@click="startChat"
				class="px-5 bg-indigo-400 hover:bg-indigo-500 active:bg-indigo-500 rounded"
			>
				Finish
			</PrimaryButton>
		</div>

	</div>
</template>

<script setup lang="ts">
import {onMounted, computed} from "vue";

import useChatStore from "../stores/chat";
import {fetchData} from "../stores/actions";

import Chat from "../components/home/Chat/Chat.vue";
import Navigation from "../components/home/Navigation/Navigation.vue";
import Sidebar from "../components/home/Sidebar/Sidebar.vue";
import useAuthStore from "../stores/auth";

import {EventSourcePolyfill} from 'event-source-polyfill';
import api from "../api/index";


const auth = useAuthStore();
const chat = useChatStore();

const registerSse = () => {
	const eventSource = new EventSourcePolyfill(import.meta.env.VITE_API_URL + '/chats/subscribe',
		{
			headers: {
				//@ts-ignore
				'Authorization': api.base.getToken()
			},
			heartbeatTimeout: 120000,
		});

	eventSource.addEventListener("ADDED_MESSAGE", async (event) => {
		await getData();
	});

	eventSource.onerror = (event) => {
		if (event.target.readyState === EventSource.CLOSED) {
			console.log("SSE closed (" + event.target.readyState + ")");
		}
		eventSource.close();
	};

	eventSource.onopen = () => {
		console.log("connection opened");
	};
};

// update home page state;
onMounted(async () => {
	await getData();

	registerSse();
});

const getData = async () => {
	chat.status = 'loading';

	setTimeout(() => {
		chat.delayLoading = false;
	});

	const request = await fetchData();

	chat.$patch({
		status: 'success',
		contacts: request.data.contacts,
		conversations: request.data.conversations,
		notifications: request.data.notifications,
	});
}

</script>

<template>
	<KeepAlive>
		<div class="xs:relative md:static h-full flex xs:flex-col md:flex-row overflow-hidden">
			<Navigation class="xs:order-1 md:-order-none" />
			<Sidebar class="xs:grow-1 md:grow-0 xs:overflow-y-scroll md:overflow-visible scrollbar-hidden" />
			<Chat />
		</div>
	</KeepAlive>
</template>

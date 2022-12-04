<script setup lang="ts">
import {
	CheckIcon,
	FaceSmileIcon,
	MicrophoneIcon,
	PaperAirplaneIcon,
	PaperClipIcon,
	XCircleIcon
} from "@heroicons/vue/24/outline";
import type {Ref} from "vue";
import {ref} from "vue";
import EmojiPicker from 'vue3-emoji-picker';

import useChatStore, {Conversation, Message} from "../../../../stores/chat";

import IconButton from "../../../reusables/IconButton.vue";
import PrimaryButton from "../../../reusables/PrimaryButton.vue";
import ScaleTransition from "../../../reusables/transitions/ScaleTransition.vue";
import Typography from "../../../reusables/Typography.vue";
import AttachmentsModal from "../../modals/AttachmentsModal/AttachmentsModal.vue";
import SelectedReply from "./SelectedReply.vue";

import '../../../../../node_modules/vue3-emoji-picker/dist/style.css'
import useSettingsStore from "../../../../stores/settings";
import useAuthStore from "../../../../stores/auth";
import router from "../../../../router/index";

const props = defineProps<{
	activeConversation?: Conversation,
	selectedMessageToReplyTo?: Message,
	removeMessageToReplyTo: () => void
}>();

const chat = useChatStore();
const settings = useSettingsStore();

let message: string = ''

// the content of the message
const content: Ref<string | null> = ref(null);

// open emoji picker.
const showPicker = ref(false);

// close picker when you click outside.
const handleClickOutside = (event: Event) => {
	let target = (event.target as HTMLElement);
	let parent = (target.parentElement as HTMLElement);

	if ((target && !target.classList.contains('toggle-picker-button')) && (parent && !parent.classList.contains('toggle-picker-button'))) {
		showPicker.value = false;
	}
};

const sendMessage = () => {
	if (message) {
		const store = useAuthStore()
		let conversations = chat.conversations;
		//@ts-ignore
		store.sendMessage(props.activeConversation?.id, message)
			.then((res) => {
				//@ts-ignore
				conversations = conversations.filter(conv => conv.id !== props.activeConversation?.id)
				console.log(res)
				conversations.push(res)

				chat.$patch({
					status: 'success',
					contacts: chat.contacts,
					conversations: conversations,
					notifications: chat.notifications,
				});

				message = ''

			})
	}
}
</script>

<template>
	<div>
		<!--selected reply display-->
		<div
			class="relative transition-all duration-200"
			:class="{'pt-[60px]': props.selectedMessageToReplyTo}"
		>
			<SelectedReply
				:selected-message-to-reply-to="props.selectedMessageToReplyTo"
				:remove-message-to-reply-to="removeMessageToReplyTo"
			/>
		</div>

		<div
			class="h-[80px] px-5 flex items-center" v-if="chat.status !== 'loading'"
			:class="[]"
		>

			<!--message textarea-->
			<div class="grow mr-5">
                <textarea
									cols="30"
									rows="1"
									placeholder="Write your message here"
									aria-label="Write your message here"
									class="resize-none py-[30px] w-full mr-5 outline-none text-sm text-black opacity-60
                    dark:text-white dark:opacity-70 font-normal leading-4 tracking-[0.16px] placeholder:text-black
                    placeholder:opacity-50 dark:placeholder:text-white dark:placeholder:opacity-70 bg-transparent"
									:class="settings.settings[0].settings[0].value ? ['scrollbar-dark'] : ['scrollbar']"
									v-model="message"
								></textarea>
			</div>

			<!--emojies-->
			<div class="relative">
				<!--emoji button-->
				<IconButton
					@click="showPicker = !showPicker"
					class="toggle-picker-button group w-7 h-7 mr-5"
					aria-label="toggle emoji picker"
				>
					<XCircleIcon
						v-if="showPicker"
						class=" w-[20px] h-[20px] text-gray-300 group-hover:text-indigo-300"
					/>
					<FaceSmileIcon
						v-else
						class="w-[20px] h-[20px] text-gray-300 group-hover:text-indigo-300"
					/>
				</IconButton>

				<!--emoji picker-->
				<ScaleTransition>
					<div
						v-click-outside="handleClickOutside" v-show="showPicker"
						class="absolute z-10 bottom-[45px] right-0 mt-2"
					>
						<div role="none">
							<EmojiPicker
								:native="true" hide-group-icons hide-group-names
								class="dark:bg-gray-800 dark:text-white"
							/>
						</div>
					</div>
				</ScaleTransition>
			</div>

			<!--send message button-->
			<button
				class="group w-7 h-7 flex justify-center items-center outline-none rounded-full focus:outline-none focus:bg-gray-50 hover:bg-gray-50 transition-all duration-200"
			>
				<PaperAirplaneIcon
					class="w-[20px] h-[20px] text-gray-300 group-hover:text-indigo-300"
					@click="sendMessage"
				/>
			</button>

		</div>
	</div>
</template>

<style>
input[placeholder="Search emoji"] {
	background: rgba(0, 0, 0, 0.0);
}

.v3-emoji-picker .v3-header {
	border-bottom: 0;
}

.v3-emoji-picker .v3-footer {
	border-top: 0;
}
</style>

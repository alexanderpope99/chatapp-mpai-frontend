<script setup lang="ts">
import PrimaryButton from "../../reusables/PrimaryButton.vue";
import TextInput from "../../reusables/TextInput.vue";
import Modal from "./Modal.vue";
import Typography from "../../reusables/Typography.vue";
import {computed, ref, Ref} from "vue";
import useAuthStore from "../../../stores/auth";
import useChatStore, {Contact, ContactGroup} from "../../../stores/chat";

const props = defineProps<{
    openModal: boolean,
    closeModal: () => void,
}>();

const chat = useChatStore()

let username: string = ''

let successMessage: Ref<string> = ref('');

let errorMessage: Ref<string> = ref('');

const addContact = () => {
	if (username) {
		successMessage.value = ''
		errorMessage.value = ''

		const store = useAuthStore()

		store.addContact(username)
			.then(() => {

				//TODO nu se da refresh la lista de contacte
				//TODO nu se inchide modalul de add-contact
				successMessage.value = 'Contact successfully added'
			})
			.catch(() => {
				errorMessage.value = 'User not found'
			})
	}
}
</script>

<template>
    <Modal :open="props.openModal" :closeModal="props.closeModal">
        <template v-slot:content>
            <div class="w-[300px] bg-white dark:bg-gray-800 rounded py-6">
                <!--modal header-->
                <div class="flex justify-between items-center px-5">
                    <Typography id="modal-title" variant="heading-1" class="-none" tabindex="0">
                        Add Contact
                    </Typography>

                    <button @click="props.closeModal"
                        class="group py-2 px-4 border rounded-sm border-gray-200
                        dark:border-white dark:border-opacity-70  focus:outline-none focus:border-red-100
                        focus:bg-red-100 hover:bg-red-100 hover:border-red-100 dark:hover:border-red-400
                         dark:hover:bg-red-400 dark:focus:bg-red-400 dark:focus:border-red-400 transition-all duration-200 outline-none"
                        aria-label="close dialog">

                        <Typography variant="body-4">x</Typography>
                    </button>
                </div>

                <!--text input-->
                <div class="px-5 pb-5 pt-6">
                    <TextInput type="text" placeholder="username" v-model="username" />
                </div>

							<div v-if="successMessage" class="flex justify-center mb-4">
								<Typography class="text-green-500 group-hover:text-green-500 text-1xl">
									{{ successMessage }}
								</Typography>
							</div>

							<div v-if="errorMessage" class="flex justify-center mb-4">
								<Typography variant="danger">
									{{ errorMessage }}
								</Typography>
							</div>

                <!--submit button-->
                <div class="px-5">
                    <PrimaryButton class="w-full py-4" @click="addContact">
                        Add
                    </PrimaryButton>
                </div>
            </div>
        </template>
    </Modal>
</template>

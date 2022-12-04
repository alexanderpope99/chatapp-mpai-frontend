<script setup lang="ts">
import {EyeSlashIcon} from "@heroicons/vue/24/outline";

import IconButton from "../../reusables/IconButton.vue";
import PrimaryButton from "../../reusables/PrimaryButton.vue";
import TextInput from "../../reusables/TextInput.vue";
import {onMounted, ref, Ref} from "vue";
import useAuthStore from "../../../stores/auth";
import router from "../../../router/index";

const props = defineProps<{
	username?: string,
	firstName?: string,
	lastName?: string,
}>();

let password: string = ''

let confirmedPassword: string = ''

let successMessage: Ref<string> = ref('');

let errorMessage: Ref<string> = ref('');

onMounted(() => {
	const passwordField = document.getElementById('password')
	if (passwordField) {
		passwordField.focus();
	}
});

const togglePasswordFieldType = () => {
	const passwordField = document.getElementById('password')
	if (passwordField) {
		if (passwordField.getAttribute('type') === 'password')
			passwordField.setAttribute('type', 'text')
		else passwordField.setAttribute('type', 'password')
		passwordField.focus()
	}
}

const toggleConfirmPasswordFieldType = () => {
	const passwordField = document.getElementById('confirm-password')
	if (passwordField) {
		if (passwordField.getAttribute('type') === 'password')
			passwordField.setAttribute('type', 'text')
		else passwordField.setAttribute('type', 'password')
		passwordField.focus()
	}
}

const register = () => {
	if (props.username && props.firstName && props.lastName && password && confirmedPassword) {
		successMessage.value = ''
		errorMessage.value = ''
		if (password != confirmedPassword) {
			errorMessage.value = 'Passwords do not match'
		} else {
			const authStore = useAuthStore()
			authStore.register(props.username, props.firstName, props.lastName, password)
				.then(async () => {
					successMessage.value = 'Registration successful'
					await new Promise(resolve => setTimeout(resolve, 2000));
					await router.push({path: '/access/sign-in'})
				})
				.then(() => {
				})
				.catch(() => {
					errorMessage.value = 'Username already taken'
				})
		}
	}
}
</script>

<template>
	<div>
		<!--form-->
		<div class="mb-6">
			<form @keyup.enter.native="register">
				<TextInput
					id="password"
					variant="bordered"
					label="Password"
					placeholder="Enter your password"
					class="mb-4"
					v-model="password"
					type="password"
					tabindex="1"
				>
				</TextInput>

				<TextInput
					id="confirm-password"
					variant="bordered"
					label="Confirm Password"
					placeholder="Enter your password"
					v-model="confirmedPassword"
					type="password"
					tabindex="2"
				>
				</TextInput>
			</form>
		</div>

		<div v-if="successMessage" class="flex justify-center mb-4">
			<Typography class="text-green-500 group-hover:text-green-500 text-1xl">
				{{ successMessage }}
			</Typography>
		</div>
		<div v-if="errorMessage" class="flex justify-center mb-4">
			<Typography class="text-red-400 group-hover:text-red-400 text-1xl">
				{{ errorMessage }}
			</Typography>
		</div>

		<!--controls-->
		<div class="mb-6">
			<PrimaryButton
				class="w-full mb-4"
				@click="register"
			>Sign up
			</PrimaryButton>
			<PrimaryButton
				variant="outlined" class="w-full"
				@click="$emit('active-section-change', { sectionName: 'personal-section', animationName: 'slide-right' })"
			>Back
			</PrimaryButton>
		</div>
	</div>
</template>

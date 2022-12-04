<script setup lang="ts">
import {EyeSlashIcon} from '@heroicons/vue/24/outline'
import {RouterLink} from 'vue-router'

import IconButton from '../../reusables/IconButton.vue'
import PrimaryButton from '../../reusables/PrimaryButton.vue'
import TextInput from '../../reusables/TextInput.vue'
import Typography from '../../reusables/Typography.vue'
import useAuthStore from '../../../stores/auth'
import {Ref, ref} from "vue";
import router from "../../../router/index";

let username: string = ''

let password: string = ''

let errorMessage: Ref<string> = ref('');

const togglePasswordFieldType = (event: Event) => {
	event.preventDefault();
	const passwordField = document.getElementById('password')
	if (passwordField) {
		if (passwordField.getAttribute('type') === 'password')
			passwordField.setAttribute('type', 'text')
		else passwordField.setAttribute('type', 'password')
		passwordField.focus()
	}
}

const login = () => {
	if (username && password) {
		const store = useAuthStore()
		store.login(username, password)
			.then(() => {
				router.push({path: '/'})
			})
			.catch(() => {
				errorMessage.value = 'Wrong username or password'
			})
	}
}
</script>

<template>
	<div>
		<div>
			<!--header-->
			<div class="mb-6 flex flex-col items-center">
				<Typography variant="heading-4" class="mb-4">Welcome</Typography>
				<Typography variant="body-3">enter your credentials to login</Typography>
			</div>

			<!--form-->
			<div class="mb-6">
				<form @submit.prevent="login">
					<TextInput
						id="username"
						variant="bordered"
						label="Username"
						placeholder="Enter your username"
						class="mb-4"
						v-model="username"
					/>
					<TextInput
						id="password"
						variant="bordered"
						label="Password"
						placeholder="Enter your password"
						v-model="password"
						type="password"
						@keyup.enter.prevent="login"
					>
						<template v-slot:endAdornment>
							<IconButton
								variant="ghost"
								class="p-4"
								@click="togglePasswordFieldType"
							>
								<EyeSlashIcon class="w-5 h-5 text-black opacity-50 dark:text-white dark:opacity-60" />
							</IconButton>
						</template>
					</TextInput>
				</form>
			</div>

			<!--controls-->
			<div class="mb-6">
				<PrimaryButton
					class="w-full"
					@click="login"
				>
					Sign in
				</PrimaryButton>
			</div>

			<div v-if="errorMessage" class="flex justify-center mb-4">
				<Typography variant="danger">
					{{ errorMessage }}
				</Typography>
			</div>

			<!--bottom text-->
			<div class="flex justify-center">
				<Typography variant="body-2">Don’t have an account ?
					<RouterLink to="/access/sign-up/" class="text-indigo-400 opacity-100">
						Sign up
					</RouterLink>
				</Typography>
			</div>
		</div>
	</div>

</template>

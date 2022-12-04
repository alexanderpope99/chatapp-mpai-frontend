<script setup lang="ts">
import PrimaryButton from '../../reusables/PrimaryButton.vue';
import TextInput from '../../reusables/TextInput.vue';
const emit = defineEmits(['active-section-change']);

let username: string = ''

let firstName: string = ''

let lastName: string = ''

const nextSection = () => {
	if(username && firstName && lastName)
		emit('active-section-change', {
			sectionName: 'password-section',
			animationName: 'slide-left',
			username: username,
			firstName: firstName,
			lastName: lastName
		})
}
</script>

<template>
	<div>
		<!--form-->
		<div class="mb-6">
			<form
				@keyup.enter.native="nextSection"
			>
				<TextInput
					variant="bordered"
					label="Username"
					placeholder="Enter your username"
					class="mb-4"
					v-model="username"
				/>

				<TextInput
					variant="bordered"
					label="First Name"
					placeholder="Enter your first name"
					class="mb-4"
					v-model="firstName"
				/>

				<TextInput
					variant="bordered"
					label="Last Name"
					placeholder="Enter your last name"
					class="mb-4"
					v-model="lastName"
				/>
			</form>
		</div>

		<!--controls-->
		<div class="mb-6">
			<PrimaryButton
				id="personal-section-next-button"
				@click="$emit('active-section-change', {
					sectionName: 'password-section',
					animationName: 'slide-left',
					username: username,
					firstName: firstName,
					lastName: lastName
				})"
				class="w-full mb-4"
			>Next
			</PrimaryButton>

		</div>
	</div>
</template>

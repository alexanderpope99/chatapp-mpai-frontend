<script setup lang="ts">

import useAuthStore, {User} from "../../../../stores/auth";
import {Contact} from "../../../../stores/chat";
import {getFullName} from "../../../../utils";

import Typography from "../../../reusables/Typography.vue";

defineEmits(['contactSelected']);

const props = defineProps<{
	contact: Contact,
	variant?: string,
	active?: boolean,
	unselectable?: boolean,
}>();

const auth = useAuthStore();
</script>

<template>
	<div>
		<component
			:is="props.variant === 'card' ? 'div' : 'a'"
			@click="props.variant === 'card' ? () => {} :$emit('contactSelected', props.contact)"
			href="#"
			class="w-full p-5 flex transition duration-200 ease-out outline-none"
			:class="{
            'hover:bg-indigo-50 active:bg-indigo-100 focus:bg-indigo-50 dark:hover:bg-gray-600 dark:focus:bg-gray-600':  props.variant !== 'card',
            'bg-indigo-50 dark:bg-gray-600': props.active
            }"
		>

			<!--profile image-->
			<div class="mr-4">
				<div
					:style=" { backgroundImage: `url(${props.contact.avatar})`}"
					class="w-7 h-7 rounded-full bg-cover bg-center"
				>
				</div>
			</div>
			<div class="w-full flex flex-col items-start">
				<div class="w-full mb-3 flex justify-between items-center">
					<!--contact name-->
					<component
						:is="props.variant === 'card' && !props.unselectable ? 'a' : 'div'"
						@click="props.variant === 'card' ? $emit('contactSelected', props.contact) : () => {}"
						href="#"
						class="flex items-center"
					>

						<Typography variant="heading-2">
							{{
								//@ts-ignore
								auth.user.id == props.contact.id ? 'You' : getFullName(props.contact)
							}}
						</Typography>

						<slot name="tag" />
					</component>

					<!--optional menu-->
					<div class="relative">
						<slot name="menu" />
					</div>
				</div>
			</div>

			<div class="h-full flex flex-col justify-center items-center">
				<slot name="checkbox"></slot>
			</div>
		</component>
	</div>
</template>

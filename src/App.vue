<script setup lang="ts">
import {computed, onMounted} from "vue";

import useSettingsStore from './stores/settings';

import FadeTransition from './components/reusables/transitions/FadeTransition.vue';
import api from "./api/index";

const settings = useSettingsStore();


onMounted(() => {
	if (sessionStorage.getItem('jwt') != null)
		api.base.setToken(sessionStorage.getItem('jwt') || undefined);
});
</script>

<template>
	<div :class="{ 'dark': settings.settings[0].settings[0].value }">
		<div
			class="bg-white dark:bg-gray-800 transition-all duration-500"
			:style="{ height: '100vh' }"
		>
			<router-view v-slot="{ Component }">
				<FadeTransition>
					<component :is="Component" />
				</FadeTransition>
			</router-view>
		</div>
	</div>
</template>

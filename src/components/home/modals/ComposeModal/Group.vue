<script setup lang="ts">
import {computed, Ref, ref} from "vue";

import GroupInfo from "./GroupInfo.vue";
import GroupMembers from "./GroupMembers.vue";
import SlideTransition from "../../../reusables/transitions/SlideTransition.vue";


defineEmits(['activePageChange']);

// used to determine whether to slide left or right
const animation = ref('slide-left');

// name of the active modal page
const activePageName = ref("group-info");

// the active page component
const ActivePage = computed(() => {
	if (activePageName.value === 'group-info')
		return GroupInfo;
	else if (activePageName.value === 'group-members')
		return GroupMembers;
});

// event to move between modal pages
const changeActiveTab = (event: { tabName: string, animationName: string, name: string }) => {
	animation.value = event.animationName;
	activePageName.value = event.tabName;
	name.value = event.name;
};

let name: Ref<string> = ref('');
const groupProps = computed(() => {
	if (activePageName.value === 'group-members') {
		return {
			name: name,
		}
	}
})
</script>

<template>
	<div>
		<!--content-->
		<div class="overflow-x-hidden">
			<SlideTransition :animation="animation">
				<component
					v-bind="groupProps"
					@active-page-change="changeActiveTab"
					:is="ActivePage"
					:key="activePageName"
				/>
			</SlideTransition>
		</div>
	</div>
</template>

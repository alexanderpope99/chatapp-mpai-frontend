<script setup lang="ts">
import { CalendarIcon, PhoneArrowUpRightIcon, PhoneArrowDownLeftIcon, PhoneXMarkIcon, UserGroupIcon } from "@heroicons/vue/24/outline";
import { computed } from "vue";

import { Call } from "../../../../stores/chat";

import InfoItem from "../../../reusables/InfoItem.vue";
import Typography from "../../../reusables/Typography.vue";

const props = defineProps<{
    call: Call,
    closeModal: () => void
}>();

const CallStatusIcon = computed(() => {
    if (props.call) {
        if (props.call.status === 'received') {
            return PhoneArrowDownLeftIcon;
        } else if (props.call.status === 'missed') {
            return PhoneXMarkIcon;
        } else if (props.call.status === 'sent') {
            return PhoneArrowUpRightIcon
        }
    }
});
</script>

<template>
    <div>
        <!--modal header-->
        <div class="px-5 flex justify-between items-center ">
            <Typography id="modal-title" variant="heading-1" class="-none" tabindex="0">
                Call Details
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

        <div class="w-full py-7">
            <div class="px-5 pb-5 flex items-center">
                <InfoItem :icon="CalendarIcon" :title="(props.call as Call)?.date" />
            </div>

            <div class="px-5 pb-5 flex items-center">
                <InfoItem :icon="CallStatusIcon" :title="(props.call as Call)?.status" />
            </div>

            <div class="px-5 flex items-center">
                <InfoItem :icon="UserGroupIcon" title="members" link chevron
                    @click="$emit('active-page-change', {tabName: 'call-members', animationName: 'slide-left'})" />
            </div>
        </div>

    </div>
</template>

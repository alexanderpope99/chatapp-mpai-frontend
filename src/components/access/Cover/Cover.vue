<script setup lang="ts">
import useSettingsStore from "../../../stores/settings";

import Typography from "../../reusables/Typography.vue";


const settings = useSettingsStore();
</script>

<template>
    <div class="flex flex-col  "
        :class="settings.settings[0].settings[0].value ? ['bg-gray-900'] : ['animate-gradient bg-[length:200%_200%] bg-gradient-to-b from-[#B0B7F9] to-[#162CD4]']">
        <img src="../../../assets/logo.png" class="w-[230px] h-[250px] opacity-70" />

			<Typography variant="display" :no-color="true" class="text-white opacity-70 mb-6">ChatApp MPAI</Typography>
			<Typography variant="heading-5" class="text-white opacity-40">Ilie Andrei-Valentin</Typography>
			<Typography variant="heading-5" class="text-white opacity-40">Lupu Andy-Constantin</Typography>
			<Typography variant="heading-5" class="text-white opacity-40">Orzan Teodora-Diana</Typography>
			<Typography variant="heading-5" class="text-white opacity-40">Pop Alexandru</Typography>
    </div>
</template>

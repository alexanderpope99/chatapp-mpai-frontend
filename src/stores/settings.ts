import {defineStore} from "pinia";
import {ref, Ref} from "vue";
import {DefaultSettings} from "./defaultSettings";

export interface Setting {
	id: number,
	type: string,
	value?: boolean | string | File,
	title: string,
	description?: string,
};

export interface Settings {
	id: number,
	title: string,
	description?: string,
	settings: Setting[],
};

const useSettingsStore = defineStore("settings", () => {

	const settings: Ref<Settings[]> = ref(DefaultSettings); // not fetched

	return {
		settings
	}
})

export default useSettingsStore;

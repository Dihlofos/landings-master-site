<script setup lang="ts">
import { ref } from 'vue';
import UsersForm from '@/components/users/UsersForm';
import useUserStore from '@/stores/users';

import { ROUTES } from '@/constants/routes';

import type { IUserUpdate } from '@/services/api/users';

definePageMeta({
	middleware: 'auth',
	layout: 'simple',
});

const userStore = useUserStore();

const isLoading = ref<boolean>(false);

async function createUser(user: IUserUpdate) {
	try {
		isLoading.value = true;
		await userStore.createUser(user);
	} catch (e: unknown) {
		console.log('error', e);
	} finally {
		isLoading.value = false;
		await navigateTo(ROUTES.Users);
	}
}
</script>

<template>
	<div class="new-user">
		<UsersForm
			:is-loading="isLoading"
			@change="createUser"
		/>
	</div>
</template>

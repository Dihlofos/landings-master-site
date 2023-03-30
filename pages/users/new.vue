<script setup lang="ts">
import { ref } from 'vue';
import UsersForm from '@/components/users/UsersForm.vue';
import useUserStore from '@/stores/users';
import UiTitle from '@/components/ui/ui-title.vue';

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
		<div class="container">
			<UiTitle class="new-user__title">Create new user</UiTitle>
			<UsersForm
				:is-loading="isLoading"
				@change="createUser"
			/>
		</div>
	</div>
</template>

<style lang="scss">
.new-user {
	.container {
		max-width: 40rem;
	}
	&__title {
		font-size: 4rem;
		margin: 0 0 2rem;
		text-transform: uppercase;
	}
}
</style>

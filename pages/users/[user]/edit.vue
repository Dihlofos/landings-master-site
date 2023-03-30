<script setup lang="ts">
import { ref } from 'vue';
import UsersForm from '@/components/users/UsersForm.vue';
import UiTitle from '@/components/ui/ui-title.vue';

import useUserStore from '@/stores/users';
import { IUserUpdate } from '@/services/api/users';

const route = useRoute();

definePageMeta({
	middleware: 'auth',
	layout: 'simple',
});

const userStore = useUserStore();

const isLoading = ref<boolean>(false);

async function updateUser(user: IUserUpdate) {
	// try {
	// 	isLoading.value = true;
	// 	await userStore.updateUser(user);
	// } catch (e: unknown) {
	// 	console.log('error', e);
	// } finally {
	// 	isLoading.value = false;
	// 	await navigateTo(ROUTES.Users);
	// }
}

function created() {
	console.log('route', route.params);
}

created();
</script>

<template>
	<div class="edit-user">
		<div class="container">
			<UiTitle class="new-user__title">Edit user</UiTitle>
			<UsersForm
				:is-loading="isLoading"
				@change="updateUser"
			/>
		</div>
	</div>
</template>

<style lang="scss">
.edit-user {
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

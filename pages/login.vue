<script setup lang="ts">
import UiInput from '@/components/ui/ui-input.vue';
import UiButton from '@/components/ui/ui-button.vue';
import IconSpinner from '@/components/icons/IconSpinner.vue';
import UiTitle from '@/components/ui/ui-title.vue';
import useUserStore from '@/stores/users';
import { ref } from 'vue';
import { ROUTES } from '@/constants/routes';

definePageMeta({
	middleware: 'auth',
	layout: 'simple',
});

const username = ref<string>('');
const password = ref<string>('');
const isLoading = ref<boolean>(false);

const userStore = useUserStore();

async function login() {
	try {
		isLoading.value = true;
		await userStore.login({ username: username.value, password: password.value });
	} catch (e: unknown) {
		console.log('error', e);
	} finally {
		isLoading.value = false;
		await navigateTo(ROUTES.Landings);
	}
}
</script>

<template>
	<div class="login">
		<div class="container">
			<form
				class="login__form"
				method="#"
				@submit.prevent="login"
			>
				<UiTitle class="login__title">Log in, hire up, loser!</UiTitle>
				<UiInput
					v-model="username"
					class="login__field"
					name="email"
					label="User Name"
					required
					:disabled="isLoading"
				/>
				<UiInput
					v-model="password"
					class="login__field"
					name="password"
					label="Password"
					type="password"
					required
					:disabled="isLoading"
				/>
				<UiButton
					class="login__submit"
					theme="transparent"
					type="submit"
					:disabled="isLoading"
				>
					<IconSpinner v-if="isLoading" />
					<template v-else>Let's go!</template>
				</UiButton>
			</form>
		</div>
	</div>
</template>

<style lang="scss">
.login {
	.container {
		max-width: 40rem;
	}

	&__title {
		font-size: 4rem;
		margin: 0 0 2rem;
		text-transform: uppercase;
	}

	&__field {
		margin: 0 0 2rem;
	}

	&__submit {
		width: 100%;
		text-align: center;
		font-size: 1.6rem;
		justify-content: center;

		svg {
			width: 2rem;
			height: 2rem;
		}
	}
}
</style>

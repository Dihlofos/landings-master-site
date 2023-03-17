<script setup lang="ts">
import UiInput from '@/components/ui/ui-input.vue';
import UiButton from '@/components/ui/ui-button.vue';
import IconSpinner from '@/components/icons/IconSpinner.vue';
import AdminTitle from '@/components/admin/AdminTitle.vue';
import useAdminStore from '@/stores/admin';
import { ref } from 'vue';
import { ROUTES } from '@/constants/routes';

definePageMeta({
	middleware: 'auth',
});

const username = ref<string>('');
const password = ref<string>('');
const isLoading = ref<boolean>(false);

const adminStore = useAdminStore();

async function login() {
	try {
		isLoading.value = true;
		await adminStore.login({ username: username.value, password: password.value });
	} catch (e: unknown) {
		console.log('error', e);
	} finally {
		isLoading.value = false;
		await navigateTo(ROUTES.Admin);
	}
}
</script>

<template>
	<div class="admin-panel-login">
		<main class="admin-panel-login__main">
			<div class="container">
				<form
					class="admin-panel-login__form"
					method="#"
					@submit.prevent="login"
				>
					<AdminTitle>Форма авторизации</AdminTitle>
					<UiInput
						v-model="username"
						class="admin-panel-login__field"
						name="email"
						label="User Name"
						required
						:disabled="isLoading"
					/>
					<UiInput
						v-model="password"
						class="admin-panel-login__field"
						name="password"
						label="Password"
						type="password"
						required
						:disabled="isLoading"
					/>
					<UiButton
						class="admin-panel-login__submit"
						theme="transparent"
						type="submit"
						:disabled="isLoading"
					>
						<IconSpinner v-if="isLoading" />
						<template v-else>Авторизоваться</template>
					</UiButton>
				</form>
			</div>
		</main>
		<footer class="admin-panel-login__footer">
			<div class="container">
				<a
					href="https://t.me/junepaik"
					target="_blank"
					>@junepaik</a
				>
				<a
					href="https://github.com/Dihlofos/vue-template"
					target="_blank"
					>https://github.com/Dihlofos/vue-template</a
				>
			</div>
		</footer>
	</div>
</template>

<style lang="scss">
.admin-panel-login {
	padding-top: 81px;
	height: 100%;
	display: flex;
	flex-direction: column;
	flex-grow: 1;

	&__main {
		.container {
			max-width: 40rem;
		}
	}

	&__title {
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

	&__main {
		flex-grow: 1;
		padding: 2rem;
	}

	&__footer {
		width: 100%;
		background-color: $darkblue;
		padding: 2rem;

		.container {
			display: flex;
			justify-content: space-between;
		}

		a {
			color: $white;
			transition: color 0.2s ease-in-out;

			&:hover {
				color: $pink;
			}
		}
	}
}
</style>

<script setup lang="ts">
import UiInput from '@/components/ui/ui-input.vue';
import UiButton from '@/components/ui/ui-button.vue';
import IconSpinner from '@/components/icons/IconSpinner.vue';
import UiTitle from '@/components/ui/ui-title.vue';
import { ref, reactive } from 'vue';
import { IUserCreate } from '@/services/api/users';

interface IUserFormProps {
	username?: string;
	firstname?: string;
	lastname?: string;
	email?: string;
	isLoading?: boolean;
}

const props = withDefaults(defineProps<IUserFormProps>(), {
	username: '',
	firstname: '',
	lastname: '',
	email: '',
});

const emit = defineEmits(['change']);

const user = reactive<IUserCreate>({
	username: props.username,
	firstname: props.firstname,
	lastname: props.lastname,
	password: '',
	email: props.email,
});

const passwordSecond = ref<string>('');

const isPasswordsError = ref<boolean>(false);

async function changeUser() {
	if (!validate()) return;
	emit('change', user);
}

function validate() {
	if (user.password !== passwordSecond.value) {
		isPasswordsError.value = true;
		return false;
	} else {
		isPasswordsError.value = false;
		return true;
	}
}
</script>

<template>
	<div class="user-form">
		<div class="container">
			<form
				class="user-form__form"
				method="#"
				@submit.prevent="changeUser"
			>
				<UiTitle class="user-form__title">Create new user</UiTitle>
				<UiInput
					v-model="user.username"
					class="user-form__field"
					name="username"
					label="User Name"
					required
					:disabled="props.isLoading"
				/>
				<UiInput
					v-model="user.firstname"
					class="user-form__field"
					name="firstname"
					label="First Name"
					:disabled="props.isLoading"
				/>
				<UiInput
					v-model="user.lastname"
					class="user-form__field"
					name="lastname"
					label="Last Name"
					:disabled="props.isLoading"
				/>
				<UiInput
					v-model="user.email"
					class="user-form__field"
					name="email"
					label="Email"
					type="email"
					required
					:disabled="props.isLoading"
				/>
				<UiInput
					v-model="user.password"
					class="user-form__field"
					name="password"
					label="Password"
					type="password"
					required
					:disabled="props.isLoading"
				/>
				<UiInput
					v-model="passwordSecond"
					class="user-form__field"
					name="passwordSecond"
					label="Password once again"
					type="password"
					:disabled="props.isLoading"
				/>
				<div
					v-if="isPasswordsError"
					class="user-form__password-error"
				>
					Пароли не одинаковые, проверьте правильность введенных паролей
				</div>
				<UiButton
					class="user-form__submit"
					theme="transparent"
					type="submit"
					:disabled="props.isLoading"
				>
					<IconSpinner v-if="props.isLoading" />
					<template v-else>Let's go!</template>
				</UiButton>
			</form>
		</div>
	</div>
</template>

<style lang="scss">
.user-form {
	.container {
		max-width: 40rem;
	}

	&__password-error {
		color: $yellow;
		margin: 0 0 2rem;
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

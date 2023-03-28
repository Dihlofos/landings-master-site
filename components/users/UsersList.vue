<script setup lang="ts">
import useUserStore from '@/stores/users';
import useLandingsStore from '@/stores/landings';
import UiButton from '@/components/ui/ui-button.vue';
import UiSelect from '@/components/ui/ui-select.vue';
import UiMultiSelect from '@/components/ui/ui-multi-select.vue';
import UiCheckbox from '@/components/ui/ui-checkbox.vue';

import IconDelete from '@/components/icons/IconDelete.vue';
import { IUser } from '@/services/api/users';

const userStore = useUserStore();
const landingStore = useLandingsStore();

function created(): void {
	userStore.fetchUsers();
	landingStore.fetchLandings();
}

async function onDelete(name: string) {
	await userStore.deleteUser(name);
	await userStore.fetchUsers();
}

async function onChange(user: IUser) {
	await userStore.updateUser(user);
	await userStore.fetchUsers();
}

async function onMultiChange(name: string) {
	await userStore.changeUserSites(name);
}

created();
</script>

<template>
	<ul class="users-list">
		<li class="users-list__item">
			<div class="users-list__item-id">ID</div>
			<div class="users-list__item-name">Username</div>
			<div class="users-list__item-sites">Sites</div>
			<div class="users-list__item-role">Role</div>
			<div class="users-list__item-actions"><span>Delete</span> <span>Enable</span></div>
		</li>
		<li
			class="users-list__item"
			v-for="item in userStore.users"
			:key="item.id"
		>
			<div class="users-list__item-id">{{ item.id }}</div>
			<span class="users-list__item-name">{{ item.username }} </span>
			<div class="users-list__item-sites">
				<UiMultiSelect
					v-model="userStore.usersSites[item.username]"
					key-props="name"
					:name="`${item.username}-site-multiselect`"
					:options="landingStore.landingsOptions"
					@change="onMultiChange(item.username)"
				/>
			</div>
			<div class="users-list__item-role">
				<UiSelect
					v-model="item.role"
					:name="`${item.username}_${item.id}_role`"
					:options="userStore.roles"
					@change="onChange(item)"
				/>
			</div>
			<div class="users-list__item-actions">
				<UiButton @click="onDelete(item.username)">
					<IconDelete />
				</UiButton>
				<UiCheckbox
					v-model="item.enabled"
					:name="`${item.username}_${item.id}_enabled`"
					@change="onChange(item)"
				/>
			</div>
		</li>
	</ul>
</template>

<style lang="scss">
.users-list {
	list-style: none;
	padding: 0;
	margin: 0;
	max-width: 100rem;
	margin: 0 auto;

	&__item-id {
		width: 2rem;
		padding: 1rem;
	}

	&__item-role,
	&__item-sites {
		padding: 1rem;
		width: 17rem;
	}

	&__item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
		border: 1px solid $white;

		&:first-child {
			background-color: $darkblue;
		}
	}

	&__item-name {
		flex-grow: 1;
		color: $white;
		text-decoration: none;
		padding: 1rem;

		&:hover {
			color: $pink;
		}
	}

	&__item-actions {
		display: flex;
		align-items: center;
		justify-content: space-around;
		gap: 1rem;
		width: 16rem;
		border-left: 1px solid $white;
		padding: 1rem;

		svg {
			width: 2.5rem;
			height: 2.5rem;
		}
	}
}
</style>

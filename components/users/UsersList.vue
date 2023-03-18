<script setup lang="ts">
import useUserStore from '@/stores/users';
import UiButton from '@/components/ui/ui-button.vue';

import IconDelete from '@/components/icons/IconDelete.vue';

const userStore = useUserStore();

function created(): void {
	userStore.fetchUsers();
}

async function onDelete(name: string) {
	console.log('delete', name);
}

created();
</script>

<template>
	<ul class="users-list">
		<li class="users-list__item">
			<div class="users-list__item-id">ID</div>
			<div class="users-list__item-name">Username</div>
			<div class="users-list__item-role">Role</div>
			<div class="users-list__item-actions">Actions</div>
		</li>
		<li
			class="users-list__item"
			v-for="item in userStore.users"
			:key="item.id"
		>
			<div class="users-list__item-id">{{ item.id }}</div>
			<span class="users-list__item-name">{{ item.username }} </span>
			<div class="users-list__item-role">{{ item.role }}</div>
			<div class="users-list__item-actions">
				<UiButton @click="onDelete(item.username)">
					<IconDelete />
				</UiButton>
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

	&__item-role {
		padding: 1rem;
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
		justify-content: center;
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

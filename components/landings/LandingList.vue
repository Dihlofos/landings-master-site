<script setup lang="ts">
import useLandingsStore from '@/stores/landings';
import UiButton from '@/components/ui/ui-button.vue';

import IconUpload from '@/components/icons/IconUpload.vue';
import IconDelete from '@/components/icons/IconDelete.vue';
import IconDownload from '@/components/icons/IconDownload.vue';
import { BASE_URL } from '@/constants/index';
import { getFileFromComputer, saveFile } from '@/utils';

const landingsStore = useLandingsStore();

function created(): void {
	landingsStore.fetchLandings();
}

function onDownload(name: string): void {
	const link = `${BASE_URL}/siteAsFile/${name}`;
	saveFile(link);
}

function onUpload(): void {
	getFileFromComputer(async (file: File) => {
		await landingsStore.updateLanding(file);
		await landingsStore.fetchLandings();
	}, 'application/json');
}

async function onDelete(name: string) {
	await landingsStore.deleteLanding(name);
	await landingsStore.fetchLandings();
}

created();
</script>

<template>
	<ul class="landing-list">
		<li class="landing-list__item">
			<div class="landing-list__item-id">ID</div>
			<div class="landing-list__item-name">LINK</div>
			<div class="landing-list__item-description">Description</div>
			<div class="landing-list__item-actions">Actions</div>
		</li>
		<li
			class="landing-list__item"
			v-for="item in landingsStore.landings"
			:key="item.id"
		>
			<div class="landing-list__item-id">{{ item.id }}</div>
			<a
				class="landing-list__item-name"
				:href="item.baseUrl"
				>{{ item.name }}
			</a>
			<div class="landing-list__item-description">{{ item.description }}</div>
			<div class="landing-list__item-actions">
				<UiButton @click="onDownload(item.name)">
					<IconDownload />
				</UiButton>
				<UiButton @click="onUpload">
					<IconUpload />
				</UiButton>
				<UiButton @click="onDelete(item.name)">
					<IconDelete />
				</UiButton>
			</div>
		</li>
	</ul>
</template>

<style lang="scss">
.landing-list {
	list-style: none;
	padding: 0;
	margin: 0;
	max-width: 100rem;
	margin: 0 auto;

	&__item-id {
		width: 2rem;
		padding: 1rem;
	}

	&__item-description {
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

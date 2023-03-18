<script setup lang="ts">
import useLandingsStore from '@/stores/landings';
import { getFileFromComputer } from '@/utils';

import UiButton from '@/components/ui/ui-button.vue';
import IconUpload from '@/components/icons/IconUpload.vue';

const landingsStore = useLandingsStore();

function onUpload(): void {
	getFileFromComputer(async (file: File) => {
		await landingsStore.createLanding(file);
		await landingsStore.fetchLandings();
	}, 'application/json');
}
</script>

<template>
	<header class="landings-header">
		<div class="landings-header__wrapper">
			<h1 class="landings-header__title">Работа с сайтами</h1>
			<UiButton
				class="landings-header__create-button"
				@click="onUpload"
			>
				<IconUpload />
				Загрузить новый сайт
			</UiButton>
		</div>
	</header>
</template>

<style lang="scss">
.landings-header {
	position: fixed;
	width: 100%;
	padding: 2rem;
	top: 0;
	left: 0;
	background-color: $darkblue;
	color: white;
	z-index: 20;

	&__create-button {
		svg {
			width: 2rem;
			height: 2rem;
		}
	}

	&__wrapper {
		display: flex;
		align-items: center;
		width: 100%;
	}

	&__title {
		color: $white;
		flex-grow: 1;
		text-align: center;
		margin: 0;
		font-size: 2.6rem;
	}

	&__action-buttons {
		display: flex;
		gap: 2rem;
	}
}
</style>

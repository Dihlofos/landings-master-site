<script setup>
import SiteFooter from '@/components/shared/SiteFooter.vue';
</script>

<template>
	<div class="page">
		<main class="page__main">
			<slot />
		</main>
		<SiteFooter />
	</div>
</template>

<script setup>
import SiteFooter from '@/components/shared/SiteFooter.vue';
import LandingHeader from '@/components/landings/LandingHeader.vue';
</script>

<template>
	<div class="page">
		<LandingHeader />
		<main class="page__main">
			<slot />
		</main>
		<SiteFooter />
	</div>
</template>

<script setup>
import SiteFooter from '@/components/shared/SiteFooter.vue';
import LandingHeader from '@/components/landings/LandingHeader.vue';
import SiteNav from '@/components/shared/SiteNav.vue';
</script>

<template>
	<div class="page">
		<LandingHeader />
		<div class="container">
			<main class="page__main">
				<SiteNav class="page__nav" />
				<div class="page__content">
					<slot />
				</div>
			</main>
		</div>
		<SiteFooter />
	</div>
</template>

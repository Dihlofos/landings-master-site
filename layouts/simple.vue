<script setup>
import SiteFooter from '@/components/shared/SiteFooter.vue';
</script>

<template>
	<div class="page">
		<div class="container">
			<main class="page__main">
				<div class="page__content">
					<slot />
				</div>
			</main>
		</div>
		<SiteFooter />
	</div>
</template>

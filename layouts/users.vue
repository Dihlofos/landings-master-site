<script setup>
import SiteFooter from '@/components/shared/SiteFooter.vue';
import SiteNav from '@/components/shared/SiteNav.vue';
import UsersHeader from '@/components/users/UsersHeader.vue';
</script>

<template>
	<div class="page">
		<UsersHeader />
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

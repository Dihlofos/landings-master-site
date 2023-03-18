<script setup lang="ts">
import LandingList from '@/components/landings/LandingList.vue';

definePageMeta({
	middleware: 'auth',
	layout: 'landings',
});
</script>

<template>
	<LandingList />
</template>

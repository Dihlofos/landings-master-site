<script setup lang="ts">
import UsersList from '@/components/users/UsersList.vue';

definePageMeta({
	middleware: 'auth',
	layout: 'default',
});
</script>

<template>
	<UsersList />
</template>

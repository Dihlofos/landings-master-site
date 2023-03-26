<script setup lang="ts">
import { RouteRecordNormalized } from 'vue-router';
import { RouteLabel, ROUTES } from '@/constants/routes';
import useUsersStore from '@/stores/users';

const router = useRouter();
const route = useRoute();

const usersStore = useUsersStore();

type IRoutesToShow = (RouteRecordNormalized & { isActive: boolean })[];

const routesToShow = computed(
	(): IRoutesToShow =>
		router
			.getRoutes()
			.filter(({ name }) => name !== 'login')
			.map((route: RouteRecordNormalized) => ({
				...route,
				isActive: false,
			})),
);

function onExit() {
	usersStore.exit();
	router.push(ROUTES.Login);
}
</script>

<template>
	<aside class="site-nav">
		<ul class="site-nav__list">
			<li
				class="site-nav__item"
				v-for="showRoute in routesToShow"
				:key="showRoute.path"
			>
				<NuxtLink
					class="site-nav__link"
					:href="showRoute.path"
					>{{ RouteLabel[showRoute.path] }}</NuxtLink
				>
			</li>
			<li class="site-nav__item site-nav__item--exit">
				<button
					class="site-nav__link"
					@click="onExit"
				>
					Выход
				</button>
			</li>
		</ul>
	</aside>
</template>

<style lang="scss">
.site-nav {
	width: 250px;
	border-right: 1px solid $white;
	padding: 0 30px 0 0;

	&__list {
		list-style: none;
	}

	&__item {
		padding: 0;

		&--exit {
			border-top: 1px solid $white;
			margin-top: 2rem;
			padding-top: 0.5rem;
		}
	}

	&__link {
		display: block;
		padding: 5px 0;
		text-decoration: none;
		border: none;
		background: none;
		color: $white;
		font-size: 1.6rem;
		line-height: 2.1rem;
		cursor: pointer;

		&:hover {
			color: $pink;
		}
	}
}
</style>

<template>
	<footer class="site-footer">
		<a
			href="https://t.me/junepaik"
			target="_blank"
			>@junepaik</a
		>
		<a
			href="https://github.com/Dihlofos/landings-master-site"
			target="_blank"
			>https://github.com/Dihlofos/landings-master-site</a
		>
	</footer>
</template>

<style lang="scss">
.site-footer {
	background-color: $darkblue;
	padding: 2rem;
	display: flex;
	justify-content: space-between;

	a {
		color: $white;
		transition: color 0.2s ease-in-out;

		&:hover {
			color: $pink;
		}
	}
}
</style>

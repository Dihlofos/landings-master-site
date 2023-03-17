// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	routeRules: {
		'/admin/**': { ssr: false },
		'/': { redirect: '/admin' },
	},

	css: ['@/assets/styles/index.scss'],
	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `
					    @import "@/assets/styles/_vars.scss";
					    @import "@/assets/styles/_colors.scss";
				`,
				},
			},
		},
	},
	modules: ['@pinia/nuxt', ['@nuxtjs/eslint-module', { lintOnStart: false }]],
});

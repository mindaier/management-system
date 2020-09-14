<template>
	<div class="app">
		<router-view> </router-view>
	</div>
</template>

<script>
export default {
	data() {
		return {};
	},
	created() {
		// let _url = process.env.VUE_APP_URL;
		// alert(_url);
	},
	mounted() {},
	methods: {},
};
</script>

<style lang="less">
body,
html {
	height: 100%;
}
* {
	padding: 0;
	margin: 0;
	box-sizing: border-box;
	list-style: none;
}
.app {
	height: 100%;
}

#nprogress .spinner {
	display: none !important;
}
</style>

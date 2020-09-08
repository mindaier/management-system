<template>
	<div class="login">
		<div class="left"></div>
		<img src="@/assets/login-right.png" alt="" />
	</div>
</template>

<script>
export default {
	data() {
		return {};
	},
	created() {},
	mounted() {},
	methods: {},
};
</script>

<style scoped lang="less">
.login {
	background: linear-gradient(#1493fa 28%, #01c6fa 96%);
	height: 100%;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-around;
	.left {
		width: 478px;
		height: 550px;
		background-color: #f5f5f5;
	}
}
</style>

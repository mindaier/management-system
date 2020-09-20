<template>
	<div class="selectItem">
		<div v-if="form.type == 1">
			<div class="item" v-for="(item, index) in form.select_options" :key="index">
				<el-radio
					v-model="form.single_select_answer"
					:label="item.label"
					@change="itemChange('single_select_answer')"
				>{{ item.label }}</el-radio>
				<el-input v-model="item.text"></el-input>
				<!-- <upload @input="getSrc" :value="value"></upload> -->
				<upload v-model="item.image" type="img"></upload>
			</div>
		</div>
		<div v-else-if="form.type == 2">
			<div class="item" v-for="(item, index) in form.select_options" :key="index">
				<el-checkbox v-model="form.multiple_select_answer" :label="item.label">{{item.label}}</el-checkbox>
				<el-input v-model="item.text"></el-input>
				<upload v-model="item.image" type="img"></upload>
			</div>
		</div>
		<div v-else>
			<div class="item">
				<el-input type="textarea" :rows="4" v-model="form.short_answer"></el-input>
				<!-- <upload v-model="item.image" type="img"></upload> -->
			</div>
		</div>
	</div>
</template>

<script>
import upload from "@/components/upload.vue";
export default {
	props: ["form"],
	components: {
		upload,
	},
	data() {
		return {
			image: "",
		};
	},
	created() {},
	mounted() {},
	methods: {
		getSrc(imgSrc) {
			this.image = imgSrc;
		},
		itemChange(msg) {
			//调用el-form表单的验证validateField(或者调用父组件一个验证方法)
			this.$emit("sonItem", msg);
		},
	},
};
</script>

<style lang="less">
.selectItem {
	.item {
		display: flex;
		align-items: center;
	}
}
</style>

<template>
<input :type="type" :name="name" :id="id" :title="title" :class="cssClass" :ref="name" v-if="inputtype" @keyup.13="$emit('jsKeyup13')" @input="updateVueModel"/>
<textarea :name="name" :title="title" :id="id" :class="cssClass" :ref="name" v-else @input="updateVueModel"></textarea>
</template>
<script>
export default {
	props: ['type', 'name', 'title', 'id', 'cssClass', 'cssStyle'],
	computed: {
		inputtype() {
			switch (this.type) {
				case 'textarea':
					return false;
					break;
				default:
					return true;
			}
		}
	},
	methods: {
		updateVueModel(e) {
			switch (this.type) {
				case 'checkbox':
					this.$emit('js-checked', this.title, this.$el);
					break;
				default:
					this.$emit('v-model', this.$el.value, this.$refs ,this.$el);

			}
		}
	},
	mounted() {}
}
</script>
<style scoped="">
textarea {
	height: 80px;
	resize: none;
	line-height: 1.4;
}
</style>
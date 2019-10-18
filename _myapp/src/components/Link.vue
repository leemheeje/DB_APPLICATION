<template>
<router-link :to="href" class="btns" :style="cssStyle" :class="cssClass" :target="targetAttr" :title="title" @click.native="fnEmitClick" v-if="originTag">
	<slot>
	</slot>
	<!-- <span class="msg" v-if="cssClassGubun('tooltip')">{{tooltipMsg}}</span> -->
</router-link>
<span class="btns origin" :style="cssStyle" :class="cssClass" @click="fnEmitClick" v-else-if="onlyTooltipfun">
	<slot></slot>
	<!-- <span class="msg" v-if="cssClassGubun('tooltip')">{{tooltipMsg}}</span> -->
</span>
<a :href="href" class="btns origin" :style="cssStyle" :class="cssClass" :target="targetAttr" :title="title" @click="fnEmitClick" v-else>
	<slot></slot>
</a>
</template>
<script>
export default {
	props: ['href', 'cssClass', 'original', 'target', 'title', 'jsClick', 'cssStyle', 'tooltipMsg','onlyTooltip'],
	computed: {
		originTag() {
			if (!this.original) {
				return true;
			} else {
				return false;
			}
		},
		onlyTooltipfun(){
			if (this.onlyTooltip) {
				return true;
			} else {
				return false;
			}
		},
		targetAttr() {
			return this.target ? this.target : '_self';
		},
	},
	methods: {
		cssClassGubun(s) {
			let r = false;
			if (this.cssClass) {
				if (this.cssClass.indexOf(s) != -1) {
					r = true;
				}
			}
			return r;
		},
		fnEmitClick(){
			this.$emit('jsClick', this.$el);
		}
	},
}
</script>
<style scoped="">

</style>
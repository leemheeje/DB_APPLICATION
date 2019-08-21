<template>
<v-container grid-list-md>
	<v-row>
		<v-col xs="12">
			<findForm :disabled="true"/>
		</v-col>
	</v-row>
</v-container>
</template>
<script>
import {
	mapMutations
} from 'vuex'
import findForm from '@/components/findForm'
export default {
	data() {
		return {
			dialog: true
		}
	},
	methods: {
		...mapMutations(['fnIsChild', 'fnTransPayload'])
	},
	watch: {
		$route() {
			this.fnTransPayload(['isChild', true]);
		}
	},
	created() {
		this.fnTransPayload(['$subtitle', '상세보기']);
		this.fnTransPayload(['isChild', true]);
	},
	components:{
		findForm
	}
}
</script>

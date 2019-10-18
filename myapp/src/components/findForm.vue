<template>
<v-layout wrap>
	<v-flex xs12>
		<v-radio-group :column="false">
			<v-radio
			    v-for="n in cashTypeGroup"
			    :key="n.value"
			    :label="n.name"
			    :value="n.value"
			    :disabled="disabled"
			    :readonly="readonly"
			></v-radio>
		</v-radio-group>
	</v-flex>
	<v-flex xs12>
		<v-combobox
		    v-model="dataCategori.model"
		    :items="dataCategori.items"
		    label="항목 카테고리"
		    class="text-right"
		    :disabled="disabled"
		    :readonly="readonly"
		></v-combobox>
	</v-flex>
	<v-flex xs12>
		<v-text-field
		    label="세부항목명"
		    class="text-right"
		    :disabled="disabled"
		    :readonly="readonly"
		></v-text-field>
	</v-flex>
	<v-flex xs12>
		<v-layout>
			<v-flex
			    style="max-width: 20%;"
			    v-for="(k,i) in dataAddPrice"
			>
				<v-btn
				    small
				    outlined
				    block
				    color="blue-grey"
				    @click="fnLocAddPrice(k)"
				>
					<v-icon size="15">add</v-icon>
					<span style="vertical-align: middle;">{{k}}만</span>
				</v-btn>
			</v-flex>
		</v-layout>
	</v-flex>
	<v-flex xs12>
		<v-text-field
		    type="text"
		    class="text-right"
		    v-model="dataPrice"
		    label="금액"
		    @focus="datePriceSet = ''"
		    :disabled="disabled"
		    :readonly="readonly"
		></v-text-field>
	</v-flex>
	<v-flex xs12>
		<v-text-field
		    type="text"
		    class="text-right"
		    v-model="datePickerInput"
		    label="날짜"
		    @click="pickerDialog = true"
		    :disabled="disabled"
		    :readonly="true"
		></v-text-field>
	</v-flex>
	<v-flex xs12>
		<v-textarea
		    outlined
		    name="input-7-4"
		    label="메모"
		    value=""
		    v-model="dataComment"
		    :disabled="disabled"
		    :readonly="readonly"
		></v-textarea>
	</v-flex>
	<v-dialog
	    v-model="pickerDialog"
	    justify="center"
	>
		<v-date-picker
		    @change="pickerDialog=false"
		    v-model="datePicker"
		    :full-width="true"
			locale="ko"
		></v-date-picker>
	</v-dialog>
</v-layout>
</template>
<script>
export default {
	props: ['disabled', 'readonly'],
	data() {
		return {
			pickerDialog: false,
			dataCategori: {
				model: 'Programming',
				items: ['Programming', 'Design', 'Vue', 'Vuetify'],
			},
			dataAddPrice: [1, 3, 5, 10, 100],
			cashTypeGroup: [{
				name: '카드결제',
				value: 0
			},
			{
				name: '현금결제',
				value: 1
			}],
			dataComment: '',
			datePriceSet: '134891',
			dateDateSet: '',
			datePickerInput: ''
		}
	},
	computed: {
		dataPrice: {
			get() {
				this.datePriceSet = this.$options.filters.fnFormatComma(this.datePriceSet) + '원';
				return this.datePriceSet;
			},
			set(v) {
				this.datePriceSet = v;
			},
		},
		datePicker: {
			get() {
				let dc = this.$currentTime().calendar;
				let dy = this.$currentTime().getFullYear;
				let dm = this.$currentTime().getMonth;
				let dd = this.$currentTime().getDate;
				if (!this.dateDateSet) {
					this.dateDateSet = `${dy}-${dm}-${dd}`;
				}
				if (!this.datePickerInput) {
					this.datePickerInput = this.$options.filters.fnFormatDate(dc);
				}
				return this.dateDateSet;
			},
			set(v) {
				if (v) {
					this.dateDateSet = v;
					this.datePickerInput = this.$options.filters.fnFormatDate(v.replace(/-/g, ''));
				}
			}
		},
	},
	methods: {
		asdf() {
			alert(1)
		},
		fnLocAddPrice(a) {
			let s = a + '0000';
			let vd = String(this.datePriceSet);
			let n = 0;
			if (vd && (vd.indexOf(',') != -1 || vd.indexOf('원') != -1)) {
				vd = vd.replace(/[^0-9]/g, '');
			}
			n = Number(s) + Number(vd);
			this.datePriceSet = n;
		}
	}
}
</script>
<style>

</style>
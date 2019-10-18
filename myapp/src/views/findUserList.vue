<template>
<v-container class="cmmListWrap">
	<v-row>
		<v-col xs="12">
			<v-card
				color="#385F73"
				dark
			>
				<v-card-text class="white--text">
					<div class="headline text-right">
						<v-icon>attach_money</v-icon>
						{{dataTotalComt | fnFormatComma}}원
					</div>
				</v-card-text>
			</v-card>
		</v-col>
	</v-row>
	<v-row>
		<v-col xs="12">
			<div class="listInfoMiddle">
				<ul class="btnsWrap">
					<li class="tp">
						<input
							type="radio"
							id="chk01"
							name="sortRadio"
							value="0"
							v-model="sort"
						/>
						<label
							class="btns"
							for="chk01"
						>1주일</label>
					</li>
					<li class="tp">
						<input
							type="radio"
							id="chk02"
							name="sortRadio"
							value="1"
							v-model="sort"
						/>
						<label
							class="btns"
							for="chk02"
						>1개월</label>
					</li>
					<li class="tp">
						<input
							type="radio"
							id="chk03"
							name="sortRadio"
							value="2"
							v-model="sort"
						/>
						<label
							class="btns"
							for="chk03"
						>6개월</label>
					</li>
					<li class="tp">
						<input
							type="radio"
							id="chk04"
							name="sortRadio"
							value="3"
							v-model="sort"
						/>
						<label
							class="btns"
							for="chk04"
						>기간설정</label>
					</li>
				</ul>
				<div class="listInfoDetail mt-3">
					<v-container>
						<v-layout>
							<v-flex xs6>
								<v-dialog
									ref="firstDialog"
									v-model="cmDateDetail.dataFirstModal"
									:return-value.sync="cmDateDetail.dataFirstSet"
									persistent
									full-width
									width="290px"
								>
									<template v-slot:activator="{ on }">
							          <v-text-field
							            v-model="dataFirstSetFormat"
							            label="시작날짜"
							            prepend-icon="event"
							            readonly
							            v-on="on"
							          ></v-text-field>
							        </template>
									<v-date-picker
										v-model="cmDateDetail.dataFirstSet"
										scrollable
										locale="ko"
									>
										<v-spacer></v-spacer>
										<v-btn
											text
											color="primary"
											@click="cmDateDetail.dataFirstModal = false"
										>Cancel</v-btn>
										<v-btn
											text
											color="primary"
											@click="$refs.firstDialog.save(cmDateDetail.dataFirstSet)"
										>OK</v-btn>
									</v-date-picker>
								</v-dialog>
							</v-flex>
							<v-flex xs6>
								<v-dialog
									ref="LastDialog"
									v-model="cmDateDetail.dataLastModal"
									:return-value.sync="cmDateDetail.dataLastSet"
									persistent
									full-width
									width="290px"
								>
									<template v-slot:activator="{ on }">
						          <v-text-field
						            v-model="cmDateDetail.dataLastSet"
						            label="종료날짜"
						            prepend-icon="event"
						            readonly
						            v-on="on"
						          ></v-text-field>
						        </template>
									<v-date-picker
										v-model="cmDateDetail.dataLastSet"
										scrollable
										locale="ko"
									>
										<v-spacer></v-spacer>
										<v-btn
											text
											color="primary"
											@click="cmDateDetail.dataLastModal = false"
										>Cancel</v-btn>
										<v-btn
											text
											color="primary"
											@click="$refs.LastDialog.save(cmDateDetail.dataLastSet)"
										>OK</v-btn>
									</v-date-picker>
								</v-dialog>
							</v-flex>
						</v-layout>
					</v-container>
				</div>
				<a
					href="#"
					class="btns block lg"
				>조회</a>
			</div>
		</v-col>
	</v-row>
	<v-row>
		<v-col xs="12">
			<div class="cmmCardLabel">
				<span class="tit">목록</span>
				<div class="rly">
					<v-switch
						color="error"
						label="지출만 표시"
					></v-switch>
				</div>
			</div>
			<v-list two-line>
				<v-list-item
					v-for="(item,index) in items2"
					:to="{name:'findUserField'}"
				>
					<v-list-item-avatar>
						<v-icon
							:class="[item.iconClass]"
							v-text="item.icon"
						></v-icon>
					</v-list-item-avatar>
					<v-list-item-content>
						<v-list-item-title v-text="item.title"></v-list-item-title>
						<v-list-item-subtitle v-text="item.categorie"></v-list-item-subtitle>
						<v-list-item-subtitle v-text="'2019.08.13'"></v-list-item-subtitle>
					</v-list-item-content>
					<v-list-item-action>
						<!-- 지출 -->
						<span class="colorDanger"><span class="txtr">지출</span>{{item.subtitle}}</span>
						<!-- 입금 -->
						<!-- <span class="colorPrimary"><span class="txtr">입금</span>{{item.subtitle}}</span> -->
					</v-list-item-action>
				</v-list-item>
			</v-list>
		</v-col>
	</v-row>
</v-container>
</template>
<script>
import {
	mapMutations
} from 'vuex'
export default {
	data() {
		let dc = this.$currentTime().calendar;
		let dy = this.$currentTime().getFullYear;
		let dm = this.$currentTime().getMonth;
		let dd = this.$currentTime().getDate;
		return {
			cmDateDetail: {
				dataFirstSet: `${dy}-${dm}-${dd}`,
				dataLastSet: `${dy}-${dm}-${dd}`,
				dataFirstModal: false,
				dataLastModal: false,
			},
			switch1: true,
			items2: [
			{
				icon: 'assignment_ind',
				iconClass: 'yellow white--text',
				title: '편의점',
				categorie: '기타비용',
				subtitle: '3,000원'
			},
			{
				icon: 'assignment',
				iconClass: 'blue white--text',
				title: '편의점',
				categorie: '기타비용',
				subtitle: '13,700원'
			},
			{
				icon: 'assignment',
				iconClass: 'blue white--text',
				title: '편의점',
				categorie: '기타비용',
				subtitle: '2,460원'
			},
			{
				icon: 'assignment',
				iconClass: 'blue white--text',
				title: '편의점',
				categorie: '기타비용',
				subtitle: '151,000원'
			}],
			sort: 0,
		}
	},
	computed: {
		dataFirstSetFormat() {
			let d = this.cmDateDetail.dataFirstSet;
			let dr = d.replace(/[^0-9]/g, '');
			return this.$options.filters.fnFormatDate(dr);
		},
		dataTotalComt(){
			return 1684500
		}
	},
	methods: {
		...mapMutations(['fnTransPayload'])
	},
	watch: {
		$route() {
			this.fnTransPayload(['isChild', false]);
		}
	},
	created() {
		this.fnTransPayload(['isChild', false]);
	}
}
</script>
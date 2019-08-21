<template>
<v-container class="cmmListWrap">
	<v-row>
		<v-col xs="12">
			<div class="listInfoTop">
				123
			</div>
		</v-col>
	</v-row>
	<v-row>
		<v-col xs="12">
			<div class="listInfoMiddle">
				<ul class="btnsWrap">
					<li class="tp">
						<input type="radio" id="chk01" name="sortRadio" value="0" v-model="sort" />
						<label class="btns" for="chk01">1주일</label>
					</li>
					<li class="tp">
						<input type="radio" id="chk02" name="sortRadio" value="1" v-model="sort" />
						<label class="btns" for="chk02">1개월</label>
					</li>
					<li class="tp">
						<input type="radio" id="chk03" name="sortRadio" value="2" v-model="sort" />
						<label class="btns" for="chk03">6개월</label>
					</li>
				</ul>
				<div class="listInfoDetail">
					<!-- 상세조회 넣어야하는데 ㅅㅂ vuetify -->
				</div>
				<a href="#" class="btns block lg">조회</a>
			</div>
		</v-col>
	</v-row>
	<v-row>
		<v-col xs="12">
			<div class="cmmCardLabel">
				<span class="tit">목록</span>
				<div class="rly">
					<v-switch color="error" label="지출만 표시"></v-switch>
				</div>
			</div>
			<v-list two-line>
				<v-list-item v-for="(item,index) in items2" :to="{name:'findUserField'}">
					<v-list-item-avatar>
						<v-icon :class="[item.iconClass]" v-text="item.icon"></v-icon>
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
	data: () => ({
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
	}),
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
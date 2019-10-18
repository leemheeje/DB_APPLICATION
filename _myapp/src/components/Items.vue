<template>
<div class="item">
	<ahref
			href=""
			originTag="true"
			class="init item_in"
			@jsClick="fnAddCount('view');fnItemsPopBtn();"
	>
		<span class="img">
			<img
					:src="usersItems.img.url"
					alt=""
					v-if="usersItems.img"
			/>
			<img
					:src="$PROFILE_NULL_IMG"
					alt=""
					v-else
			/>
			<span class="VALIGN"></span>
		</span>
	</ahref>
	<div
			class="item_pf"
			v-if="isUserView"
	>
		<div class="in">
			<ahref
					:href="'/user/'+usersInfo.username+'/'+usersInfo.id"
					class="init thumb"
			>
				<img
						:src="usersInfo.user_img"
						alt=""
						v-if="usersInfo.user_img"
				/>
				<img
						:src="$PROFILE_NULL_IMG"
						alt=""
						v-else
				/>
				<span class="VALIGN"></span>
			</ahref>
			<div class="txts">
				<ahref
						:href="'/user/'+usersInfo.username+'/'+usersInfo.id"
						class="init tit"
				>{{usersItems.title}}</ahref>
				<span class="stit">{{usersItems.sub_title}}</span>
				<ahref
						:href="'/user/'+usersInfo.username+'/'+usersInfo.id"
						class="init nm"
				>{{usersInfo.username}}</ahref>
			</div>
			<div class="s_tn">
				<ahref
						cssClass="init tp tooltip tp2"
						original="true"
						onlyTooltip="true"
						tooltipMsg="조회수"
				>
					<span class="ic">
						<fontIcon
								icon="eye"
								color="#757575"
						></fontIcon>
					</span>
					<span class="t">{{format(usersItems.count_view)}}</span>
				</ahref>
				<!-- <ahref
						cssClass="init tp tooltip tp1"
						original="true"
						onlyTooltip="true"
						tooltipMsg="댓글수"
				>
					<span class="ic">
						<fontIcon
								icon="comment"
								color="#757575"
						></fontIcon>
					</span>
					<span class="t">{{format(usersItems.count_comments)}}</span>
				</ahref> -->
				<ahref
						cssClass="init tp tooltip tp0"
						original="true"
						onlyTooltip="true"
						tooltipMsg="좋아요수"
				>
					<span class="ic">
						<fontIcon
								icon="heart"
								color="#757575"
						></fontIcon>
					</span>
					<span class="t">{{format(usersItems.count_favorite)}}</span>
				</ahref>
			</div>
		</div>
	</div>
	<div
			class="item_pf"
			v-else
	>
		<div class="item_pf_in">
			<span class="ic">
				<fontIcon
						icon="eye"
						color="#fff"
				></fontIcon>
			</span>
			<span class="t" style="margin-right: 10px;">{{format(usersItems.count_view)}}</span>
			<span class="ic">
				<fontIcon
						icon="comment"
						color="#fff"
				></fontIcon>
			</span>
			<span class="t" style="margin-right: 10px;">{{format(usersItems.count_comments)}}</span>
			<span class="ic">
				<fontIcon
						icon="heart"
						color="#fff"
				></fontIcon>
			</span>
			<span class="t">{{format(usersItems.count_favorite)}}</span>
		</div>
	</div>
</div>
</template>
<script>
export default {
	props: ['usersInfo', 'usersItems', 'usersItemsIndex', 'isUserView','usersItemsId'],
	data() {
		return {
			users: null,
			itemDetailIndex: 0,
			itemDetail: {
				img: {
					url: ''
				},
				title: '',
				sub_title: '',
				count_favorite: 0,
				count_view: 0,
				count_comments: 0,
				comments: [{
					img: {
						url: ''
					},
					title: '',
					sub_title: '',
					date: '',
				}]
			},
			loc_comments_msg: '',
			loc_comments_title: '',
		}
	},
	computed: {
		format(s) {
			return function(s) {
				let d = 0;
				var ds = new String(s);
				if (ds.length == 1 && s != 0) {
					d = '0';
				}
				return d + s;
			}
		}
	},
	watch: {
		$route(t, f) {}
	},
	created() {},
	methods: {
		fnItemsPopBtn() {
			this.$store.state.USER_ITEMS_INFO = this.usersInfo;
			this.$store.state.USER_ITEMS_OBJECT = this.usersItems;
			this.$store.state.USER_ITEMS_INDEX = this.usersItemsIndex;
			this.$store.state.USER_ITEMS_ID = this.usersItemsId;
			console.log(this.usersItemsId);
			$('.modal').show();
		},
		fnAddCount(nm) {
			var userInfoId = this.usersInfo._id || this.usersInfo.id;
			if (nm == 'favorite') {
				if (typeof this.usersItems.count_favorite === 'number') {
					this.usersItems.count_favorite = this.usersItems.count_favorite + 1;
				} else {
					this.usersItems['count_favorite'] = 1;
				}
			} else if (nm == 'view') {
				if (typeof this.usersItems.count_view === 'number') {
					this.usersItems.count_view = this.usersItems.count_view + 1;
				} else {
					this.usersItems['count_view'] = 1;
				}
			}
			this.$http.get(this.$DB_PATH['FIND_ON'] + userInfoId).then(res => {
				for (var i = 0; i < res.data.user_items.length; i++) {
					if (res.data.user_items[i].img.id == this.usersItems.img.id) {
						res.data.user_items[i] = this.usersItems;
						this.$http.put(this.$DB_PATH['USER_UPDATE'] + userInfoId, {
							"user_items": res.data.user_items
						}).then(res => {}).catch(e => {});
						break;
					}
				}
			}).catch(e => {});
		},
	}
}
</script>
<style scoped="">
</style>
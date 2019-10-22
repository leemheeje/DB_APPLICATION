<template>
<div
		class="modal"
		@click.self="fnModalClose"
>
	<div
			class="itemDetailView"
			v-if="usersInfo&&usersItems"
	>
		<div class="idvTop">
			<div class="ivL">
				<div class="ivLIn">
					<span class="thumb">
						<img
								:src="usersInfo.user_img | isLocalPath"
								alt=""
								v-if="usersInfo.user_img"
						/>
						<img
								:src="$PROFILE_NULL_IMG"
								alt=""
								v-else
						/>
						<span class="VALIGN"></span>
					</span>
					<div class="txts">
						<div class="tit">{{usersItems.title}}</div>
						<div class="subj">{{usersItems.sub_title}}</div>
						<!-- <div class="subj">{{usersItems.count_favorite}}</div>
						<div class="subj">{{usersItems.count_view}}</div>
						<div class="subj">{{usersItems.count_comments}}</div> -->
					</div>
				</div>
			</div>
			<div class="ivR">
				<div class="btnWrap">
					<ahref
							original="true"
							:href="usersItems.url"
							target="_blank"
							class="default"
							v-if="usersItems.url"
					>
						<span class="t">사이트 바로가기</span>
					</ahref>
					<ahref
							href=""
							class="default icos"
							@jsClick="fnAddCount('favorite');"
					>
						<fontIcon
								icon="heart"
								color="#555"
						></fontIcon><span class="t">좋아요</span>
					</ahref>
					<ahref
							href=""
							class="default"
							@jsClick="fnModalClose"
					>
						<span class="t">닫기</span>
					</ahref>
				</div>
				<div class="countBottom">
					<div class="s_tn">
						<span class="tp tp2">
							<span class="ic"> 조회수: </span>
							<span class="t">{{usersItems.count_view}}</span>
						</span>
						<span class="tp tp1">
							<span class="ic"> 댓글수: </span>
							<span class="t">{{usersItems.count_comments}}</span>
						</span>
						<span class="tp tp0">
							<span class="ic"> 좋아요: </span>
							<span class="t">{{usersItems.count_favorite}}</span>
						</span>
					</div>
				</div>
			</div>
		</div>
		<div class="idvMid">
			<span class="thumb"><img
						:src="usersItems.img.url | isLocalPath"
						alt=""
				/></span>
		</div>
		<div class="idvBottom">
			<div class="idvComments">
				<div class="idvCTop">
					<span class="lng">{{usersItems.count_comments}}개의 댓글이 있습니다.</span>
				</div>
				<ul class="lst">
					<li
							class="tp"
							v-for="(key, index) in usersItems.comments"
					>
						<div class="in">
							<span class="thumb">
								<img
										:src="key.img.url | isLocalPath"
										alt=""
										v-if="key.img.url"
								/>
								<img
										:src="$DB_DOMAIN+key.img.url  | isLocalPath"
										alt=""
										v-else
								/>
							</span>
							<div class="txts">
								<div class="tit">{{key.title}}</div>
								<div class="subj">{{key.sub_title}}</div>
								<div class="date">{{key.date}}</div>
								<div class="date">{{key.name}}</div>
							</div>
						</div>
					</li>
				</ul>
				<div class="idvCField">
					<div
							class="bl"
							v-if="!$store.state.USER_ID"
					>
						<div class="bl_in">
							<ahref
									:href="{name: 'UserLogin'}"
									class="t"
							>로그인 후 댓글 작성이 가능합니다.<br /><i class="UNDER">로그인 하시겠습니까?</i></ahref>
						</div>
					</div>
					<div class="fwra">
						<div class="int">
							<span class="inp tp0"><input
										type="text"
										placeholder="제목을 입력해주세요"
										v-model="loc_comments_title"
								/></span>
							<span class="inp tp1">
								<textarea name="댓글" v-model="loc_comments_msg"></textarea>
							</span>
						</div>
						<ahref
								href=""
								class="inp_btn"
								@jsClick="fnApplyComments"
						>댓글등록</ahref>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
</template>
<script>
export default {
	props: ['type', 'title', 'msg', 'usersInfo', 'usersItems', 'usersItemsIndex', 'usersItemsId'],
	data() {
		return {
			loc_comments_title: '',
			loc_comments_msg: '',
		}
	},
	computed: {
		typefun() {
			if (this.type === 'alert') {
				return true;
			} else {
				return false;
			}
		},
		nowDate() {
			let newdate = new Date;
			return {
				year: newdate.getFullYear(),
				month: newdate.getMonth() + 1 >= 10 ? newdate.getMonth() + 1 : '0' + (newdate.getMonth() + 1),
				date: newdate.getDate() >= 10 ? newdate.getDate() : '0' + newdate.getDate(),
				hours: newdate.getHours() >= 10 ? newdate.getHours() : '0' + newdate.getHours(),
				minu: newdate.getMinutes() >= 10 ? newdate.getMinutes() : '0' + newdate.getMinutes(),
			};
		}
	},
	methods: {
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
		fnModalClose() {
			$('.modal').hide();
		},
		fnApplyComments() {
			var userInfoId = this.usersInfo._id || this.usersInfo.id;
			var cmt = this.usersItems.comments;
			if (!cmt || !Array.isArray(cmt)) {
				cmt = [];
			}
			this.$http.get(this.$DB_PATH['FIND_ON'] + this.$store.state.USER__ID).then(res => {
				cmt.push({
					img: {
						url: res.data.user_img
					},
					title: this.loc_comments_title,
					sub_title: this.loc_comments_msg,
					date: this.nowDate.year + '.' + this.nowDate.month + '.' + this.nowDate.date + '  ' + this.nowDate.hours + ':' + this.nowDate.minu,
					name: res.data.user_name,
				});
				this.usersItems.count_comments = cmt.length;
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
				this.loc_comments_title = '';
				this.loc_comments_msg = '';
			}).catch(e => {});
		},
	},
	mounted() {
		window.addEventListener('keyup', e => {
			if (e.keyCode == 27) {
				this.fnModalClose();
			}
		});
	}
}
</script>
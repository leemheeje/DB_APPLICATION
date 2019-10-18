<template>
<div class="mypage_area">
	<div class="sort_wrap" v-if="usersItemsSort.length">
		<ahref href="" originTag class="sort active" data-params="fv" @jsClick="fnSort">좋아요순</ahref>
		<ahref href="" originTag class="sort" data-params="ct" @jsClick="fnSort">댓글순</ahref>
		<ahref href="" originTag class="sort" data-params="vw" @jsClick="fnSort">조회순</ahref>
	</div>
	<div class="useritem_area">
		<template v-for="(key,index) in usersItemsSort">
			<Items :usersInfo="key" :usersItems="key.item" :usersItemsId="key.item_id" :usersItemsIndex="index" :isUserView="true"></Items>
		</template>
	</div>
</div>
</template>
<script>
export default {
	data() {
		return {
			users: null,
			usersItemsSort: []
		}
	},
	components: {},
	created() {
		this.$http.get(this.$DB_PATH['ALLUSER']).then(res => {
			this.users = res.data;
			for (var i = 0; i < this.users.length; i++) {
				for (var j = 0; j < this.users[i].user_items.length; j++) {
					this.usersItemsSort.push({
						email: this.users[i].email,
						id: this.users[i]._id,
						username: this.users[i].username,
						user_img: this.users[i].user_img,
						user_skills: this.users[i].user_skills,
						user_info: this.users[i].user_info,
						item: this.users[i].user_items[j],
						item_id: this.users[i].user_items[j].img._id || this.users[i].user_items[j].img.id
					});
				}
			}
			this.fnSort();
			$('[data-params="fv"]').addClass('active');
		}).catch(e => {});
	},
	mounted(){
		
	},
	methods: {
		fnSort($el) {
			let f = '';
			switch ($($el).data('params')) {
				case 'ct': //댓글순
					f = 'count_comments';
					break;
				case 'vw': //조회순
					f = 'count_view';
					break;
				default:
					f = 'count_favorite';
			}
			$('.sort').removeClass('active');
			$($el).addClass('active');
			this.usersItemsSort.sort((a, b) => { //내림차순
				return b.item[f] - a.item[f];
			});
		}
	}
}
</script>
<style scoped="">
.mypage_area{position: relative; padding-top: 60px}
.sort_wrap{position: absolute; right: 30px; top: 15px;}
.sort_wrap .sort{background: #fafafa; font-size: 11px;}
.sort_wrap .sort.active{background: rgba(47, 47, 47, 0.98); color: #fff;}
.useritem_area{margin: 0 -15px;}
.lst {
	padding: 30px;
	margin-left: -15px;
}

.lst .tp {
	width: calc(100% / 9);
	border-radius: 5px;
	box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.07);
	float: left;
	margin-left: 15px;
}

.lst .tp .tp_in {
	display: block;
	height: 190px;
	background: #fff;
}

.lst .grid {
	padding: 0;
	border-radius: 0;
	min-width: 0;
	display: block;
}

.lst .user_t {}

.lst .user_t .thumb {
	display: block;
	height: 100%;
}

.lst .user_t .thumb img {
	width: 100%;
	height: 100%;
}

@media only screen and (max-width: 1200px) {
	.lst .tp {
		width: calc(100% / 5);
		border-radius: 3px
	}
}

@media only screen and (max-width: 960px) {
	.lst .tp {
		width: calc(100% / 3);
	}
}

@media only screen and (max-width: 640px) {
	.lst .tp {
		width: calc(100% / 2);
	}
}

@media only screen and (max-width: 480px) {
	.lst .tp {
		width: calc(100% / 1);
	}
}
</style>
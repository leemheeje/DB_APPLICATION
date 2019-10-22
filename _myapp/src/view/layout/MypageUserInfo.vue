<template>
<div class="mypage_userinfo">
	<div class="lrow">
		<div class="user_t">
			<span class="thumb">
				<img :src="user_img  | isLocalPath" alt="" v-if="user_img"/>
				<img src="http://test.eos-red.com/mobile/images/common/cbtTopBanner.png?v=1" alt="" v-else/>
			</span>
				<div class="user_name">{{user_name}}</div>
				<div class="user_info">{{user_info}}</div>
		</div>
	</div>
	<div class="lrow">
		<div class="title">skill</div>
		<div class="cont">
			<div class="tag_area">
				<ahref href="/" class="tag" v-if="userSkills" v-for="(key,index) in userSkills">{{userSkills[index]}}</ahref>
			</div>
		</div>
	</div>
</div>
</template>
<script>
export default {
	data() {
		return {
			user_name: '',
			user_info: '',
			user_img: '',
			user_skills: [],
		}
	},
	computed: {
		userSkills() {
			return this.user_skills.length && this.user_skills.indexOf(',') ? this.user_skills.split(',') : false;
		}
	},
	watch:{
		$route(t,f){
			this.fnGetParams();
		}
	},
	created(){
		this.fnGetParams();
	},
	methods:{
		fnGetParams(){
			let current = null;
			this.$http.get(this.$DB_PATH['FIND_ON'] + this.$route.params.id).then(res => {
				this.user_name = res.data.username;
				this.user_skills = res.data.user_skills ? res.data.user_skills : [];
				this.user_img = res.data.user_img;
				this.user_info = res.data.user_info;
			}).catch(err => {});
		}
	}
}
</script>
<style scoped="">
.mypage_userinfo {
	background: #fff;
	border: 1px solid #eee;
	border-radius: 6px;
	float: left;
	width: 325px;
	box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07);
}

.mypage_userinfo .lrow {
	padding: 20px 30px;
}

.mypage_userinfo .lrow+.lrow {
	border-top: 1px solid #eee;
}

.mypage_userinfo .tag_area {
	margin: 0 -4px;
}

.mypage_userinfo .title {
	font-size: 15px;
	color: #999;
	margin-bottom: 10px;
	display: block;
	text-transform: uppercase;
	font-weight: 600;
}

.btns.tag {
	margin-left: 4px;
	margin-bottom: 4px;
}

.mypage_userinfo .user_t {
	text-align: center;
}

.mypage_userinfo .thumb {
	width: 80px;
	height: 80px;
	display: block;
	margin: 0 auto 5px;
	border-radius: 50%;
	overflow: hidden;
	position: relative;
}

.mypage_userinfo .thumb img {
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	width: 100%;
}

.mypage_userinfo .user_name {
	font-weight: 600;
	color: #444;
	font-size: 20px;
	margin-bottom: 20px;
}

.mypage_userinfo .user_info {
	word-break: break-all;
	font-size: 13px;
	color: #444;
	font-weight: normal;
	display: block;
}

@media only screen and (max-width: 1200px) {
	.mypage_userinfo {
		float: none;
		width: 100%;
		border-radius: 3px;
	}
}
</style>
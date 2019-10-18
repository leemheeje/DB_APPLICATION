<template>
<div class="form_bg">
	<div class="form_logo">
		<img src="@/assets/images/logo_bl.png" alt="" />
    	</div>
		<form>
			<div class="form_wrap">
				<div class="row">
					<div class="col12">
						<div class="r_in requierd">
							<label for="USER_NAME" class="lb">이름</label>
							<Form type="text" id="USER_NAME" name="USER_NAME" @v-model="fnUserFormModel" cssClass="ip" placeholder="이름을 입력해주세요." />
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col12">
						<div class="r_in requierd">
							<label for="USER_ID" class="lb">아이디</label>
							<Form type="text" id="USER_ID" name="USER_ID" @v-model="fnUserFormModel" cssClass="ip" placeholder="아이디를 입력해주세요." />
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col6">
						<div class="r_in requierd">
							<label for="USER_PW" class="lb">비밀빈호</label>
							<Form type="password" id="USER_PW" name="USER_PW" @v-model="fnUserFormModel" cssClass="ip" placeholder="비밀번호를 입력해주세요." />
						</div>
					</div>
					<div class="col6">
						<div class="r_in requierd">
							<label for="USER_PW_CONF" class="lb">비밀빈호확인</label>
							<Form type="password" id="USER_PW_CONF" name="USER_PW_CONF" @v-model="fnUserFormModel" cssStyle="max-width: 80px;" cssClass="ip" placeholder="비밀번호를 입력해주세요." />
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col6">
						<div class="r_in requierd">
							<label for="USER_EMAIL" class="lb">이메일</label>
							<Form type="text" id="USER_EMAIL" name="USER_EMAIL" @v-model="fnUserFormModel" cssClass="ip" placeholder="이메일을 입력해주세요." />
						</div>
					</div>
					<div class="col6">
						<div class="r_in requierd">
							<label for="USER_IMG" class="lb">대표이미지</label>
							<Form type="file" id="USER_IMG" @v-model="fnUserFormModel" name="files" cssClass="ip" />
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col12">
						<div class="r_in">
							<label for="USER_INFO" class="lb">대표설명글</label>
							<Form type="textarea" id="USER_INFO" name="USER_INFO" @v-model="fnUserFormModel" cssClass="ip" placeholder="대표설명글을 작성해주세요."></Form>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col12">
						<div class="combox_wrap MT20">
							<span class="cb_lb requierd">보유스킬</span>
							<div class="combox">
								<span class="cb" v-for="(key, index) in findSkill">
									<Form type="checkbox" :id="'cb'+index" :name="'cb'+index" :title="key" :value="key" @js-checked="fnIsCheckdSkill" />
									<label :for="'cb'+index">{{key}}</label>
								</span>
							</div>
							<div class="ipw MT10">
								<Form type="text" readonly v-model="USER_SKILL" name="USER_SKILL" cssClass="ip" placeholder="체크박스를 선택해주세요." />
							</div>
						</div>
					</div>
				</div>
				<div class="btn_wrap MT25">
					<div class="row">
						<div class="col6">
							<Form type="submit" cssClass="btns block big red" value="회원가입"></Form>
						</div>
						<div class="col6">
							<ahref href="" originTag @jsClick="$router.go(-1)" cssClass="block big default">이전페이지</ahref>
						</div>
					</div>
				</div>
			</div>
		</form>
	</div>
</template>
<script>
export default {
	data() {
		return {
			findSkill: ['웹기획', '웹서비스기획', '모바일기획', '컨텐츠기획', 'PM', 'UI설계', '스토리보드', '제안·컨설팅', '정보설계', '통계·로그분석', '웹PD', '사용자평가', '네트워크관리', '서버관리자', '시스템운영', '네트워크엔지니어', '서버구축', 'Linux', '보안관리', '정보보안', '보안기술', 'Windows', '방화벽', '보안관제', 'Unix', 'LAN', 'CCNA',
				'Cisco', 'POS', 'Apache', 'MCSE', 'IIS', 'Solaris', '포토샵', '일러스트레이터', 'HTML', 'UI·UX디자인', '웹UI', '모바일UI',
				'CSS', '플래쉬', '드림위버', 'GUI', 'Sketch', '웹퍼블리셔', '자바스크립트', 'HTML5', 'HTML코딩', 'CSS', 'UI·UX', '웹표준', 'CSS3', '웹접근성', 'Java', '웹프로그래머', 'jsp', 'MySQL', 'php', 'SQL', 'MS-SQL', '.NET', 'AJAX', 'asp', 'MiPlatform', 'Servlet', 'xml',
				'mHTML', 'APM', 'HDML', 'WinForm', 'VB.NET', 'SCJP', 'EJB', 'cgi', 'VRML'
			],
			addFindSkillObj: {},
			addFindSkill: '',
			USER_ID: '',
			USER_NAME: '',
			USER_PW: '',
			USER_PW_CONF: '',
			USER_EMAIL: '',
			USER_IMG:'',
			files: '',
			USER_INFO: '',
			USER_SKILL: '',
		}
	},
	mounted() {
		let $btn = $('.fnRegisterBtn');
		const formElement = document.querySelector('form');
		const request = new XMLHttpRequest();
		formElement.addEventListener('submit', e => {
			e.preventDefault();
			if (!this.files) {
				alert('파일빔');
				return false;
			}
			request.open('POST', this.$DB_PATH['USER_UPLOAD']);
			request.send(new FormData(formElement));
			request.onreadystatechange = () => {
				if (request.readyState === 4 && request.status === 200) {
					this.$http.get(this.$DB_PATH['USER_UPLOAD_FIND']).then(res => {
						let ls = res.data.length - 1;
						this.$http.get(this.$DB_PATH['USER_UPLOAD_FIND'] + res.data[ls].id).then(res => {
							this.USER_IMG = res;
							this.fnRegisterForm(this.USER_IMG.data.url);
						});
						this.USER_IMG = '';
					});
				}
			};
		});
	},
	methods: {
		fnUserFormModel(...r) {
			for (var key in r[1]) {
				if (r[1][key]) {
					this[key] = r[0];
				}
			}
		},
		fnRegisterForm($img) {
			if (!this.USER_NAME) {
				alert('이름빔');
				return false;
			}
			if (!this.USER_ID) {
				alert('아이디빔');
				return false;
			}
			if (!this.USER_PW) {
				alert('비밀번호빔');
				return false;
			}
			if (!this.USER_PW_CONF) {
				alert('비밀번호빔');
				return false;
			}
			if (this.USER_PW != this.USER_PW_CONF) {
				alert('비밀번호맞지않음');
				return false;
			}
			if (!this.USER_EMAIL) {
				alert('이메일빔');
				return false;
			}
			if (!this.USER_SKILL) {
				alert('스킬체크안함');
				return false;
			}
			this.$http.post(this.$DB_PATH['REGISTER'], {
				username: this.USER_ID,
				password: this.USER_PW,
				email: this.USER_EMAIL,
				user_name: this.USER_NAME,
				user_img: $img,
				user_skills: this.USER_SKILL,
				user_info: this.USER_INFO,
				user_items: []
			}).then(res => {
				alert('회원가입을 완료하였습니다.');
				this.$router.push({
					name: 'Main'
				});
				this.$store.state.USER__ID = res.data.user._id;
				this.$store.state.USER_ID = this.USER_ID;
				this.$session.set('USER__ID', res.data.user._id);
				this.$session.get('USER_ID', this.USER_ID);
			}).catch(e => {
				console.log(e);
			});
		},
		fnIsCheckdSkill(s, $el) {
			this.USER_SKILL = '';
			if ($el.checked) {
				this.addFindSkillObj[s] = true;
			} else {
				this.addFindSkillObj[s] = false;
			}
			for (var k in this.addFindSkillObj) {
				if (this.addFindSkillObj[k]) {
					let n = ', ';
					if (!this.USER_SKILL) {
						n = ' '
					}
					this.USER_SKILL += n + k;
				}
			}
		}
	}
}
</script>
<style scoped>
.form_bg {
	max-width: 750px;
	width: 100%;
	position: static;
	transform: translate(0, 0);
	margin: 0 auto;
	margin-top: 60px;
	display: block;
}
</style>
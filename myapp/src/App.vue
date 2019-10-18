<template>
<v-app id="inspire">
	<v-navigation-drawer
	    v-model="drawer"
	    :clipped="$vuetify.breakpoint.lgAndUp"
	    app
	    v-if="headerHidden"
	>
		<v-list dense>
			<template v-for="item in items">
          <v-layout v-if="item.heading" :key="item.heading" align-center >
            <v-flex xs6>
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-flex>
            <v-flex xs6 class="text-center" >
              <a href="#!" class="body-2 black--text" >EDIT</a>
            </v-flex>
          </v-layout>
          <v-list-group
            v-else-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon=""
          >
            <template v-slot:activator>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ item.text }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
			<v-list-item
			    v-for="(child, i) in item.children"
			    :key="i"
			    @click=""
			>
				<v-list-item-action v-if="child.icon">
					<v-icon>{{ child.icon }}</v-icon>
				</v-list-item-action>
				<v-list-item-content>
					<v-list-item-title>
						{{ child.text }}
					</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
			</v-list-group>
			<v-list-item
			    v-else
			    :key="item.text"
			    @click=""
			>
				<v-list-item-action>
					<v-icon>{{ item.icon }}</v-icon>
				</v-list-item-action>
				<v-list-item-content>
					<v-list-item-title>
						{{ item.text }}
					</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
			</template>
		</v-list>
	</v-navigation-drawer>
	<v-app-bar
	    :clipped-left="$vuetify.breakpoint.lgAndUp"
	    app
	    color="blue darken-3"
	    dark
	    v-if="headerHidden"
	>
		<v-toolbar-title
		    style="width: 300px; margin-left: -10px;"
		    v-if="!isChild"
		>
			<v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
			<span>{{$title}}</span>
		</v-toolbar-title>
		<v-toolbar-title
		    style="width: 300px margin-left: -10px;"
		    v-else
		>
			<router-link :to="{ name: 'findUserList'}">
				<v-icon size="30">keyboard_arrow_left</v-icon>
			</router-link>
			<span>{{$subtitle}}</span>
		</v-toolbar-title>
		<v-spacer></v-spacer>
		<template v-if="USER_TOKEN">
		<v-tooltip bottom>
			<template v-slot:activator="{ on }">
				<v-btn icon v-on="on" @click="fnLogout">
					<v-icon>mdi-contacts</v-icon>
				</v-btn>
			</template>
		<span>마이페이지</span>
		</v-tooltip>
		<v-tooltip bottom>
			<template v-slot:activator="{ on }">
				<v-btn icon v-on="on" @click="fnLogout" style="margin-right: 20px;">
					<v-icon>mdi-logout-variant</v-icon>
				</v-btn>
			</template>
			<span>로그아웃</span>
		</v-tooltip>
		</template>
		<template v-else>
			<v-tooltip left>
				<template v-slot:activator="{ on }">
					<v-btn icon v-on="on" @click="$router.push({name:'login'})">
						<v-icon>mdi-login-variant</v-icon>
					</v-btn>
				</template>
		<span>로그인</span>
		</v-tooltip>
		</template>
	</v-app-bar>
	<v-content>
		<v-container fluid>
			<v-row>
				<router-view />
			</v-row>
		</v-container>
	</v-content>
	<v-layout justify-center>
		<v-dialog
		    v-model="dialog"
		    fullscreen
		    hide-overlay
		    transition="dialog-bottom-transition"
		>
			<template v-slot:activator="{ on }">
				<v-btn bottom color="pink" dark fab fixed right v-on="on" v-if="headerHidden"><v-icon>add</v-icon></v-btn>
			</template>
			<v-card>
				<v-toolbar
				    dark
				    color="primary"
				>
					<v-btn
					    icon
					    dark
					    @click="dialog = false"
					>
						<v-icon>close</v-icon>
					</v-btn>
					<v-toolbar-title style="padding-left: 0;">등록하기</v-toolbar-title>
					<v-spacer></v-spacer>
					<v-toolbar-items>
						<v-btn
						    dark
						    text
						    @click="dialog = false"
						>Save</v-btn>
					</v-toolbar-items>
				</v-toolbar>
				<v-container grid-list-md>
					<findForm />
				</v-container>
			</v-card>
		</v-dialog>
	</v-layout>
	<v-dialog
	    v-model="vmModal.bool"
	    persistent
	    max-width="290"
	    origin="center top"
	>
		<v-card>
			<v-card-title
			    class="headline"
			    v-if="vmModal.title"
			>{{vmModal.title}}</v-card-title>
			<v-card-text v-if="vmModal.msg">{{vmModal.msg}}</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn
				    color="green darken-1"
				    text
				    @click="fnVmModal({bool:false})"
				>Agree</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</v-app>
</template>

<script>
import {
	mapMutations,
	mapActions,
	mapState
} from 'vuex';
import findForm from '@/components/findForm'
export default {
	name: "App",
	props: {
		source: String
	},
	data: () => ({
		dialog: false,
		drawer: false,
		items: [{
			icon: "contacts",
			text: "마이페이지"
		},
		{
			icon: "history",
			text: "기록보기"
		},
		{
			icon: "content_copy",
			text: "등록하기"
		}]
	}),
	computed: { ...mapState(['vmModal', 'USER_TOKEN', 'isChild', '$subtitle']),
		headerHidden() {
			return this.$route.name != 'login' ? true : false;
		},
	},
	created() {
		this.$store.dispatch("fnContStrgCmit");
		//this.fnIsChild(false);
	},
	components: {
		findForm
	},
	mounted() {},
	methods: { ...mapActions(['fnLogout']),
		...mapMutations(['fnVmModal', 'fnIsChild']),
	}
};
</script>

<template>
  <v-flex xs12 sm8 md4 style="max-width: 350px;">
    <v-card class="elevation-12">
      <v-snackbar
        v-model="snackbar"
        :top="true"
        :color="snackbarColor"
        :timeout="snackTimerout"
      >{{snamckbarTxt}}</v-snackbar>
      <v-toolbar color="primary" dark flat>
        <v-toolbar-title>{{`${$title} Login`}}</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text>
        <v-form>
          <v-text-field
            @keyup.13="fnUserLogin"
            v-model="userId"
            label="Login"
            name="login"
            prepend-icon="person"
            type="text"
          ></v-text-field>
          <v-text-field
            @keyup.13="fnUserLogin"
            v-model="userPw"
            label="Password"
            name="password"
            prepend-icon="lock"
            type="password"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="fnUserLogin" block rounded color="primary">Login</v-btn>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data: () => ({
    snackbar: false,
    snackbarColor: "error",
    snackTimerout: 1000,
    snamckbarTxt: "",
    userId: "",
    userPw: ""
  }),
  computed: {},
  methods: {
    ...mapActions(["fnLogin"]),
    fnUserLogin() {
      if (!this.userId && !this.userPw) {
        this.snamckbarTxt = "잘못된 정보입니다.";
        this.snackbarColor = "error";
        this.snackbar = true;
        return;
      }
      let params = [
        {
          identifier: this.userId,
          password: this.userPw
        },
        () => {
          this.snamckbarTxt = "로그인되었습니다.";
          this.snackbarColor = "success";
          this.snackbar = true;
          setTimeout(() => {
            this.$router.push({
              name: "home"
            });
          }, this.snackTimerout);
        }
      ];
      this.fnLogin(params);
    }
  }
};
</script>
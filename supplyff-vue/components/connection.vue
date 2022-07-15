<template>
  <v-container>
    <v-dialog
      v-model="connection"
      width="350px"
    >
      <v-card class="d-flex flex-column align-center justify-center py-12">
        <v-alert
          v-if="errors"
          type="error"
          text
        >{{ errors }}</v-alert>
        <v-text-field
          v-model="email"
          label="Email Address"
        ></v-text-field>

        <v-text-field
          v-model="pwd"
          type="password"
          label="Password"
        ></v-text-field>

        <v-btn @click="connect">Sign in</v-btn>

        <div class="mt-7 mb-2">No Account Yet?</div>

        <v-btn
          nuxt
          to="/register"
        >Register</v-btn>

      </v-card>
    </v-dialog>
  </v-container>

</template>

<script>
export default {
  name: "Connection",

  data() {
    return {
      connection: true,
      email: "",
      pwd: "",
      errors: "",
    };
  },

  mounted() {},

  methods: {
    async connect() {
      try {
        await this.$auth
          .loginWith("laravelSanctum", {
            data: {
              email: this.email,
              password: this.pwd,
            },
          })
          .then(() => {
            if (this.$auth.loggedIn) {
              this.connection = false;
            }
          });
      } catch (e) {
        this.errors = e.response.data.message;
      }
    },
  },
};
</script>

<style>
</style>
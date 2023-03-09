<template>
  <div>
    <v-dialog
      v-model="show"
      max-width="350px"
      persistent
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
          @click="show = false"
        >Register</v-btn>

      </v-card>
    </v-dialog>
  </div>

</template>

<script>
export default {
  name: "Connection",

  props: {
    connectionDial: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      email: "",
      pwd: "",
      errors: "",
    };
  },

  computed: {
    show: {
      get() {
        return this.connectionDial;
      },
      set(value) {
        this.$emit("update:connectionDial", value);
      },
    },
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
            try {
              this.$axios.get("/me").then((res) => {
                this.$auth.setUser(res.data);
                this.show = false;
              });
            } catch (e) {
              this.errors = e.response.data.message;
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
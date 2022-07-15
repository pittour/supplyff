<template>
  <v-container>
    <div class="headline text-center mb-5">Account Creation</div>
    <v-form
      ref="registration"
      v-model="valid"
    >
      <v-card class="text-center px-16">
        <v-card-title class="justify-center">
          Basic information
        </v-card-title>
        <v-card-text>

          <v-row no-gutters>
            <v-text-field
              v-model="userName"
              label="Username"
              :rules="rules.userName"
            ></v-text-field>

            <v-spacer></v-spacer>

            <v-text-field
              v-model="email"
              label="Email Address"
              :rules="rules.email"
            >
            </v-text-field>
          </v-row>

          <v-row no-gutters>
            <v-text-field
              v-model="pwd"
              label="Password"
              :rules="rules.pwd"
              type="password"
            ></v-text-field>

            <v-spacer></v-spacer>

            <v-text-field
              v-model="cpwd"
              label="Password Confirmation"
              type="password"
            >
            </v-text-field>
          </v-row>
        </v-card-text>

        <v-card-title class="justify-center">
          Contact Information
        </v-card-title>

        <v-card-text>
          <v-row no-gutters>
            <v-text-field
              v-model="inGame"
              label="In-Game Name"
              hint="Please enter the name of your main character in Flyff Universe"
              persistent-hint
              :rules="rules.inGame"
            ></v-text-field>

            <v-spacer></v-spacer>

            <v-text-field
              v-model="discord"
              label="Discord Name (optional)"
            >
            </v-text-field>
          </v-row>
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn
            @click="validate"
            :disabled="!valid"
          >
            Validate
          </v-btn>
        </v-card-actions>

      </v-card>
    </v-form>
  </v-container>
</template>

<script>
export default {
  name: "RegisterPage",
  data() {
    return {
      valid: false,
      userName: "",
      email: "",
      pwd: "",
      cpwd: "",
      inGame: "",
      discord: "",
      rules: {
        userName: [
          (v) => !!v || "Username is required",
          (v) =>
            (v && v.length <= 12 && v.length >= 3) ||
            "Username must have between 3 and 12 characters",
        ],
        email: [
          (v) => !!v || "E-mail is required",
          (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
        ],
        pwd: [
          (v) => !!v || "Password is required",
          (v) =>
            (v && v.length <= 12 && v.length >= 3) ||
            "Password must have between 3 and 12 characters",
        ],
        inGame: [
          (v) => !!v || "In Game Name is required",
          (v) =>
            (v && v.length <= 16 && v.length >= 2) ||
            "In Game Name must have between 2 and 16 characters",
        ],
      },
    };
  },

  methods: {
    validate() {
      this.$axios
        .post(
          "/register",
          {
            email: this.email,
            password: this.pwd,
            username: this.userName,
            ingame_tag: this.inGame,
          },
          {
            Headers: {
              Accept: "application/json",
            },
          }
        )
        .then(this.$router.push("/"));
    },
  },
};
</script>

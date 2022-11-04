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
              style="width:200px;"
              label="Username"
              :rules="rules.userName"
            ></v-text-field>

            <v-spacer></v-spacer>

            <v-text-field
              v-model="email"
              style="width:200px;"
              label="Email Address"
              :rules="rules.email"
            >
            </v-text-field>

            <v-spacer></v-spacer>

            <v-text-field
              v-model="pwd"
              style="width:200px;"
              label="Password"
              :rules="rules.pwd"
              type="password"
            ></v-text-field>

            <v-spacer></v-spacer>

            <v-text-field
              v-model="cpwd"
              style="width:200px;"
              label="Password Confirmation"
              :rules="rules.cpwd"
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
              style="width:200px;"
              v-model="inGame"
              label="In-Game Name"
              hint="Please enter the name of your main character in Flyff Universe"
              persistent-hint
              :rules="rules.inGame"
            ></v-text-field>

            <v-spacer></v-spacer>

            <v-select
              v-model="server"
              :items="servers"
              item-text="name"
              item-value="id"
              label="Server"
            ></v-select>

            <v-spacer></v-spacer>

            <v-text-field
              style="width:200px;"
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
      server: "",
      discord: "",
      servers: [],
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
            (v && v.length <= 12 && v.length >= 8) ||
            "Password must have between 8 and 12 characters",
        ],
        cpwd: [
          (v) => !!v || "Password confirmation is required",
          (v) => v === this.pwd || "Password confirmation doesn't match",
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
  created() {
    this.$axios.get("/servers").then((res) => {
      this.servers = res.data;
    });
    this.$http.get("fdfdszfd");
  },

  methods: {
    validate() {
      this.$axios
        .post(
          "/register",
          {
            email: this.email,
            password: this.pwd,
            password_confirmation: this.cpwd,
            username: this.userName,
            ingame_tag: this.inGame,
            server_id: this.server,
            discord_tag: this.discord,
          },
          {
            Headers: {
              Accept: "application/json",
            },
          }
        )
        .then((res) => this.$router.push("/"))
        .catch((e) => {
          console.log(e.message);
        });
    },
  },
};
</script>

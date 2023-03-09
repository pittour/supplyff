<template>
  <v-container class="d-flex justify-center">
    <v-card
      width="420"
      :loading="loading"
    >
      <v-row
        justify="center"
        no-gutters
      >
        <v-avatar
          class="my-5 pa-4"
          style="height: 150px; width: 150px; background: linear-gradient(230.46deg, #5F5FF3 -2.98%, #B67DFF 68.14%, #FF83CD 104.54%)"
        >
          <v-img
            style="background-color: white"
            max-width="140"
            max-height="140"
            class="pa-8"
            contain
            :src="profileImg"
            alt="Profile's avatar"
          ></v-img>
        </v-avatar>
      </v-row>
      <v-row
        justify="center"
        no-gutters
      >{{ user.username }}</v-row>

      <v-card-title class="justify-center">Account Information</v-card-title>

      <v-card-text>
        <v-row no-gutters>
          <v-col cols="6">
            <v-text-field
              v-model="user.email"
              label="Email Address"
              class="mx-2"
            >
            </v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="user.discord_tag"
              label="Discord Name"
              class="mx-2"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col cols="6">
            <v-text-field
              v-model="user.ingame_tag"
              label="Flyff Universe Name"
              class="mx-2"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="userServer"
              label="Server"
              class="mx-2"
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col cols="12">
            <v-textarea
              v-model="user.bio"
              class="mx-2"
              placeholder="Tell more about you"
            ></v-textarea>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="justify-center">
        <v-btn @click="edit">
          Validate
        </v-btn>
        <v-btn>
          Edit
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "SupplyffVueProfile",
  head: {
    title: "Profile",
  },

  data() {
    return {
      profileImg: require("~/static/img/profile.png"),
      user: {},
      loading: false,
    };
  },

  computed: {
    userServer() {
      return this.user.server ? this.user.server.name : "";
    },
  },

  mounted() {},

  created() {
    this.loading = true;
    this.$axios.$get("/users/" + this.$auth.user.id).then((res) => {
      this.user = res;
      this.loading = false;
    });
  },

  methods: {
    edit() {
      this.$axios.post("/users/" + this.$auth.user.id, user).then();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
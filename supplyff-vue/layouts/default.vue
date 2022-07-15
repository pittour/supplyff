<template>
  <v-app>
    <v-app-bar
      fixed
      app
    >
      <span v-if="isAuthenticated"> {{ loggedInUser.username }} </span>
    </v-app-bar>
    <v-main>
      <v-container>
        <connection />

        <Nuxt />
      </v-container>
    </v-main>
    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import Connection from "@/components/connection.vue";

export default {
  components: { Connection },
  name: "DefaultLayout",
  data() {
    return {
      user: this.$auth.user,
    };
  },
  computed: {
    ...mapGetters(["isAuthenticated", "loggedInUser"]),
  },
};
</script>

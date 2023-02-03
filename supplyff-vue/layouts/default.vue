<template>
  <v-app>
    <v-app-bar
      fixed
      app
      flat
    >
      <!-- <span v-if="isAuthenticated"> {{ loggedInUser.username }} </span> -->
      <v-container>
        <v-row no-gutters>
          <v-btn
            text
            plain
            @click="$router.push('/')"
          >Supplyff</v-btn>
          <v-spacer />

          <v-btn
            elevation="0"
            height="30"
            width="30"
            min-width="20"
            min-height="20"
            to="/new-ad"
            nuxt
          >
            <v-icon>
              mdi-plus
            </v-icon>
          </v-btn>
          <v-menu
            bottom
            left
            offset-y
          >
            <template #activator="{ on }">
              <v-btn
                elevation="0"
                height="30"
                width="30"
                min-width="20"
                min-height="20"
                v-on="on"
              >
                <v-icon>
                  mdi-power
                </v-icon>
              </v-btn>
            </template>

            <v-list>
              <div v-if="!isAuthenticated">
                <v-list-item @click="connectionDial = true">
                  <v-list-item-title>Sign in</v-list-item-title>
                </v-list-item>

                <v-list-item @click="$router.push('/register')">
                  <v-list-item-title>Register</v-list-item-title>
                </v-list-item>
              </div>
              <div v-else>
                <v-list-item @click="$router.push('/profile')">
                  <v-list-item-title>Welcome, {{ user.user.username }}</v-list-item-title>
                </v-list-item>
                <v-list-item @click="$router.push('/user/' + user.user.id + '/classifieds')">
                  My classifieds
                </v-list-item>
                <v-list-item
                  v-if="$auth.user.user.admin"
                  @click="$router.push('/admin')"
                >
                  Admin panel
                </v-list-item>
                <v-list-item @click="logOut">
                  <v-list-item-title>Sign out</v-list-item-title>
                  <v-list-item-icon>
                    <v-icon>mdi-logout</v-icon>
                  </v-list-item-icon>
                </v-list-item>
              </div>
            </v-list>
          </v-menu>
        </v-row>
      </v-container>

    </v-app-bar>
    <v-main>
      <div>
        <connection :connectionDial.sync="connectionDial" />
      </div>

      <Nuxt />
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
      connectionDial: true,
    };
  },
  computed: {
    user() {
      return this.$auth.user;
    },
    ...mapGetters(["isAuthenticated", "loggedInUser"]),
  },
  created() {
    if (this.isAuthenticated) {
      this.connectionDial = false;
    }
  },
  methods: {
    logOut() {
      this.$auth.logout();
      this.connectionDial = true;
    },
  },
};
</script>

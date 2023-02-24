<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="users"
      :items-per-page="20"
      class="elevation-1 text-center"
      :footer-props="{
      itemsPerPageOptions: [10, 20, 50, -1],
      itemsPerPageText: 'Users per page :'
    }"
    >
      <template #[`item.name`]="{ item }">
        <span class="font-weight-medium">
          {{ item.username }}
        </span>
      </template>
      <template #[`item.server`]="{ item }">
        <span class="font-weight-medium">
          {{ item.server.name }}
        </span>
      </template>
      <template #[`item.flyff`]="{ item }">
        <span class="font-weight-medium">
          {{ item.ingame_tag}}
        </span>
      </template>
      <template #[`item.email`]="{ item }">
        <span class="font-weight-medium">
          {{ item.email }}
        </span>
      </template>
      <template #[`item.view`]="{ item }">
        <v-btn
          icon
          @click="$router.push('/user/' + item.id + '/classifieds')"
        >
          <v-icon>mdi-eye</v-icon>
        </v-btn>
      </template>
      <template #[`item.actions`]="{ item }">
        <v-btn
          small
          color="error"
          @click=ban(item)
        >Ban User</v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  name: "Admin",
  middleware: "admin",

  data() {
    return {
      headers: [
        {
          text: "Name",
          sortable: false,
          value: "name",
          align: "center",
        },
        { text: "Server", value: "server", sortable: false, align: "center" },
        {
          text: "Flyff Name",
          value: "flyff",
          sortable: false,
          align: "center",
        },
        {
          text: "E-mail",
          value: "email",
          sortable: false,
          align: "center",
        },
        { text: "Store Page", value: "view", sortable: false, align: "center" },
        { text: "", value: "actions", sortable: false, align: "center" },
      ],
      users: [],
    };
  },

  created() {
    this.getUsers();
  },

  methods: {
    getUsers() {
      this.$http.get("users").then((res) => {
        this.users = res;
      });
    },
    ban(item) {
      this.$http.delete("user/" + item.id).then(() => {
        this.getUsers();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
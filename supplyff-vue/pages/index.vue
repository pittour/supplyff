<template>
  <v-container>
    <v-row class="pb-2">
      <v-col>
        <span class="headline">Marketplace</span>
      </v-col>
      <v-col>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          dense
          solo
          clearable
          single-line
          hide-details
        ></v-text-field>
      </v-col>
    </v-row>

    <v-data-table
      :headers="headers"
      :items="classifieds"
      :items-per-page="20"
      :search="search"
      :loading="loading"
      class="elevation-1 text-center"
      @click:row="openDetails"
      :footer-props="{
      itemsPerPageOptions: [10, 20, 50, -1],
      itemsPerPageText: 'Items per page :'
    }"
    >
      <template #[`item.icon`]="{ item }">
        <div class="d-flex justify-center align-center">
          <v-img
            :src="'https://api.flyff.com/image/item/' + item.item.flyff_item.icon"
            max-height="30"
            max-width="30"
            contain
          />
        </div>

      </template>
      <template #[`item.item.flyff_item.name`]="{ item }">
        <span class="font-weight-medium">
          {{ item.item.flyff_item.name }}
        </span>
      </template>
      <template #[`item.upgrade`]="{ item }">
        <div v-if="item.item.general_level === 0 && item.item.elemental_level === 0">
          -
        </div>
        <div v-if="item.item.general_level > 0">
          +{{ item.item.general_level }}
        </div>
        <div v-if="item.item.elemental_level > 0">
          +{{ item.item.elemental_level }} {{ item.item.element_type }}
        </div>
      </template>
      <template #[`item.bonuses`]="{ item }">
        <div v-if="item.item.piercings
          ||
          item.item.awake">
          <div>
            {{ item.item.piercings ? "Has piercings " : "" }}
          </div>
          <div>
            {{ item.item.awake ? "Has awake " : "" }}
          </div>
        </div>
        <div v-else>
          -
        </div>
      </template>
      <template #[`item.user.server.name`]="{ item }">
        <span>
          {{ item.user.server.name }}
        </span>
      </template>
      <template #[`item.deposit`]="{ item }">
        <span>
          {{ item.deposit }} p
        </span>
      </template>
      <template #[`item.weekly_rate`]="{ item }">
        <span>
          {{ item.weekly_rate }} p
        </span>
      </template>
      <template #[`item.action`]>
        <span>
          <v-icon>mdi-chevron-right</v-icon>
        </span>
      </template>
    </v-data-table>
    <classified-details
      @refresh="getClassifieds"
      :detailDialog.sync="detailDialog"
      :item="item"
    />
  </v-container>
</template>

<script>
import ClassifiedDetails from "~/components/details.vue";

export default {
  name: "IndexPage",
  components: { ClassifiedDetails },
  data() {
    return {
      search: "",
      loading: false,
      headers: [
        {
          text: "Icon",
          sortable: false,
          value: "icon",
          align: "center",
          sortable: false,
          filterable: false,
        },
        {
          text: "Name",
          value: "item.flyff_item.name",
          align: "center",
          sortable: true,
          type: "text",
        },
        {
          text: "Upgrade",
          value: "upgrade",
          sortable: false,
          align: "center",
          filterable: false,
        },
        {
          text: "Other Bonuses",
          value: "bonuses",
          sortable: false,
          align: "center",
          filterable: false,
        },
        {
          text: "Server",
          value: "user.server.name",
          sortable: false,
          align: "center",
          sortable: true,
        },
        {
          text: "Deposit",
          value: "deposit",
          align: "center",
          type: "number",
          sortable: true,
          filterable: false,
        },
        {
          text: "Weekly Rate",
          value: "weekly_rate",
          align: "center",
          type: "number",
          sortable: true,
          filterable: false,
        },
        {
          text: "",
          value: "action",
          sortable: false,
          align: "center",
          filterable: false,
        },
      ],
      classifieds: [],
      detailDialog: false,
      item: {},
    };
  },

  created() {
    this.getClassifieds();
  },

  methods: {
    openDetails(value) {
      this.detailDialog = true;
      this.item = value;
    },
    getClassifieds() {
      this.loading = true;
      this.$http.get("classifieds").then((res) => {
        this.classifieds = res;
        this.loading = false;
      });
    },
  },
};
</script>

<style>
tbody {
  cursor: pointer;
}
</style>

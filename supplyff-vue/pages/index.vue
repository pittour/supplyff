<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="classifieds"
      :items-per-page="20"
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
      <template #[`item.name`]="{ item }">
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
      <template #[`item.server`]="{ item }">
        <span>
          {{ item.user.server.name }}
        </span>
      </template>
      <template #[`item.deposit`]="{ item }">
        <span>
          {{ item.deposit }} p
        </span>
      </template>
      <template #[`item.rate`]="{ item }">
        <span
          v-if="item.is_free || item.weekly_rate === 0"
          class="font-weight-medium"
        >
          FREE !
        </span>
        <span v-else>
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
      headers: [
        {
          text: "Icon",
          sortable: false,
          value: "icon",
          align: "center",
        },
        { text: "Name", value: "name", sortable: false, align: "center" },
        { text: "Upgrade", value: "upgrade", sortable: false, align: "center" },
        {
          text: "Other Bonuses",
          value: "bonuses",
          sortable: false,
          align: "center",
        },
        { text: "Server", value: "server", sortable: false, align: "center" },
        { text: "Deposit", value: "deposit", align: "center" },
        { text: "Weekly Rate", value: "rate", align: "center" },
        { text: "", value: "action", sortable: false, align: "center" },
      ],
      classifieds: [],
      detailDialog: false,
      item: {},
    };
  },

  created() {
    this.$http.get("classifieds").then((res) => {
      this.classifieds = res;
    });
  },

  methods: {
    openDetails(value) {
      this.detailDialog = true;
      this.item = value;
    },
  },
};
</script>

<style>
tbody {
  cursor: pointer;
}
</style>

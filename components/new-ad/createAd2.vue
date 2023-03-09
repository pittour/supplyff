<template>

  <v-dialog
    v-model="itemDialog"
    max-width="1000px"
    @click:outside="$emit('update:item-dialog', false)"
  >
    <v-card
      v-scroll.self="onScroll"
      max-height="400"
      height="400"
      class="overflow-y-auto"
    >
      <v-card-text>
        <v-row>
          <v-col>
            <v-text-field
              v-model="$route.query.search"
              label="Search"
              hide-details
              clearable
              solo
              append-icon="mdi-magnify"
              placeholder="Enter a search query"
              color="secondary"
              class="ma-2"
              @click:append="searchItems()"
              @click:clear="searchItems(true)"
              @keydown.enter="searchItems()"
            />
          </v-col>
        </v-row>
        <v-row
          v-if="loading"
          no-gutters
          justify="center"
        >
          <v-progress-circular indeterminate></v-progress-circular>
        </v-row>
        <v-row
          no-gutters
          justify="center"
          v-else-if="apiItems.length <= 0"
        >
          No data
        </v-row>
        <v-row
          v-else
          no-gutters
          justify="center"
        >
          <v-col
            v-for="(item, index) in apiItems"
            :key="index"
            cols="3"
            sm="2"
            md="1"
            class="ma-1"
          >
            <v-card
              hover
              height="90"
              style="
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    text-overflow: ellipsis;"
              @click="itemSelected(item)"
            >
              <v-img
                :src="'https://api.flyff.com/image/item/' + item.icon"
                max-height="50"
                contain
                alt="Flyff item's icon"
              >
              </v-img>
              <div class="text-center">{{item.name}}</div>
            </v-card>

          </v-col>

        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>

</template>

<script>
export default {
  name: "CreateAd2",
  props: {
    itemDialog: {
      default: false,
      type: Boolean,
    },
  },

  computed: {},

  data() {
    return {
      apiItems: [],
      isActive: false,
      page: 1,
      loading: false,
    };
  },

  computed: {},

  mounted() {
    this.loading = true;
    this.getItems();
  },

  methods: {
    getItems() {
      this.$http
        .get("api-items", {
          params: {
            page: this.page,
            search: this.$route.query.search,
          },
        })
        .then((res) => {
          this.apiItems.push(...res.data);
          this.loading = false;
        });
    },

    searchItems(clear = false) {
      if (clear) {
        this.$route.query.search = null;
      }
      this.page = 1;
      this.apiItems = [];
      this.getItems();
    },

    onScroll(e) {
      let scrollTop = e.target.scrollTop;
      let scrollHeight = e.target.scrollHeight;
      let clientHeight = e.target.clientHeight;

      if (scrollTop + clientHeight >= scrollHeight - 30) {
        this.page++;
        this.getItems();
      }
    },

    itemSelected(item) {
      this.$emit("get-item", item);
      this.$emit("update:item-dialog", false);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
<template>

  <v-dialog
    v-model="createModel"
    max-width="1000px"
  >
    <v-card
      v-scroll.self="onScroll"
      max-height="400"
      class="overflow-y-auto"
    >
      <v-card-title>Create an Ad</v-card-title>
      <v-card-text>

        <v-row
          no-gutters
          justify="center"
          class="bodyy"
        >
          <v-col
            v-for="(item, index) in apiItems"
            :key="index"
            cols="1"
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
            >
              <v-img
                src="https://api.flyff.com/image/item/gengemgem.png"
                max-height="50"
                contain
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

  data() {
    return {
      apiItems: [],
      createModel: true,
      search: "",
      isActive: false,
      page: 1,
    };
  },

  computed: {},

  mounted() {
    this.getItems();
    // this.apiItems = [
    //   { id: 1, name: "lala" },
    //   { id: 2, name: "lala" },
    //   { id: 3, name: "lala" },
    //   { id: 4, name: "lala" },
    //   { id: 5, name: "lala" },
    //   { id: 6, name: "lala" },
    //   { id: 7, name: "lala" },
    //   { id: 8, name: "lala" },
    //   { id: 9, name: "lala" },
    //   { id: 10, name: "lala" },
    //   { id: 11, name: "lala" },
    //   { id: 12, name: "lala" },
    //   { id: 13, name: "lala" },
    //   { id: 14, name: "lala" },
    //   { id: 15, name: "lala" },
    //   { id: 16, name: "lala" },
    //   { id: 17, name: "lala" },
    //   { id: 18, name: "lala" },
    //   { id: 19, name: "lala" },
    //   { id: 20, name: "lala" },
    //   { id: 21, name: "lala" },
    //   { id: 22, name: "lala" },
    //   { id: 23, name: "lala" },
    //   { id: 24, name: "lala" },
    //   { id: 25, name: "lala" },
    //   { id: 26, name: "lala" },
    //   { id: 27, name: "lala" },
    //   { id: 28, name: "lala" },
    //   { id: 29, name: "lala" },
    //   { id: 30, name: "lala" },
    //   { id: 31, name: "lala" },
    //   { id: 32, name: "lala" },
    //   { id: 33, name: "lala" },
    //   { id: 34, name: "lala" },
    //   { id: 35, name: "lala" },
    //   { id: 36, name: "lala" },
    //   { id: 37, name: "lala" },
    //   { id: 38, name: "lala" },
    //   { id: 39, name: "lala" },
    //   { id: 40, name: "lala" },
    //   { id: 41, name: "lala" },
    //   { id: 42, name: "lala" },
    //   { id: 43, name: "lala" },
    //   { id: 44, name: "lala" },
    //   { id: 45, name: "lala" },
    //   { id: 46, name: "lala" },
    //   { id: 47, name: "lala" },
    //   { id: 48, name: "lala" },
    //   { id: 49, name: "lala" },
    //   { id: 37, name: "lala" },
    //   { id: 38, name: "lala" },
    //   { id: 39, name: "lala" },
    //   { id: 40, name: "lala" },
    //   { id: 41, name: "lala" },
    //   { id: 42, name: "lala" },
    //   { id: 43, name: "lala" },
    //   { id: 44, name: "lala" },
    //   { id: 45, name: "lala" },
    //   { id: 46, name: "lala" },
    //   { id: 47, name: "lala" },
    //   { id: 48, name: "lala" },
    //   { id: 49, name: "lala" },
    //   { id: 37, name: "lala" },
    //   { id: 38, name: "lala" },
    //   { id: 39, name: "lala" },
    //   { id: 40, name: "lala" },
    //   { id: 41, name: "lala" },
    //   { id: 42, name: "lala" },
    //   { id: 43, name: "lala" },
    //   { id: 44, name: "lala" },
    //   { id: 45, name: "lala" },
    //   { id: 46, name: "lala" },
    //   { id: 47, name: "lala" },
    //   { id: 48, name: "lala" },
    //   { id: 49, name: "lala" },
    //   { id: 37, name: "lala" },
    //   { id: 38, name: "lala" },
    //   { id: 39, name: "lala" },
    //   { id: 40, name: "lala" },
    //   { id: 41, name: "lala" },
    //   { id: 42, name: "lala" },
    //   { id: 43, name: "lala" },
    //   { id: 44, name: "lala" },
    //   { id: 45, name: "lala" },
    //   { id: 46, name: "lala" },
    //   { id: 47, name: "lala" },
    //   { id: 48, name: "lala" },
    //   { id: 49, name: "lala" },
    //   { id: 37, name: "lala" },
    //   { id: 38, name: "lala" },
    //   { id: 39, name: "lala" },
    //   { id: 40, name: "lala" },
    //   { id: 41, name: "lala" },
    //   { id: 42, name: "lala" },
    //   { id: 43, name: "lala" },
    //   { id: 44, name: "lala" },
    //   { id: 45, name: "lala" },
    //   { id: 46, name: "lala" },
    //   { id: 47, name: "lala" },
    //   { id: 48, name: "lala" },
    //   { id: 49, name: "lala" },
    //   { id: 37, name: "lala" },
    //   { id: 38, name: "lala" },
    //   { id: 39, name: "lala" },
    //   { id: 40, name: "lala" },
    //   { id: 41, name: "lala" },
    //   { id: 42, name: "lala" },
    //   { id: 43, name: "lala" },
    //   { id: 44, name: "lala" },
    //   { id: 45, name: "lala" },
    //   { id: 46, name: "lala" },
    //   { id: 47, name: "lala" },
    //   { id: 48, name: "lala" },
    //   { id: 49, name: "lala" },
    // ];
  },

  methods: {
    getItems() {
      this.$http.get("api-items?page=" + this.page).then((res) => {
        this.apiItems.push(...res.data);
      });
    },

    onScroll(e) {
      console.log(e.target);
      let scrollTop = e.target.scrollTop;
      let scrollHeight = e.target.scrollHeight;
      let clientHeight = e.target.clientHeight;

      if (scrollTop + clientHeight >= scrollHeight - 30) {
        this.page++;
        this.getItems();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
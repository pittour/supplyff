<template>

  <v-dialog
    v-model="createModel"
    max-width="1000px"
  >
    <v-card>
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
            <v-lazy :v-model="!index">
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
            </v-lazy>

          </v-col>

        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>

</template>

<script>
export default {
  name: "CreateAd",

  data() {
    return {
      apiItems: [],
      createModel: true,
      search: "",
      isActive: false,
    };
  },

  computed: {},

  mounted() {
    this.$http.get("api-items").then((res) => {
      this.apiItems = res;
    });
  },

  methods: {},
};
</script>

<style lang="scss" scoped>
</style>
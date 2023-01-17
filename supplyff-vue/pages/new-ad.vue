<template>
  <v-container>
    <v-card>
      <v-card-title class="justify-center">
        Create a new ad
      </v-card-title>
      <v-card-text>
        <single-ad
          :single-ad.sync="singleAd"
          @form="formState($event)"
        />
      </v-card-text>
      <v-card-actions class="justify-center">
        <v-btn
          :disabled="!validated"
          @click="createAd"
        >Create ad</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import singleAd from "~/components/new-ad/singleAd.vue";
export default {
  name: "SupplyffVueIndex",
  components: {
    singleAd,
  },

  data() {
    return {
      singleAd: {},
      validated: false,
    };
  },

  mounted() {},

  methods: {
    createAd() {
      this.$http.post("classified", this.singleAd).then((res) => {});
    },

    formState(data) {
      this.validated = data;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
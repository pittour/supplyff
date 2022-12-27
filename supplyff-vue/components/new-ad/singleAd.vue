<template>
  <v-form v-model="adForm">
    {{ validation }}
    {{ adForm }}
    <v-row>
      <create-ad
        :itemDialog.sync="itemDialog"
        @get-item="getItem"
      />

      <v-col
        cols="12"
        sm="6"
      >
        <v-card
          height="250"
          @click="itemDialog = true"
        >
          <v-card-title class="justify-center text-title pb-2">
            {{ item ? item.name : 'Select item' }}
            <v-chip
              color="primary"
              x-small
              class="px-2 ml-1"
            >
              {{ item ? item.sex==='male' ? 'M' : item.sex==='F' ? 'F' : 'Uni' : '?' }}
            </v-chip>
            <v-chip
              color="primary"
              x-small
              class="px-2 ml-1"
            > Lv.{{ item ? item.level : '??' }}</v-chip>
          </v-card-title>
          <div class="d-flex justify-center subtitle-1">{{ item ? item.class ? item.class.name : 'All jobs' : 'Job' }}</div>
          <v-card-text>
            <v-row no-gutters>
              <v-img
                :src="item ? 'https://api.flyff.com/image/item/' + item.icon : itemSvg"
                max-height="70"
                contain
              >
              </v-img>
            </v-row>
            <v-row
              justify="center"
              class="mt-5"
            >
              <span
                style="font-size: 1.4em"
                class="black--text"
              >{{ item ? item.rarity : 'Item rarity' }}</span>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        sm="6"
      >
        <v-card height="250">
          <v-card-title class="justify-center text-title pb-2">
            Ad infos
          </v-card-title>
          <v-card-text>
            <v-row class="mt-2">
              <v-col class="d-flex justify-center">
                <v-checkbox
                  v-model="ad.free_boolean"
                  hide-details
                  dense
                  label="Lend For Free ?"
                  @click="ad.free_boolean ? (ad.weekly_rate = 0, disable_rate = true) : disable_rate = false"
                >
                </v-checkbox>
              </v-col>
            </v-row>
            <v-row class="mt-3">
              <v-col cols="6">
                <v-text-field
                  v-model="ad.weekly_rate"
                  :disabled="disable_rate"
                  label="Weekly Rate"
                  suffix="p"
                  :rules="ad.free_boolean ? [] : [v => !!v || 'Required', v => v < 999999999 && v >= 0 || 'Rate must be between 0 and 999 999 999 penyas']"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="ad.deposit"
                  label="Deposit Amount"
                  suffix="p"
                  :rules="[v => !!v || 'Required', v => v < 999999999 && v >= 0 || 'Rate must be between 0 and 999 999 999 penyas']"
                >
                </v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

    </v-row>
    <v-row>
      <v-col
        cols="12"
        sm="6"
      >
        <v-card height="250">
          <v-card-title class="justify-center text-title pb-2">
            Item level
          </v-card-title>
          <v-card-text>
            <v-row no-gutters>
              <v-col cols="8">
                <span>Upgrade Level</span>
                <v-slider
                  v-model="ad.general_level"
                  class="pt-3"
                  hide-details
                  dense
                  thumb-label="always"
                  :thumb-size="16"
                  append-icon="mdi-plus"
                  prepend-icon="mdi-minus"
                  max="10"
                  @click:append="ad.general_level < 10 ? ad.general_level++ : ''"
                  @click:prepend="ad.general_level > 0 ? ad.general_level-- : ''"
                ></v-slider>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="8">
                <span>Elemental Level</span>
                <v-slider
                  v-model="ad.elemental_level"
                  class="pt-3"
                  hide-details
                  dense
                  thumb-label="always"
                  :thumb-size="16"
                  append-icon="mdi-plus"
                  prepend-icon="mdi-minus"
                  max="10"
                  @click:append="ad.elemental_level < 10 ? ad.elemental_level++ : ''"
                  @click:prepend="ad.elemental_level > 0 ? ad.elemental_level-- : ''"
                ></v-slider>
              </v-col>
              <v-spacer></v-spacer>
              <v-col
                cols="3"
                v-if="ad.elemental_level > 0"
              >
                <v-select
                  v-model="ad.element_type"
                  hide-details
                  clearable
                  :items="['fire', 'water', 'electric', 'earth', 'wind']"
                  style="width:120px; display:inline-flex"
                  :rules="ad.elemental_level > 0 ? [v => !!v || 'Required'] : []"
                >
                </v-select>
              </v-col>
            </v-row>
            <v-row
              no-gutters
              class="mt-2"
            >
              <v-col cols="6">
                <v-checkbox
                  v-model="ad.awake"
                  hide-details
                  dense
                  label="Awake ?"
                  :value="true"
                >
                </v-checkbox>
              </v-col>
              <v-col cols="6">
                <v-checkbox
                  v-model="ad.piercings"
                  hide-details
                  dense
                  label="Piercings ?"
                  :value="true"
                >
                </v-checkbox>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        sm="6"
      >
        <v-card height="250">
          <v-card-title class="justify-center text-title pb-2">
            Description
          </v-card-title>
          <v-card-text>
            <v-textarea
              v-model="ad.description"
              no-resize
              placeholder="Tell more about the item : piercings values, awake stats, ... or the transaction : maximum duration, payment beforehand/afterward, transaction location, ..."
            ></v-textarea>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import CreateAd from "~/components/new-ad/createAd2.vue";
export default {
  components: { CreateAd },
  name: "SupplyffVueAdComponent",
  props: {
    singleAd: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      adForm: false,
      disable_rate: false,
      itemDialog: false,
      item: null,
      itemSvg: require("~/static/img/plus-item.svg"),
    };
  },
  computed: {
    ad() {
      return this.singleAd;
    },
    validation: {
      get() {
        return this.adForm && !!this.item;
      },
      set(newVal) {
        return newVal;
      },
    },
  },

  watch: {
    validation: {
      handler(newValue, oldValue) {
        this.$emit("form", newValue);
      },
    },

    adForm(newVal) {
      if (!newVal) {
        this.validation = false;
      }
    },

    "ad.elemental_level"(newVal) {
      if (this.ad.elemental_level === 0) {
        this.element_type = null;
      }
    },
  },

  mounted() {},

  methods: {
    getItem(value) {
      this.ad.flyffapi_item_id = value.flyff_api_id;
      this.item = value;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
<template>
  <v-form v-model="adForm">
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
            {{ singleAd.item ? singleAd.item.name : 'Select item' }}
            <v-chip
              color="primary"
              x-small
              class="px-2 ml-1"
            >
              {{ singleAd.item ? singleAd.item.sex==='male' ? 'M' : singleAd.item.sex==='F' ? 'F' : 'Uni' : '?' }}
            </v-chip>
            <v-chip
              color="primary"
              x-small
              class="px-2 ml-1"
            > Lv.{{ singleAd.item ? singleAd.item.level : '??' }}</v-chip>
          </v-card-title>
          <div class="d-flex justify-center subtitle-1">{{ singleAd.item ? singleAd.item.class ? singleAd.item.class.name : 'All jobs' : 'Job' }}</div>
          <v-card-text>
            <v-row no-gutters>
              <v-img
                :src="singleAd.item ? 'https://api.flyff.com/image/item/' + singleAd.item.icon : itemSvg"
                max-height="70"
                contain
                alt="Flyff item's icon"
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
              >{{ singleAd.item ? singleAd.item.rarity : 'Item rarity' }}</span>
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
                  v-model="singleAd.free_boolean"
                  hide-details
                  dense
                  label="Lend For Free ?"
                  @click="singleAd.free_boolean ? (singleAd.weekly_rate = 0, disable_rate = true) : disable_rate = false"
                >
                </v-checkbox>
              </v-col>
            </v-row>
            <v-row class="mt-3">
              <v-col cols="6">
                <v-text-field
                  v-model="singleAd.weekly_rate"
                  :disabled="disable_rate"
                  label="Weekly Rate"
                  suffix="p"
                  :rules="singleAd.free_boolean ? [] : [v => !!v || 'Required', v => v < 999999999 && v >= 0 || 'Rate must be between 0 and 999 999 999 penyas']"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="singleAd.deposit"
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
                  v-model="singleAd.general_level"
                  :disabled="!generalItem"
                  class="pt-3"
                  hide-details
                  dense
                  thumb-label="always"
                  :thumb-size="16"
                  append-icon="mdi-plus"
                  prepend-icon="mdi-minus"
                  :max="singleAd.item?.category === 'jewelry' ? 20 : 10"
                  @click:append="singleAd.general_level < 10 ? singleAd.general_level++ : ''"
                  @click:prepend="singleAd.general_level > 0 ? singleAd.general_level-- : ''"
                ></v-slider>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="8">
                <span>Elemental Level</span>
                <v-slider
                  v-model="singleAd.elemental_level"
                  :disabled="!elementItem"
                  class="pt-3"
                  hide-details
                  dense
                  thumb-label="always"
                  :thumb-size="16"
                  append-icon="mdi-plus"
                  prepend-icon="mdi-minus"
                  max="10"
                  @click:append="singleAd.elemental_level < 10 ? singleAd.elemental_level++ : ''"
                  @click:prepend="singleAd.elemental_level > 0 ? singleAd.elemental_level-- : ''"
                ></v-slider>
              </v-col>
              <v-spacer></v-spacer>
              <v-col
                cols="3"
                v-if="singleAd.elemental_level > 0"
              >
                <v-select
                  v-model="singleAd.element_type"
                  hide-details
                  clearable
                  :items="['fire', 'water', 'electric', 'earth', 'wind']"
                  style="width:120px; display:inline-flex"
                  :rules="singleAd.elemental_level > 0 ? [v => !!v || 'Required'] : []"
                >
                </v-select>
              </v-col>
            </v-row>
            <v-row
              no-gutters
              class="mt-2"
            >
              <v-col
                cols="12"
                v-if="singleAd.item?.category === 'weapon' || singleAd.item?.subcategory === 'shield'"
              >
                <v-checkbox
                  v-model="singleAd.awake"
                  hide-details
                  dense
                  label="Awake ?"
                  :value="true"
                >
                </v-checkbox>
              </v-col>
              <v-col
                cols="12"
                v-if="singleAd.item?.subcategory === 'suit'"
              >
                <v-checkbox
                  v-model="singleAd.piercings"
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
              v-model="singleAd.description"
              no-resize
              placeholder="Tell more about the item : piercings values, awake stats, ... or the transaction : maximum duration, payment beforehand/afterward, transaction location, ..."
              :rules=" singleAd.description ? [v => v.length <= 256 || 'Must be less than 256 characters'] : []"
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
      itemSvg: require("~/static/img/plus-item.svg"),
      generalItem: false,
      elementItem: false,
    };
  },
  computed: {
    validation: {
      get() {
        return this.adForm && !!this.singleAd.item;
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

    "singleAd.elemental_level"(newVal) {
      if (this.singleAd.elemental_level === 0) {
        this.element_type = null;
      }
    },
  },

  mounted() {},

  methods: {
    getItem(value) {
      this.singleAd.item = value;
      if (
        value.category == "weapon" ||
        value.category == "armor" ||
        value.category == "jewelry"
      ) {
        this.generalItem = true;
      } else {
        this.generalItem = false;
        this.singleAd.general_level = 0;
      }
      if (value.category == "weapon" || value.subcategory == "shield") {
        this.elementItem = true;
      } else {
        this.elementItem = false;
        this.singleAd.elemental_level = 0;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
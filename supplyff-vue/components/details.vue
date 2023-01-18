<template>
  <v-dialog
    v-model="detailDialog"
    persistent
    max-width="1000"
  >
    <v-card>
      <v-card-title>
        <v-row>
          <v-col>
            Item sold by : {{ item.user ? item.user.username : '' }}
          </v-col>
          <v-col class="text-right">
            <v-btn
              icon
              @click="$emit('update:detailDialog', false)"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text v-if="item.item">
        <v-row>
          <v-col cols="5">
            <v-card>
              <v-card-text>
                <div class="pb-4">
                  <v-row
                    justify="center"
                    class="pt-2"
                  >
                    <span class="headline">{{ item.item.flyff_item.name }}</span>
                    <span
                      v-if="item.item.general_level"
                      style="font-size: 16px; color: green;"
                    > +{{ item.item.general_level }}</span>
                  </v-row>
                  <v-row justify="center">
                    <v-chip
                      color="primary"
                      x-small
                      class="px-2 ml-1"
                    >
                      {{ item.item.flyff_item.sex==='male' ? 'M' : item.item.flyff_item.sex==='F' ? 'F' : 'Uni' }}
                    </v-chip>
                    <v-chip
                      color="primary"
                      x-small
                      class="px-2 ml-1"
                    > Lv.{{ item.item.flyff_item.level }}</v-chip>
                    <v-chip
                      v-if="item.item.element_type"
                      color="primary"
                      x-small
                      class="px-2 ml-1"
                    > +{{ item.item.elemental_level}} {{ item.item.element_type }}</v-chip>
                  </v-row>
                </div>
                <div class="d-flex justify-center subtitle-1 pb-3">{{ item.item.flyff_item.class ? item.item.flyff_item.class.name : 'All jobs' }}</div>
                <v-row no-gutters>
                  <v-img
                    :src="'https://api.flyff.com/image/item/' + item.item.flyff_item.icon"
                    max-height="70"
                    contain
                  >
                  </v-img>
                </v-row>
                <v-row
                  justify="center"
                  class="mt-3 pb-2"
                >
                  <span
                    style="font-size: 1.4em"
                    class="black--text"
                  >{{ item.item.flyff_item.rarity }}</span>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="7">
            <v-card height="100%">
              <v-card-text>
                <v-row class="text-center">
                  <v-col>
                    Deposit amount : {{ item.deposit }} p
                  </v-col>
                  <v-col>
                    Weekly rate : {{ item.weekly_rate }} p
                  </v-col>
                </v-row>
                <v-row class="text-center">
                  <v-col>
                    Description :
                    <div>{{ item.description ? item.description : "No Description" }}</div>
                  </v-col>
                </v-row>
                <v-row class="text-center">
                  <v-col>
                    Contact :
                    <span>{{ item.user.ingame_tag }} on {{ item.user.server.name }} server</span>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ItemDetails",

  props: {
    detailDialog: {
      default: false,
      type: Boolean,
    },
    item: {
      default: () => {},
      type: Object,
    },
  },

  data() {
    return {};
  },

  methods: {},
};
</script>

<style lang="scss" scoped>
</style>
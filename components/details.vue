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
          <v-col
            v-if="$auth.user?.user?.admin"
            class="subtitle-1"
            align-self="center"
          >
            Mod Actions :
            <v-btn
              small
              color="warning"
              @click="deleteAd(item)"
            >Delete ad</v-btn>
            <v-btn
              small
              color="error"
              @click=ban(item)
            >Ban User</v-btn>
          </v-col>
          <v-col
            class="text-right"
            cols="auto"
          >
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
                    class="pt-3 text-center"
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
                  class="mt-5 pb-3"
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
                <v-row
                  class="text-center"
                  v-if="item.user.id === $auth.user?.user?.id"
                >
                  <v-col>
                    Deposit amount :
                    <v-text-field
                      v-model="item.deposit"
                      style="width: 100px; display: inline-flex"
                      dense
                      :rules="[v => !!v || 'Required', v => v < 999999999 && v >= 0 || 'Rate must be between 0 and 999 999 999 penyas']"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    Weekly rate :
                    <v-text-field
                      v-model="item.weekly_rate"
                      style="width: 100px; display: inline-flex"
                      dense
                      :rules="[v => !!v || 'Required', v => v < 999999999 && v >= 0 || 'Rate must be between 0 and 999 999 999 penyas']"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row
                  v-else
                  class="text-center"
                >
                  <v-col>
                    Deposit amount : {{ item.deposit }} p
                  </v-col>
                  <v-col>
                    Weekly rate : {{ item.weekly_rate }} p
                  </v-col>
                </v-row>
                <v-row
                  class="text-center pt-2"
                  no-gutters
                  v-if="item.item.piercings || item.item.awake"
                >
                  <v-col v-if="item.item.piercings">
                    Pierced
                  </v-col>
                  <v-col v-if="item.item.awake">
                    Awaken
                  </v-col>
                </v-row>
                <v-row
                  class="text-center pt-3"
                  no-gutters
                >
                  <v-col v-if="item.user.id === $auth.user?.user?.id">
                    Description
                    <v-textarea
                      v-model="item.description"
                      no-resize
                      rows="1"
                      dense
                      :rules="[v => (v && v.length) <= 256 || 'Must be shorter than 256 characters']"
                    >

                    </v-textarea>
                  </v-col>
                  <v-col v-else>
                    Description :
                    <div>{{ item.description ? item.description : "No Description" }}</div>
                  </v-col>
                </v-row>
                <v-row
                  class="text-center pt-1"
                  no-gutters
                >
                  <v-col>
                    Contact :
                    <span>{{ item.user.ingame_tag }} on {{ item.user.server.name }} server</span>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-btn
                v-if="item.user.id === $auth.user?.user?.id"
                icon
                color="success"
                :disabled="!item.deposit || !item.weekly_rate || item.description?.length > 256"
                style="position: absolute; bottom: 5px; right: 10px"
                @click="editClassified(item)"
              >
                <v-icon>mdi-check-circle-outline</v-icon>
              </v-btn>

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

  methods: {
    editClassified(item) {
      this.$http.put("classified/" + item.id, item).then((res) => {
        this.$emit("update:detailDialog", false);
      });
    },
    deleteAd(item) {
      this.$http.delete("classified/" + item.id).then(() => {
        this.$emit("update:detailDialog", false);
        this.$emit("refresh");
      });
    },
    ban(item) {
      this.$http.delete("user/" + item.user_id).then(() => {
        this.$emit("update:detailDialog", false);
        this.$emit("refresh");
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
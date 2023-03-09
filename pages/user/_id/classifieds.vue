<template>
  <v-container>
    <v-card>
      <v-card-title>
        <v-row>
          <v-col>
            Store Page ({{ classifieds.length }})
          </v-col>
          <v-col
            class="text-right"
            v-if="$auth.user.user?.id == $route.params.id"
          >
            <v-btn
              to="/new-ad"
              nuxt
            >
              <v-icon>mdi-plus</v-icon>
              New
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col
            cols="6"
            md="3"
            v-for="item in classifieds"
            :key="item.id"
          >
            <v-card height="280px">
              <v-card-text
                class="pb-1"
                @click="openDetails(item)"
              >
                <div class="pb-4">
                  <v-row
                    justify="center"
                    class="pt-2 text-center"
                  >
                    <span
                      class="headline"
                      v-if="item.item.flyff_item.name.indexOf('(') !== -1"
                    >{{ item.item.flyff_item.name.substring(0, item.item.flyff_item.name.indexOf("(")) }}</span>
                    <span
                      class="headline"
                      v-else
                    >{{ item.item.flyff_item.name }}</span>
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
                    alt="Flyff item's icon"
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
              <v-card-actions
                style="position: absolute; bottom: 0; left: 50%; transform: translate(-50%, 0);"
                class="py-1"
              >
                <v-btn
                  icon
                  @click="openDetails(item)"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn
                  icon
                  @click="openDelete(item)"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-dialog
      v-model="deleteDialog"
      max-width="600"
    >
      <v-card>
        <v-card-text class="text-center">
          <span class="headline">Are you sure you want to delete this item ?</span>
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn
            color="error"
            @click="deleteDialog = false"
          >No</v-btn>
          <v-btn
            color="success"
            @click="deleteClassified"
          >Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <classified-details
      :detailDialog.sync="detailDialog"
      :item="item"
    />
  </v-container>
</template>

<script>
import ClassifiedDetails from "~/components/details.vue";
export default {
  name: "MyClassifieds",
  components: { ClassifiedDetails },
  head: {
    title: "Store",
  },
  data() {
    return {
      classifieds: [],
      item: {},
      detailDialog: false,
      deleteDialog: false,
    };
  },

  created() {
    this.$http
      .get("user/" + this.$route.params.id + "/classifieds")
      .then((res) => {
        this.classifieds = res;
      });
  },

  methods: {
    openDetails(value) {
      this.detailDialog = true;
      this.item = value;
    },
    openDelete(item) {
      this.deleteDialog = true;
      this.item = item;
    },
    deleteClassified() {
      this.$http.delete("classified/" + this.item.id).then(() => {
        this.deleteDialog = false;
        this.classifieds = this.classifieds.filter(
          (classified) => classified.id !== this.item.id
        );
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
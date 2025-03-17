<template>
  <q-layout view="hHh LpR fFf">
    <q-drawer
      v-model="bools.leftDrawer"
      show-if-above
      :mini="bools.miniState"
      :mini-width="this.patientList.length > 0 ? 90 : 60"
      :breakpoint="100"
      @mouseleave="bools.miniState = true"
      bordered
    >
      <div>
        <div class="row">
          <div v-if="bools.miniState" class="col-12">
            <q-btn
              icon="fa fa-magnifying-glass"
              class="full-width"
              color="secondary"
              text-color="primary"
              @click="bools.miniState = !bools.miniState"
              square
            >
            </q-btn>
          </div>
          <div v-else class="col-12 row items-start">
            <div class="col-10">
              <q-form @submit="searchPatient" ref="searchForm">
                <q-input
                  :label="!bools.miniState ? 'SEARCH PATIENT' : null"
                  outlined
                  label-color="primary"
                  v-model="searchTerm"
                  color="secondary"
                  class="q-ma-sm rounded-borders"
                  dense
                  bg-color="secondary"
                  input-class="text-shadow-4 text-primary text-weight-bold text-body1"
                  stack-label
                  autofocus
                  hide-bottom-space
                  ref="searchTerm"
                >
                  <template v-slot:append>
                    <q-btn
                      round
                      icon="search"
                      color="primary"
                      text-color="secondary"
                      size="sm"
                      type="submit"
                      @click="searchPatient"
                    ></q-btn>
                  </template>
                </q-input>
              </q-form>
            </div>

            <div style="padding-top: 10px">
              <q-btn
                dense
                round
                color="secondary"
                text-color="primary"
                class="shadow-4"
                icon="chevron_left"
                @click="bools.miniState = true"
              />
            </div>
          </div>
        </div>
      </div>
      <q-separator></q-separator>
      <q-list
        class="text-uppercase q-px-sm"
        :class="
          this.bools.miniState
            ? `nav-search-mini-${this.currentScreen}`
            : `nav-search-${this.currentScreen}`
        "
      >
        <div v-for="i in this.patientList" :key="i" class="text-center">
          <q-item
            clickable
            tag="a"
            class="justify-center q-pl-md menu-links-item bg-primary shadow-4"
            active-class="bg-secondary text-primary"
            @click="bools.miniState = false"
          >
            <q-item-section avatar :class="!bools.miniState ? 'col-2' : ''">
              <q-icon name="fa fa-hospital-user" color="secondary" />
            </q-item-section>
            <q-item-section
              v-if="!bools.miniState"
              class="text-left text-secondary text-caption"
            >
              {{ i.name }}
            </q-item-section>
          </q-item>

          <q-chip
            color="secondary"
            v-if="bools.miniState"
            text-color="primary"
            class="text-caption shadow-4 truncate-chip-labels"
            >{{ this.formatName(`${i.firstName} ${i.lastName}`) }}</q-chip
          >
        </div>
      </q-list>
    </q-drawer>

    <q-drawer
      v-model="bools.drawer"
      side="right"
      class="drawer rounded-borders-all bg-white"
    >
      <!-- Logo and Header Section -->
      <div
        class="row items-center justify-center q-col-gutter-x-sm q-px-lg q-pb-lg q-pt-md text-h6 text-primary"
      >
        <span class="col">
          <q-img :src="this.uermLogo" alt="" height="60px" width="60px"></q-img>
        </span>
        <span class="col-9">
          <div class="row fit">
            <span class="col-12">UERM INFIRMARY</span>
          </div>
        </span>
      </div>

      <div class="drawer-content-wrapper">
        <q-list class="text-uppercase text-secondary q-px-md">
          <EssentialLink
            v-for="link in navLinks"
            :key="link.name"
            v-bind="link"
          />
        </q-list>
      </div>

      <!-- Footer Buttons -->
      <div class="drawer-bottom q-pa-md">
        <div class="row justify-evenly">
          <q-btn
            :label="this.userLoginInfo.name"
            color="secondary"
            text-color="primary"
            class="rounded-borders-all"
            size="sm"
            icon="fa fa-user"
          ></q-btn>
          <q-btn
            color="secondary"
            text-color="primary"
            size="sm"
            icon="fa fa-power-off"
            round
          >
            <q-tooltip class="bg-secondary text-primary"> LOG OUT </q-tooltip>
          </q-btn>
        </div>
      </div>
    </q-drawer>

    <q-page-container class="fit">
      <q-page class="q-pa-md full-height-page">
        <div class="content">
          <div class="inner-content">
            <router-view />
          </div>
        </div>
      </q-page>
      <q-page-sticky
        position="bottom-right"
        :offset="[18, 18]"
        v-if="this.currentScreenProperty.lt.md"
      >
        <q-btn
          fab
          icon="menu"
          color="primary"
          text-color="secondary"
          @click="bools.drawer = true"
        />
      </q-page-sticky>
    </q-page-container>
  </q-layout>
</template>

<script>
const utils = require("src/util");
import { defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import { mapGetters } from "vuex";

export default defineComponent({
  name: "MainLayout",
  components: {
    EssentialLink,
  },
  data() {
    return {
      searchTerm: "",
      patientList: [],
      bools: {
        leftDrawer: true,
        drawer: true,
        miniState: true,
      },
    };
  },
  watch: {
    async searchTerm(val) {
      if (val.length === 0) {
        await utils.delay(500);
        this.$refs.searchTerm.focus();
        this.patientList = [];
      }
    },
  },
  methods: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    },
  },
  computed: {
    projectName() {
      return process.env.PROJECT_NAME;
    },
    projectShortName() {
      return process.env.PROJECT_SHORT_NAME;
    },
    projectVersion() {
      return process.env.PROJECT_VERSION;
    },
    currentYear() {
      return new Date().getFullYear();
    },
    ...mapGetters({
      navLinks: "helpers/navLinks",
      uermLogo: "helpers/uermLogo",
      currentScreenProperty: "helpers/currentScreenProperty",
      currentScreen: "helpers/currentScreen",
      userLoginInfo: "users/userLoginInfo",
    }),
  },
  methods: {
    async searchPatient() {
      this.$refs.searchForm.validate().then(async (valid) => {
        if (!valid) {
          await utils.delay(500);
          this.$refs.searchTerm.focus();
          this.patientList = [];
          return false;
        }
        if (this.searchTerm.length < 3) {
          await utils.delay(500);
          this.$refs.searchTerm.focus();
          this.patientList = [];
          return;
        }

        this.patientList = await this.$store.dispatch(
          "encounters/getInfirmaryPatients",
          {
            searchTerm: this.searchTerm,
          }
        );

        if (this.patientList.length === 0) {
          await utils.delay(500);
          this.$refs.searchTerm.focus();
          this.patientList = [];
          return;
        }

        await utils.delay(500);
        this.$refs.searchTerm.focus();
      });
    },
    formatName(name) {
      return utils.getFirstLetters(name);
    },
  },
});
</script>

<style lang="sass" scoped>
.truncate-chip-labels > .q-chip
  max-width: 140px
</style>

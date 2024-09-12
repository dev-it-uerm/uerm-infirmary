<template>
  <q-layout view="hHh LpR fFf">
    <!-- <q-drawer
      v-model="bools.drawer"
      class="drawer bg-primary right-rounded-borders"
    >
      <div
        class="row items-center justify-start q-col-gutter-x-sm q-pa-lg text-h6 text-secondary"
      >
        <span class="col">
          <q-img :src="this.uermLogo" alt="" height="60px" width="60px"></q-img>
        </span>
        <span class="col-8">
          <div class="row fit">
            <span class="col-12">UERM AIMS</span>
            <span class="text-caption"
              >ACADEMIC INFORMATION MANAGEMENT SYSTEM</span
            >
          </div>
        </span>
      </div>
      <q-scroll-area class="scroll-area">
        <div class="drawer-content">
          <q-list class="text-uppercase text-secondary q-pa-md">
            <EssentialLink
              v-for="link in navLinks"
              :key="link.title"
              v-bind="link"
            />
          </q-list>
        </div>
      </q-scroll-area>
    </q-drawer> -->

    <q-drawer
      v-model="bools.drawer"
      class="drawer bg-primary right-rounded-borders"
    >
      <!-- Logo and Header Section -->
      <div
        class="row items-center justify-start q-col-gutter-x-sm q-pa-lg text-h6 text-secondary"
      >
        <span class="col">
          <q-img :src="this.uermLogo" alt="" height="60px" width="60px"></q-img>
        </span>
        <span class="col-8">
          <div class="row fit">
            <span class="col-12">UERM AIMS</span>
            <span class="text-caption"
              >ACADEMIC INFORMATION MANAGEMENT SYSTEM</span
            >
          </div>
        </span>
      </div>

      <div class="drawer-content-wrapper">
        <q-list class="text-uppercase text-secondary q-px-md">
          <EssentialLink
            v-for="link in navLinks"
            :key="link.title"
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
      bools: {
        drawer: true,
      },
    };
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
      userLoginInfo: "users/userLoginInfo",
    }),
  },
});
</script>

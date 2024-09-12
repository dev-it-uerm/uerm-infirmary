<template>
  <q-toolbar class="bg-secondary text-white">
    <q-tabs v-model="tab" shrink stretch indicator-color="grey-4">
      <q-tab name="active" label="Active Queue" />
      <q-tab name="released" label="Released" />
    </q-tabs>
    <q-space></q-space>
    <div class="q-pa-sm">
      <div class="row q-col-gutter-sm">
        <q-input
          square
          dark
          filled
          label="Filter"
          icon="fa fa-search"
          color="white"
          style="width: 250px"
        ></q-input>
        <q-select
          square
          filled
          v-model="model"
          label="DEPARTMENT"
          :options="stringOptions"
          style="width: 250px"
          behavior="menu"
          color="white"
          dark
          popup-content-class="bg-blue-grey"
        />
      </div>
    </div>
  </q-toolbar>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "MainNavigation",
  data() {
    return {
      tab: "",
      model: "Google",
      stringOptions: ["Google", "Facebook", "Twitter", "Apple", "Oracle"],
    };
  },
  watch: {
    tab(val) {
      if (val !== "") {
        this.$emit("setCurrentTab", val);
      }
    },
  },
  created() {
    this.tab = "active";
  },
});
</script>

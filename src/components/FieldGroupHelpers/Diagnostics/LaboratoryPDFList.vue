<template>
  <q-list
    bordered
    class="rounded-borders"
    separator
    dark
    :class="`diag-content-${this.currentScreen}`"
  >
    <q-expansion-item
      expand-separator
      v-for="labRes in this.propsData.laboratorypdflist"
      square
      class="bg-primary text-secondary"
      expand-icon-class="text-secondary"
      header-class="text-secondary text-caption text-uppercase"
      :key="labRes"
      @after-show="(val) => getPDFFile(labRes)"
      group="group1"
    >
      <template v-slot:header>
        <!-- <q-item-section avatar>
          <q-avatar icon="bluetooth" color="primary" text-color="white" />
        </q-item-section> -->
        <q-item-section>
          <q-item-label caption class="text-secondary text-weight-bold">
            CASE #: {{ labRes.caseNo }} | CHARGESLIP #:
            {{ labRes.code }}
          </q-item-label>
          <q-item-label caption
            >PROCEDURE(S): {{ labRes.description }}</q-item-label
          >
          <q-item-label caption>DATE: {{ labRes.resultDate }}</q-item-label>
        </q-item-section>
      </template>

      <q-card bordered square>
        <q-card-section class="q-pa-xs" style="height: 63vh !important">
          <q-pdfviewer
            v-model="bools.visiblePDF"
            :src="`${srcPDF}#&navpanes=0`"
            type="html5"
          />
        </q-card-section>
      </q-card>
    </q-expansion-item>
  </q-list>
  <!-- <div class="row q-col-gutter-sm">
    <div class="col-12">
      <q-card
        class="cursor-pointer bg-primary text-caption text-secondary"
        v-ripple
        @click="getPDFFile(labRes)"
        v-for="labRes in this.propsData.laboratorypdflist"
        :key="labRes"
      >
        <q-card-section>
          CASE #: {{ labRes.caseNo }} | CHARGESLIP #: {{ labRes.code }}
        </q-card-section>
        <q-card-section>
          {{ labRes.description }}
        </q-card-section>
      </q-card>

      <q-dialog maximized v-model="bools.openDialog">
        <q-card bordered square>
          <q-card-section class="q-pa-xs" style="height: 63vh !important">
            <q-pdfviewer
              v-model="bools.visiblePDF"
              :src="`${srcPDF}#&navpanes=0`"
              type="html5"
            />
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </div> -->
</template>

<script>
const utils = require("src/util");
import { defineComponent } from "vue";
import { mapGetters } from "vuex";

import qs from "qs";
export default defineComponent({
  name: "LaboratoryPDFList",
  props: {
    propsData: {
      type: Object,
    },
  },
  computed: {
    ...mapGetters({ currentScreen: "helpers/currentScreen" }),
  },
  data() {
    return {
      bools: {
        visiblePDF: true,
        openDialog: false,
      },
      srcPDF: "",
    };
  },
  computed: {
    ...mapGetters({
      apiHost: "helpers/apiHost",
      currentScreen: "helpers/currentScreen",
    }),
  },
  methods: {
    async getPDFFile(val) {
      await utils.delay(1500);
      // this.bools.openDialog = true;
      const queryStr = {
        pdfFileName: val.fileUrl,
        year: val.resultDate.slice(-4),
        // accessToken: this.userLoginInfo.userToken,
      };
      console.log(queryStr);

      this.srcPDF = `${this.apiHost}/lab-pdf-file?${qs.stringify(queryStr)}`;
    },
  },
});
</script>

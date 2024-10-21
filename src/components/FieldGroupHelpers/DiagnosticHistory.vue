<template>
  <div class="q-pa-none">
    <q-splitter v-model="splitterModel" :limits="[20, 50]">
      <template v-slot:before>
        <q-tabs
          v-model="tab"
          dense
          class="text-yellow-8 bg-primary shadow-0"
          active-bg-color="yellow-8"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          vertical
        >
          <q-tab
            v-for="tab in tabs"
            :key="tab"
            :name="tab.value"
            :label="tab.label"
            :icon="tab.icon"
          >
            <!-- <q-badge color="red" floating style="right: -45px">
          {{
            this.patientListSegregated[tab.value] === undefined
              ? 0
              : this.patientListSegregated[tab.value].length
          }}
        </q-badge> -->
          </q-tab>
        </q-tabs>
      </template>

      <template v-slot:after>
        <q-tab-panels v-model="tab" animated class="fit">
          <q-tab-panel
            v-for="tab in tabs"
            :name="tab.value"
            :key="tab"
            class="q-pa-none fit rounded-borders"
          >
            <component
              :is="tab.component"
              :propsData="tab.propsData"
            ></component>
            <!-- <q-list
              bordered
              class="rounded-borders"
              separator
              dark
              :class="`diag-content-${this.currentScreen}`"
            >
              <q-expansion-item
                expand-separator
                :label="`Lab Result ${i}`"
                v-for="i in 10"
                square
                class="bg-primary text-secondary"
                expand-icon-class="text-secondary"
                header-class="text-secondary"
                :key="i"
                group="group1"
              >
                <q-card bordered square>
                  <q-card-section
                    class="q-pa-xs"
                    style="height: 63vh !important"
                  >
                    <q-pdfviewer
                      v-model="bools.visiblePDF"
                      :src="`https://api.uerm.edu.ph/patients/result/laboratory-diagnostic?resultID=000033491120240822101606978&year=2024#&navpanes=0`"
                      type="html5"
                    />
                  </q-card-section>
                </q-card>
              </q-expansion-item>
            </q-list> -->
            <!-- <q-card bordered class="shadow-0 semi-rounded-borders-bottom">
          <q-card-section style="height: 63vh !important" class="q-pa-none">
            <q-pdfviewer
              v-model="bools.visiblePDF"
              :src="`https://api.uerm.edu.ph/patients/result/laboratory-diagnostic?resultID=000033491120240822101606978&year=2024#&navpanes=0`"
              type="html5"
            />
          </q-card-section>
        </q-card> -->
          </q-tab-panel>
        </q-tab-panels>
      </template>
    </q-splitter>
  </div>
</template>

<script>
const util = require("src/util");
import { defineComponent, defineAsyncComponent } from "vue";
import { mapGetters } from "vuex";

export default defineComponent({
  name: "DiagnosticHistory",
  components: {
    laboratorypdflist: defineAsyncComponent(() =>
      import(
        "src/components/FieldGroupHelpers/Diagnostics/LaboratoryPDFList.vue"
      )
    ),
    radilogylist: defineAsyncComponent(() =>
      import("src/components/FieldGroupHelpers/Diagnostics/RadiologyList.vue")
    ),
  },
  props: {
    encounter: {
      type: Object,
    },
  },
  data() {
    return {
      splitterModel: 20,
      bools: {
        visiblePDF: true,
      },
      tab: "laboratory",
      tabs: [
        {
          value: "laboratory",
          label: "Laboratory",
          icon: "fa fa-microscope",
          component: "laboratorypdflist",
          propsData: {},
          actions: [
            {
              name: "laboratorypdflist",
              dispatch: "encounters/getLabPDFList",
              payload: {
                key: "patientNo",
                refKey: "patientNo",
                state: this.encounter,
              },
            },
          ],
        },
        {
          value: "radiology",
          label: "Radiology",
          icon: "fa fa-x-ray",
          component: "radiologylist",
          propsData: {},
          actions: [],
          // actions: [
          //   {
          //     name: "radiologylist",
          //     dispatch: "",
          //     payload: {
          //       key: "patientNo",
          //       refKey: "patientNo",
          //       state: this.encounter,
          //     },
          //   },
          // ],
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      currentScreen: "helpers/currentScreen",
    }),
  },
  created() {
    this.initStore();
  },
  methods: {
    async initStore() {
      for (const module of this.tabs) {
        if (module.actions.length > 0) {
          for (const action of module.actions) {
            module.propsData[action.name] = await this.$store.dispatch(
              action.dispatch,
              await util.replacePayload(action.payload, action.payload.state)
            );
          }
        }
      }
    },
  },
});
</script>

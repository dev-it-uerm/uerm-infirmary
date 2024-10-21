<template>
  <q-card class="semi-rounded-borders-all">
    <q-card-section class="bg-primary text-secondary">
      <div class="row items-center justify-between">
        <div>
          <q-input
            label="FILTER PATIENTS"
            outlined
            label-color="primary"
            v-model="filter"
            color="secondary"
            class="bg-yellow-8 rounded-borders shadow-3"
            dense
            input-class="text-primary text-weight-bold text-body1"
            stack-label
            debounce="500"
            @update:model-value="(val) => filterPatientList(val)"
          >
            <template v-slot:append>
              <q-icon name="search" color="primary" />
            </template>
          </q-input>
        </div>
        <!-- <div>
          <q-btn-group>
            <q-btn
              icon="event"
              color="yellow-8"
              text-color="primary"
              :label="`ENCOUNTER DATE: ${this.dateLabel}`"
            >
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-date
                  v-model="date"
                  landscape
                  range
                  @update:model-value="updateLabel()"
                >
                </q-date>
              </q-popup-proxy>
            </q-btn>
          </q-btn-group>
        </div> -->
      </div>
    </q-card-section>
    <q-card-section class="q-pa-none fit">
      <q-separator color="yellow-8"></q-separator>
      <q-tabs
        v-model="tab"
        dense
        class="text-yellow-8 bg-primary shadow-0"
        active-bg-color="yellow-8"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
        outside-arrows
        mobile-arrows
        inline-label
      >
        <q-tab
          v-for="tab in tabs"
          :key="tab"
          :name="tab.value"
          :label="tab.label"
          :icon="tab.icon"
        >
          <q-badge color="red" floating style="right: -45px">
            {{
              this.patientListSegregated[tab.value] === undefined
                ? 0
                : this.patientListSegregated[tab.value].length
            }}
          </q-badge>
        </q-tab>
      </q-tabs>
      <q-tab-panels
        v-model="tab"
        animated
        class="fit semi-rounded-borders-bottom"
      >
        <q-tab-panel
          v-for="tab in tabs"
          :name="tab.value"
          :key="tab"
          class="q-pa-none fit"
          :class="`tab-content-${this.currentScreen}`"
        >
          <q-virtual-scroll
            style="max-height: 100%"
            separator
            bordered
            :items="this.patientListSegregated[tab.value]"
            v-slot="{ item, index }"
          >
            <q-item
              :key="index"
              clickable
              v-ripple
              @click="openEncounterDialog(item)"
            >
              <q-item-section>
                <q-item-label lines="1">
                  <span class="text-weight-medium q-pl-xs text-primary">
                    {{ item.fullName }}
                  </span>
                </q-item-label>
                <q-item-label caption lines="1">
                  <q-chip
                    color="secondary"
                    class="text-weight-bold text-uppercase"
                    size="11px"
                    text-color="primary"
                    >D/T REGISTERED: {{ item.dateTimeAdmitted }}</q-chip
                  >
                </q-item-label>
              </q-item-section>
              <q-item-section side top>
                <q-item-label lines="1">
                  <q-chip
                    v-if="item.waived !== null"
                    color="red"
                    class="text-weight-bold text-uppercase"
                    size="11px"
                    text-color="white"
                  >
                    WAIVED: {{ item.waived }}</q-chip
                  >
                  <q-chip
                    color="secondary"
                    class="text-weight-bold text-uppercase"
                    size="11px"
                    text-color="primary"
                    >{{ item.infirmaryPatientType }}</q-chip
                  >
                  <q-chip
                    color="secondary"
                    class="text-weight-bold text-uppercase"
                    size="11px"
                    text-color="primary"
                    >{{ item.patientType }}</q-chip
                  >
                </q-item-label>
                <q-item-label lines="1">
                  <q-chip
                    color="secondary"
                    class="text-weight-bold text-uppercase"
                    size="11px"
                    text-color="primary"
                    >Case No. {{ item.caseNo }}</q-chip
                  >
                  <q-chip
                    color="secondary"
                    class="text-weight-medium text-uppercase"
                    size="11px"
                    text-color="primary"
                    >PATIENT NO.: {{ item.patientNo }}</q-chip
                  >
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-virtual-scroll>
        </q-tab-panel>
      </q-tab-panels>
    </q-card-section>
  </q-card>
  <encounter-dialog
    v-if="bools.encounterDialog"
    @closeDialog="closeEncounterDialog"
    :encounter="this.encounterDetails"
    :userType="'nurse'"
  ></encounter-dialog>
</template>

<script>
const utils = require("src/util");
import EncounterDialog from "src/components/Helpers/EncounterDialog.vue";
import { defineComponent } from "vue";
import { mapGetters } from "vuex";

export default defineComponent({
  components: { EncounterDialog },
  name: "NursesModulePage",
  data() {
    return {
      filter: "",
      tab: "onQueue",
      tabs: [
        {
          value: "onQueue",
          label: "On Queue",
          icon: "fa fa-people-line",
        },
        {
          value: "transferred",
          label: "Transferred",
          icon: "fa fa-people-group",
        },
      ],
      patientList: [],
      patientListSegregated: {},
      bools: {
        encounterDialog: false,
      },
      encounterDetails: {},
    };
  },
  watch: {
    tab(val) {
      this.initStore();
    },
  },
  computed: {
    ...mapGetters({
      currentScreen: "helpers/currentScreen",
      currentScreenProperty: "helpers/currentScreenProperty",
    }),
  },
  created() {
    this.initStore();
  },
  methods: {
    async initStore() {
      this.patientList = await this.$store.dispatch("encounters/getEncounters");
      this.patientListSegregated = await this.segregatePatientList(
        this.patientList
      );
    },
    async segregatePatientList(patientList) {
      if (patientList.length === 0) {
        return {
          onQueue: [],
          transferred: [],
        };
      }
      return {
        onQueue: patientList.filter(
          (filterOnQueue) => filterOnQueue.encounterCode === null
        ),
        transferred: patientList.filter(
          (filterTransferred) => filterTransferred.encounterCode !== null
        ),
      };
    },
    async filterPatientList(filter) {
      await this.initStore();

      if (filter.length < 2) {
        this.patientListSegregated = await this.segregatePatientList(
          this.patientList
        );
        return;
      }

      const filteredPatients = this.patientList.filter(
        (filterPatients) =>
          filterPatients.fullName
            .toLowerCase()
            .includes(filter.toLowerCase()) ||
          filterPatients.caseNo.includes(filter)
      );
      this.patientListSegregated = await this.segregatePatientList(
        filteredPatients
      );
    },
    openEncounterDialog(encounter) {
      this.bools.encounterDialog = true;
      this.encounterDetails = encounter;
    },
    async closeEncounterDialog() {
      await utils.delay(500);
      this.bools.encounterDialog = false;
      this.initStore();
    },
  },
});
</script>

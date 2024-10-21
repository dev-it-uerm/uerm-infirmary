<template>
  <q-dialog v-model="bools.dialog" persistent full-height full-width maximized>
    <q-card>
      <!-- <q-layout view="lHh LpR lFr"> -->
      <q-layout view="lHh LpR lFr">
        <q-form
          ref="qForm"
          borderless
          class="relative-position bg-white fit"
          @validation-error="validationError"
          @submit="save"
        >
          <q-drawer
            v-model="bools.patientDrawer"
            class="drawer rounded-borders-all"
            bordered
            :width="300"
          >
            <div
              class="row wrap q-pt-md q-pb-sm justify-center items-center full-width"
            >
              <div class="column items-center full-width">
                <q-avatar
                  round
                  size="150px"
                  class="shadow-4 q-mb-md"
                  color="primary"
                >
                  <img
                    :src="`${this.apiHost.replaceAll(
                      'uerm-infirmary',
                      'personnels'
                    )}/picture/${this.encounter.identityCode}`"
                    style="width: 150px; height: 150px"
                    v-if="
                      this.encounter.identityCode !== null &&
                      this.encounter.identityCode !== ''
                    "
                  />

                  <q-icon name="fa fa-hospital-user" color="secondary">
                  </q-icon>
                </q-avatar>

                <div class="text-overline q-px-md text-center">
                  {{ this.encounter.fullName }}
                </div>

                <q-chip
                  color="primary"
                  text-color="secondary"
                  class="text-caption text-uppercase"
                >
                  Patient No.: {{ this.encounter.patientNo }}
                </q-chip>
              </div>
            </div>

            <div>
              <q-card class="q-ma-md">
                <q-card-section
                  class="text-caption q-pa-sm bg-primary text-secondary"
                >
                  PATIENT INFORMATION
                </q-card-section>
                <q-card-section align="center">
                  <div
                    class="row justify-center q-col-gutter-y-sm text-caption"
                  >
                    <div class="col-12">
                      <div class="column items-center">
                        <span class="text-caption text-uppercase">
                          <q-chip
                            color="secondary"
                            class="text-weight-bold text-uppercase"
                            size="11px"
                            text-color="primary"
                            >{{ this.encounter.infirmaryPatientType }}</q-chip
                          >
                        </span>
                        <div
                          class="text-caption"
                          v-if="this.encounter.waived !== null"
                        >
                          <q-chip
                            color="red"
                            class="text-weight-bold text-uppercase"
                            size="11px"
                            text-color="white"
                          >
                            {{ this.encounter.waived }}</q-chip
                          >
                        </div>
                      </div>
                    </div>
                    <div
                      class="col-6 text-weight-bold"
                      v-if="this.encounter.identityCode !== ''"
                    >
                      ID NO.:
                    </div>
                    <div
                      class="col-6"
                      v-if="this.encounter.identityCode !== ''"
                    >
                      {{ this.encounter.identityCode }}
                    </div>
                    <div class="col-6 text-weight-bold">BIRTHDATE | AGE:</div>
                    <div class="col-6">
                      {{ this.encounter.birthdate }} | {{ this.encounter.age }}
                    </div>
                    <div
                      class="col-12"
                      v-if="
                        this.encounter.department !== '' &&
                        this.encounter.department !== null
                      "
                    >
                      <span class="text-weight-bold">DEPARTMENT:</span>
                      <br />
                      {{ this.encounter.department }}
                    </div>
                  </div>
                </q-card-section>
              </q-card>

              <q-card class="q-ma-md">
                <q-card-section
                  class="text-caption q-pa-sm bg-primary text-secondary"
                >
                  ENCOUNTER INFORMATION
                </q-card-section>
                <q-card-section align="center">
                  <div
                    class="row justify-center q-col-gutter-y-sm text-caption"
                  >
                    <div class="col-6 text-weight-bold">CASE NO.:</div>
                    <div class="col-6">
                      {{ this.encounter.caseNo }}
                    </div>
                    <div class="col-6 text-weight-bold">CATEGORY:</div>
                    <div class="col-6">
                      {{ this.encounter.patientCategory }}
                    </div>
                    <div class="col-6 text-weight-bold">PATIENT TYPE:</div>
                    <div class="col-6">
                      {{ this.encounter.patientType }}
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </q-drawer>

          <q-drawer
            v-model="bools.rightPatientDrawer"
            class="drawer"
            side="right"
            bordered
            :width="300"
          >
            <div class="columns q-pa-md q-col-gutter-y-sm">
              <div>
                <q-card>
                  <q-card-section
                    class="q-pa-sm bg-primary text-secondary text-caption"
                  >
                    GENERAL NOTES
                  </q-card-section>
                  <q-card-section class="q-pb-sm q-pt-none">
                    <q-list class="text-secondary rounded-borders">
                      <q-item
                        clickable
                        class="q-pl-md encounter-links-item bg-primary shadow-4"
                        active-class="bg-secondary text-primary"
                        v-for="genNote in this.fieldGroupsGrouped.generalNotes"
                        :key="genNote"
                        @click="setCurrentEncounter(genNote.code)"
                        :active="checkActiveEncounterGroup(genNote.code)"
                        v-show="
                          genNote.userCode.length === 0 ||
                          genNote.userCode.includes(this.userCode)
                        "
                      >
                        <q-item-section avatar>
                          <q-icon name="fa fa-file-medical" />
                        </q-item-section>

                        <q-item-section>
                          <q-item-label class="text-overline">
                            {{ genNote.name }}
                          </q-item-label>

                          <div v-if="Object.keys(this.notes).length > 0">
                            <div
                              v-if="
                                this.notes.hashMapFieldGroups[genNote.code] !==
                                undefined
                              "
                            >
                              <q-badge
                                v-if="
                                  Object.keys(
                                    this.notes.hashMapFieldGroups[genNote.code]
                                  ).length > 0
                                "
                                floating
                                color="red"
                                rounded
                              />
                            </div>
                          </div>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-card-section>
                </q-card>
              </div>
              <div>
                <q-card>
                  <q-card-section
                    class="q-pa-sm bg-primary text-secondary text-caption"
                  >
                    ENCOUNTER NOTES
                  </q-card-section>
                  <q-card-section class="q-pb-sm q-pt-none">
                    <q-list class="text-secondary">
                      <q-item
                        clickable
                        class="q-pl-md encounter-links-item bg-primary shadow-4"
                        active-class="bg-secondary text-primary"
                        v-for="encNote in this.fieldGroupsGrouped
                          .encounterNotes"
                        :key="encNote"
                        @click="setCurrentEncounter(encNote.code)"
                        :active="checkActiveEncounterGroup(encNote.code)"
                        v-show="
                          encNote.userCode.length === 0 ||
                          encNote.userCode.includes(this.userCode)
                        "
                      >
                        <q-item-section avatar>
                          <q-icon name="fa fa-file-medical" />
                        </q-item-section>

                        <q-item-section>
                          <q-item-label class="text-overline">
                            {{ encNote.name }}
                          </q-item-label>

                          <div v-if="Object.keys(this.notes).length > 0">
                            <div
                              v-if="
                                this.notes.hashMapFieldGroups[encNote.code] !==
                                undefined
                              "
                            >
                              <q-badge
                                v-if="
                                  Object.keys(
                                    this.notes.hashMapFieldGroups[encNote.code]
                                  ).length > 0
                                "
                                floating
                                color="red"
                                rounded
                              />
                            </div>
                          </div>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </q-drawer>

          <q-header bordered class="bg-primary text-yellow-8">
            <q-toolbar class="q-px-sm">
              <div class="row fit justify-between">
                <div class="col-8">
                  <q-btn
                    icon="fa fa-bars"
                    flat
                    @click="bools.patientDrawer = !bools.patientDrawer"
                  ></q-btn>

                  <span>
                    <q-btn
                      size="sm"
                      label="REFER"
                      color="secondary"
                      text-color="primary"
                    ></q-btn>
                  </span>
                </div>

                <div>
                  <q-btn
                    label="CLOSE"
                    color="red"
                    text-color="white"
                    icon="fa fa-times"
                    size="sm"
                    @click="closeDialog"
                  ></q-btn>
                  <span class="q-pl-sm">
                    <q-btn
                      icon="fa fa-bars"
                      flat
                      @click="
                        bools.rightPatientDrawer = !bools.rightPatientDrawer
                      "
                    ></q-btn>
                  </span>
                </div>
              </div>
            </q-toolbar>
          </q-header>

          <q-page-container class="fit">
            <q-page class="q-pa-md fit">
              <q-card>
                <q-card-section
                  class="bg-primary text-secondary text-caption"
                  v-if="this.currentEncounter.code !== ''"
                >
                  {{ this.fieldGroupsHashMap[this.currentEncounter.code].name }}
                </q-card-section>
                <q-card-section
                  :class="
                    this.fieldGroupsHashMap[this.currentEncounter.code]
                      .historicalComponent !== null
                      ? 'q-pa-none'
                      : ''
                  "
                  v-if="!bools.contentLoading"
                >
                  <!-- <div class="row q-col-gutter-x-md"> -->
                  <div
                    v-if="
                      this.fieldGroupsHashMap[this.currentEncounter.code]
                        .historicalComponent !== null
                    "
                  >
                    <q-separator color="secondary"></q-separator>
                    <q-splitter v-model="splitterModel" :limits="[30, 70]">
                      <template v-slot:before>
                        <div>
                          <component
                            :is="
                              this.fieldGroupsHashMap[
                                this.currentEncounter.code
                              ].historicalComponent
                            "
                            :encounter="this.encounter"
                          ></component>
                        </div>
                      </template>

                      <template v-slot:after>
                        <div>
                          <q-card class="no-border shadow-0">
                            <q-card-section
                              class="no-border"
                              v-if="
                                this.fieldGroupsHashMap[
                                  this.currentEncounter.code
                                ].component === null
                              "
                            >
                              <div
                                v-for="field in this.currentEncounter.fields"
                                :key="field"
                              >
                                <MainField
                                  :fields="field"
                                  :fieldData="this.notes.hashMapFields"
                                  ref="mainField"
                                  v-if="
                                    field.userTypeConditions.length === 0 ||
                                    field.userTypeConditions.includes(
                                      this.userType
                                    )
                                  "
                                ></MainField>
                              </div>
                            </q-card-section>
                            <q-card-section>
                              <component
                                :is="
                                  this.fieldGroupsHashMap[
                                    this.currentEncounter.code
                                  ].component
                                "
                                :encounter="this.encounter"
                              ></component>
                            </q-card-section>
                          </q-card>
                        </div>
                      </template>
                    </q-splitter>
                  </div>

                  <div v-else>
                    <div class="col">
                      <q-card class="no-border shadow-0">
                        <q-card-section
                          class="q-pa-none no-border"
                          v-if="
                            this.fieldGroupsHashMap[this.currentEncounter.code]
                              .component === null
                          "
                        >
                          <div
                            v-for="field in this.currentEncounter.fields"
                            :key="field"
                          >
                            <MainField
                              :fields="field"
                              :fieldData="this.notes.hashMapFields"
                              ref="mainField"
                              v-if="
                                field.userTypeConditions.length === 0 ||
                                field.userTypeConditions.includes(this.userType)
                              "
                            ></MainField>
                          </div>
                        </q-card-section>
                        <q-card-section>
                          <component
                            :is="
                              this.fieldGroupsHashMap[
                                this.currentEncounter.code
                              ].component
                            "
                            :encounter="this.encounter"
                          ></component>
                        </q-card-section>
                      </q-card>
                    </div>
                  </div>
                </q-card-section>

                <q-card-section
                  v-if="bools.contentLoading"
                  style="height: 40vh !important"
                ></q-card-section>

                <q-inner-loading :showing="bools.contentLoading">
                  <q-spinner-puff size="100px" color="primary" />
                  <span class="q-pt-md q-py-md text-overline text-center"
                    >LOADING, PLEASE WAIT ...</span
                  >
                </q-inner-loading>
              </q-card>
            </q-page>
          </q-page-container>

          <q-footer elevated class="bg-primary text-secondary">
            <div class="q-pa-sm row justify-between">
              <div></div>
              <div>
                <q-btn-group>
                  <q-btn
                    label="SAVE"
                    color="secondary"
                    text-color="primary"
                    type="submit"
                    size="sm"
                    icon="fa fa-file-export"
                  ></q-btn>
                  <q-btn
                    v-if="userType === 'doctor'"
                    label="COMPLETE"
                    color="secondary"
                    text-color="primary"
                    size="sm"
                    icon="fa fa-file-export"
                  ></q-btn>
                </q-btn-group>
              </div>
            </div>
          </q-footer>
        </q-form>
      </q-layout>
    </q-card>
  </q-dialog>
</template>

<script>
const utils = require("src/util");
import { defineComponent, defineAsyncComponent } from "vue";
import { mapGetters } from "vuex";
import MainField from "src/components/FieldTypes/MainField.vue";

export default defineComponent({
  name: "EncounterDialog",
  props: {
    encounter: {
      type: Object,
    },
    userType: {
      type: String,
    },
  },
  components: {
    MainField,
    medicalhistory: defineAsyncComponent(() =>
      import("src/components/FieldGroupHelpers/MedicalHistory.vue")
    ),
    diagnostichistory: defineAsyncComponent(() =>
      import("src/components/FieldGroupHelpers/DiagnosticHistory.vue")
    ),
  },
  data() {
    return {
      userCode: "5550",
      splitterModel: 70,
      bools: {
        dialog: false,
        patientDrawer: true,
        rightPatientDrawer: true,
        contentLoading: false,
        editMode: false,
      },
      currentEncounter: {
        code: "",
        fields: [],
      },
      notes: {},
      encounters: {
        famhistory: 1,
        allergies: 3,
        immunization: 2,
        medhistory: 0,
        physicalexam: 0,
        psychiatrichistory: 0,
        encounterinfo: 5,
        prescriptions: 2,
        diagnostics: 0,
      },
    };
  },
  emits: ["closeDialog"],
  async created() {
    this.bools.dialog = true;
    this.bools.contentLoading = true;
    await this.initStore();
    await utils.delay(900);
    await this.setCurrentEncounter("encounterinfo");
  },
  mounted() {},
  computed: {
    ...mapGetters({
      apiHost: "helpers/apiHost",
      fieldGroupsGrouped: "config/fieldGroupsGrouped",
      fieldGroupsHashMap: "config/fieldGroupsHashMap",
      fieldsGrouped: "config/fieldsGrouped",
      fieldsHashMap: "config/fieldsHashMap",
    }),
  },
  methods: {
    async initStore() {
      this.notes = await this.$store.dispatch("encounters/getNotes", {
        caseNo: this.encounter.caseNo,
      });
    },
    async init() {
      this.setCurrentEncounter("encounterinfo");
    },
    async setNotificationPayload(payload) {
      let notifPayload = {
        displayNotify: payload.displayNotify,
        message: payload.message,
        type: payload.type,
      };
      await this.$store.dispatch("helpers/setNotification", notifPayload);
    },
    closeDialog() {
      this.bools.dialog = false;
      this.$emit("closeDialog", true);
    },
    async setCurrentEncounter(encounter) {
      this.bools.contentLoading = true;
      this.currentEncounter.code = encounter;
      this.currentEncounter.fields = this.fieldsGrouped[encounter];

      if (utils.isObjAndNotEmpty(this.notes) > 0) {
        if (
          utils.isObjAndNotEmpty(
            this.notes.hashMapFieldGroups[this.currentEncounter.code]
          )
        ) {
          this.bools.editMode = true;
        } else {
          this.bools.editMode = false;
        }
      } else {
        this.bools.editMode = false;
      }

      await utils.delay(900);
      this.bools.contentLoading = false;
    },
    checkActiveEncounterGroup(encounter) {
      if (this.currentEncounter.code === encounter) {
        return true;
      }

      return false;
    },
    async validationError(vm) {
      vm.$el.scrollIntoView();

      let notifPayload = {
        displayNotify: true,
        message: `Please complete all the required fields and enter correct values.`,
        type: "negative",
      };
      await this.setNotificationPayload(notifPayload);
      await utils.delay(1500);
      let notifInitPayload = {
        displayNotify: false,
        message: "",
        type: "",
      };
      this.setNotificationPayload(notifInitPayload);
    },

    save() {
      this.$refs.qForm.validate().then(async (valid) => {
        if (!valid) {
          return false;
        }
        const clinicalNote =
          this.fieldGroupsHashMap[this.currentEncounter.code].name;

        this.$q
          .dialog({
            title: `<center class="text-weight-light">CONFIRMATION</center>`,
            message: `<span class="q-mt-md">Are you sure you want to ${
              this.bools.editMode ? "update" : "save"
            } the patient's <strong>${clinicalNote}</strong>?</span>`,
            cancel: true,
            persistent: true,
            html: true,
            ok: {
              push: true,
            },
            cancel: {
              push: true,
              color: "negative",
            },
          })
          .onOk(async () => {
            this.bools.contentLoading = true;

            const fieldPayload = [];
            for (const fields of this.$refs.mainField) {
              fieldPayload.push(fields.fieldValues);
            }

            const fieldsPayload = await utils.convertArrObjToKeyValue(
              fieldPayload,
              "fieldCode",
              "value"
            );

            for (const fieldVal of fieldsPayload) {
              fieldVal.value = fieldVal.value.trim();
            }

            let filterNotNullValues = fieldsPayload;

            if (this.userType === "nurse") {
              const encounterDetails = await this.$store.dispatch(
                "encounters/postEncounter",
                {
                  encounterDetails: {
                    patientNo: this.encounter.patientNo,
                    caseNo: this.encounter.caseNo,
                  },
                  noteFieldsDetails: {
                    fieldGroupCode: this.currentEncounter.code,
                    fields: filterNotNullValues,
                  },
                }
              );

              if (!encounterDetails) {
                return;
              }
            } else {
              let noteDetails = "";
              if (!this.bools.editMode) {
                filterNotNullValues = fieldsPayload.filter(
                  (filterNotNullVal) => filterNotNullVal.value !== ""
                );
                noteDetails = await this.$store.dispatch(
                  "encounters/postNotes",
                  {
                    noteFieldsDetails: {
                      fields: filterNotNullValues,
                    },
                    notesDetails: {
                      encounterCode: this.encounter.encounterCode,
                      fieldGroupCode: this.currentEncounter.code,
                    },
                  }
                );
              } else {
                const currentFields = this.notes.raw.map(
                  (item) => item.fieldCode
                );

                const newFields = filterNotNullValues.filter(
                  (item) => !currentFields.includes(item.fieldCode)
                );

                noteDetails = await this.$store.dispatch(
                  "encounters/putNotes",
                  {
                    // notesDetails: {
                    //   encounterCode: this.encounter.encounterCode,
                    // },
                    noteFieldsDetails: {
                      fieldGroupCode: this.currentEncounter.code,
                      fields: filterNotNullValues,
                    },
                    newNoteFieldsDetails: {
                      fieldGroupCode: this.currentEncounter.code,
                      fields: newFields,
                    },
                    code: this.notes.hashMapFieldGroups[
                      this.currentEncounter.code
                    ].noteCode,
                  }
                );
              }

              if (!noteDetails) {
                return;
              }
            }

            await utils.delay(800);

            await this.initStore();
            if (this.userType === "nurse") {
              this.bools.dialog = false;
              this.$emit("closeDialog");
            }
            let notifPayload = {
              displayNotify: true,
              message: `${clinicalNote} successfully saved`,
              type: "positive",
            };
            await this.setNotificationPayload(notifPayload);
            await utils.delay(1500);
            this.bools.contentLoading = false;
            let notifInitPayload = {
              displayNotify: false,
              message: "",
              type: "",
            };
            this.setNotificationPayload(notifInitPayload);
          });
      });
    },
  },
});
</script>

<style>
.q-dialog__title {
  background: var(--q-primary) !important;
  color: var(--q-secondary) !important;
}

.q-dialog__message {
  margin-top: 10px;
}
</style>

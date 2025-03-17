<template>
  <div>
    <q-card>
      <q-card-section class="bg-primary text-secondary">
        REFERRAL
      </q-card-section>
      <q-form ref="referralForm" @click="saveReferral">
        <q-card-section
          class="q-pa-sm scroll"
          style="max-height: 525px !important"
        >
          <div class="row q-col-gutter-y-sm">
            <div class="col-12">
              <q-select
                stack-label
                outlined
                input-debounce="0"
                :options="this.departmentOptions"
                v-model="this.referralDetails.department"
                hide-bottom-space
                label-slot
                dense
                options-dense
                emit-value
                map-options
                use-input
                :rules="[(val) => !!val || 'Field is required']"
                @update:model-value="(val) => checkPhysicians(val)"
              >
                <template v-slot:label>
                  <span>
                    Department
                    <span class="text-weight-bold text-red"> *</span>
                  </span>
                </template>

                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey"
                      >No results</q-item-section
                    >
                  </q-item>
                </template>
              </q-select>
            </div>

            <div class="col-12">
              <q-select
                stack-label
                outlined
                use-input
                input-debounce="0"
                :options="this.physicianOptions"
                v-model="this.referralDetails.physician"
                hide-bottom-space
                label-slot
                :disable="this.physicianOptions.length === 0"
                dense
                options-dense
                emit-value
                map-options
                :rules="[(val) => !!val || 'Field is required']"
              >
                <template v-slot:label>
                  <span>
                    Referring Physician
                    <span class="text-weight-bold text-red"> *</span>
                  </span>
                </template>

                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey"
                      >No results</q-item-section
                    >
                  </q-item>
                </template>
              </q-select>
            </div>
            <div class="col-12">
              <q-card>
                <q-card-section
                  class="bg-primary text-caption text-secondary q-pa-sm"
                >
                  PURPOSE OF REFERRAL
                </q-card-section>
                <q-card-section class="q-pa-sm">
                  <div class="row justify-between items-start">
                    <div
                      v-for="purpose in this.purposes"
                      :key="purpose"
                      class="col-6"
                    >
                      <q-checkbox
                        v-model="referralDetails.purpose"
                        :val="purpose.value"
                        :label="purpose.label"
                        color="primary"
                      />
                    </div>

                    <div
                      class="col-12"
                      v-if="
                        this.referralDetails.purpose.indexOf('other') !== -1
                      "
                    >
                      <q-input
                        stack-label
                        outlined
                        v-model="this.referralDetails.otherPurpose"
                        type="textarea"
                        label-slot
                        dense
                        hide-bottom-space
                        :input-style="{ textTransform: 'uppercase' }"
                        :rules="[(val) => !!val || 'Field is required']"
                      >
                        <template v-slot:label>
                          Other Purpose:
                          <span class="text-weight-bold text-red">
                            *</span
                          ></template
                        >
                      </q-input>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
            <div class="col-12">
              <q-input
                stack-label
                outlined
                v-model="this.referralDetails.problem"
                type="textarea"
                label-slot
                dense
                hide-bottom-space
                :input-style="{ textTransform: 'uppercase' }"
                :rules="[(val) => !!val || 'Field is required']"
              >
                <template v-slot:label>
                  Problems being referred for care
                  <span class="text-weight-bold text-red"> *</span></template
                >
              </q-input>
            </div>
            <div class="col-12">
              <q-card>
                <q-card-section
                  class="bg-primary text-caption text-secondary q-pa-sm"
                >
                  TYPE
                </q-card-section>
                <q-card-section class="q-pa-sm">
                  <div class="row justify-center items-start">
                    <q-radio
                      v-for="typeOption in this.typeOptions"
                      :key="typeOption"
                      v-model="this.referralDetails.type"
                      checked-icon="task_alt"
                      unchecked-icon="panorama_fish_eye"
                      :val="typeOption.value"
                      :label="typeOption.label"
                    />
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </q-card-section>
        <q-card-section align="right" class="bg-primary">
          <q-btn
            label="SUBMIT REFERRAL"
            type="submit"
            size="13px"
            icon="fa fa-user-doctor"
            color="secondary"
            text-color="primary"
          ></q-btn>
        </q-card-section>
      </q-form>
    </q-card>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  // components: { CameraWidget },
  name: "ReferralDialog",
  data() {
    return {
      departmentOptions: [
        {
          label: "MED",
          value: "MED",
        },
        {
          label: "ENT",
          value: "ENT",
        },
      ],
      physicians: [
        {
          label: "PHYSICIAN 1",
          department: "MED",
          value: "1",
        },
        {
          label: "PHYSICIAN 2",
          department: "MED",
          value: "2",
        },
        {
          label: "PHYSICIAN 3",
          department: "MED",
          value: "3",
        },

        {
          label: "PHYSICIAN 4",
          department: "ENT",
          value: "4",
        },
        {
          label: "PHYSICIAN 5",
          department: "ENT",
          value: "5",
        },
        {
          label: "PHYSICIAN 6",
          department: "ENT",
          value: "6",
        },
      ],
      physicianOptions: [],
      referralDetails: {
        department: "",
        physician: "",
        purpose: [],
        otherPurpose: "",
        problem: "",
        type: "",
      },
      purposes: [
        {
          code: "comprehensiveCare",
          label: "Comprehensive Care / Joint Management",
          value: "comprehensiveCare",
        },
        {
          code: "consultationCare",
          label: "Consultation Care",
          value: "consultationCare",
        },
        {
          code: "advice",
          label: "Advice",
          value: "advice",
        },
        {
          code: "management",
          label: "Management",
          value: "management",
        },
        {
          code: "opinion",
          label: "Opinion",
          value: "opinion",
        },
        {
          code: "other",
          label: "Other",
          value: "other",
        },
      ],
      typeOptions: [
        {
          label: "Emergency",
          value: "emergency",
        },
        {
          label: "Not Emergency",
          value: "notemergency",
        },
      ],
    };
  },
  created() {},
  methods: {
    saveReferral() {},
    checkPhysicians(dept) {
      this.physicianOptions = this.physicians.filter(
        (filterPhysicians) => filterPhysicians.department === dept
      );
    },
  },
});
</script>

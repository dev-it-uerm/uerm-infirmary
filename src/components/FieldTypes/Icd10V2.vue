<template>
  <!-- Extra "div" container is a fix/workaround for the QSelect "losing focus" bug when inside a QTree node header -->
  <div
    @keypress="(evt) => evt.stopPropagation()"
    @click="(evt) => evt.stopPropagation()"
  >
    <q-select
      stack-label
      outlined
      ref="qSelect"
      multiple
      use-chips
      use-input
      hide-dropdown-icon
      :loading="loading"
      label-slot
      :disable="opts.disable || loading"
      :placeholder="opts.placeholder"
      @input-value="search"
      @paste="(e) => (opts.allowPaste ? null : e.preventDefault())"
      @drop="(e) => (opts.allowPaste ? null : e.preventDefault())"
      :autocomplete="opts.allowPaste ? 'on' : 'off'"
      :rules="[
        (val) => {
          if ((!val || (val && val.length === 0)) && opts.required)
            return opts.requiredMessage ?? 'This field is required.';
        },
      ]"
      v-model="value"
    >
      <template v-slot:label>
        {{ opts.label }}
        <span class="text-weight-bold text-red" v-if="opts.required"> *</span>
      </template>
      <template v-slot:selected-item="scope">
        <q-chip
          removable
          dense
          @remove="scope.removeAtIndex(scope.index)"
          :tabindex="scope.tabindex"
          style="height: auto"
          class="q-py-none"
        >
          <JsonViewer
            v-if="jsonViewerInChip"
            :title="opts.label"
            :json="JSON.stringify(scope.opt)"
          />
          <span v-else class="q-pa-xs" style="white-space: pre-wrap">{{
            scope.opt.label
          }}</span>
        </q-chip>
      </template>
      <template v-slot:append>
        <q-icon
          color="blue-10"
          name="library_books"
          class="cursor-pointer"
          size="sm"
          @click.stop.prevent="icd10TreeVisible = true"
        />
      </template>
    </q-select>

    <template v-if="options.length > 0">
      <div
        class="q-my-sm"
        style="
          border: 1px solid rgba(0, 0, 0, 0.12);
          min-width: 100%;
          max-width: 100px;
          max-height: 300px;
          height: auto;
          overflow-y: auto;
          overflow-x: hidden;
        "
      >
        <q-list separator>
          <q-item
            clickable
            v-ripple
            @click="addValue(option)"
            v-for="(option, index) in options"
            :key="index"
          >
            <q-item-section side>
              <q-item-label class="text-weight-">{{
                option.value
              }}</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ option.label }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
      <div class="row justify-end">
        <q-btn
          class="q-pa-xs q-mb-sm"
          flat
          dense
          color="blue-10"
          icon="expand_less"
          @click="() => (options = [])"
        />
      </div>
    </template>

    <q-dialog
      class="q-pa-xl"
      :model-value="icd10TreeVisible"
      maximized
      @hide="
        () => {
          icd10TreeVisible = false;
        }
      "
      ref="qDialog"
    >
      <div style="overflow: hidden" class="flex justify-center items-center">
        <q-card
          :style="`width: ${$q.screen.gt.sm ? '500px' : '100%'};`"
          class="shadow-0"
          borderless
        >
          <q-card-section
            class="text-uppercase text-weight-medium text-h6 q-pa-md row justify-between items-center"
          >
            <span>ICD 10 DICTIONARY</span>
            <q-icon
              color="grey-7"
              name="clear"
              class="cursor-pointer"
              @click="() => $refs.qDialog.hide()"
            />
          </q-card-section>
          <q-separator />
          <q-card-section>
            <q-scroll-area
              :style="`height: ${
                $q.screen.gt.sm ? '70vh' : 'calc(100vh - 100px)'
              };`"
              class="full-width"
            >
              <Icd10Tree
                :allowAnyNodeSelection="
                  Boolean(opts.allowAnyNodeSelectionInTree)
                "
                @valueChanged="
                  (val) => {
                    if (val) {
                      icd10TreeVisible = false;
                      addValue(val);
                    }
                  }
                "
              />
            </q-scroll-area>
          </q-card-section>
        </q-card>
      </div>
    </q-dialog>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { debounce } from "quasar";
import { delay, empty, isArr } from "src/util";

import Icd10Tree from "src/components/EMR/OtherComponents/Icd10Tree.vue";
import JsonViewer from "../OtherComponents/JsonViewer.vue";

export default defineComponent({
  name: "Icd10V2",
  components: {
    JsonViewer,
    Icd10Tree,
  },
  props: {
    opts: {
      type: Object,
      required: true,
    },
    initialValue: {
      type: Array,
      default: null,
    },
    additionalURLQueries: {
      type: Object,
      default: () => ({}),
    },
    jsonViewerInChip: {
      type: Boolean,
      default: true,
    },
    multiple: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      loading: false,
      value: [],
      options: [],
      icd10TreeVisible: false,
    };
  },
  watch: {
    value(val) {
      let output = val;

      if (empty(val)) {
        output = null;
      } else {
        if (!this.multiple) output = val[0];
      }

      this.$emit("valueChanged", output);
    },
  },
  created() {
    if (!empty(this.initialValue))
      this.value = isArr(this.initialValue)
        ? this.initialValue
        : [this.initialValue];

    // For some reason, QSelect's input-debounce prop does not work on its @input-value event
    // Manage debouncing ourselves
    this.search = debounce(this.search, 1000);
  },
  methods: {
    async search(val) {
      const searchStr = val.trim();
      if (searchStr.length < 3) return;
      this.options = [];

      this.loading = true;

      await delay(400);

      const response = await this.$store.dispatch("app/getAutoValue", {
        fileName: "app/icd10",
        query: {
          ...this.additionalURLQueries,
          searchStr,
        },
      });

      if (response.length > 0) this.options = response;

      this.loading = false;
    },
    addValue(option) {
      this.$refs.qSelect.add(option, true);

      // IMPORTANT: change this.value after calling the qSelect's `add` method, otherwise this.value won't change
      if (!this.multiple) this.value = [this.value[this.value.length - 1]];

      this.options = [];
    },
  },
});
</script>

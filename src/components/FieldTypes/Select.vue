<template>
  <q-select
    stack-label
    outlined
    dense
    label-slot
    :options="opts.fieldOptions"
    :disable="opts.disable"
    :placeholder="opts.placeholder"
    :rules="[
      (val) => {
        if ((val === null || val === undefined || val === '') && opts.required)
          return opts.requiredMessage ?? 'This field is required.';
      },
    ]"
    :tabindex="this.tabIndex"
    emit-value
    map-options
    v-model="value"
  >
    <template v-slot:label>
      {{ opts.label }}
      <span class="text-weight-bold text-red" v-if="opts.required"> *</span>
    </template>

    <template
      v-slot:append
      v-if="opts.description !== undefined && opts.description !== ''"
    >
      <q-btn
        size="sm"
        color="primary"
        text-color="secondary"
        icon="fa fa-question-circle"
        round
      >
        <q-tooltip
          :anchor="
            this.currentScreenProperty.lt.md ? 'top middle' : 'center right'
          "
          :self="
            this.currentScreenProperty.lt.md ? 'bottom middle' : 'center left'
          "
          :offset="[10, 10]"
        >
          <div class="text-uppercase" v-html="opts.description"></div>
        </q-tooltip>
      </q-btn>
    </template>
  </q-select>
</template>

<script>
import { defineComponent } from "vue";
import { mapGetters } from "vuex";

export default defineComponent({
  name: "SelectField",
  props: ["opts", "initialValue", "tabIndex"],
  data() {
    return {
      value: null,
    };
  },

  computed: {
    ...mapGetters({
      currentScreenProperty: "helpers/currentScreenProperty",
    }),
  },
  watch: {
    value(val) {
      this.$emit("setFields", { [this.opts.code]: val });
    },
    initialValue: {
      handler(val) {
        this.value = val;
      },
      immediate: true, // handler will be called immediately at creation and then after every change of `initialValue`
    },
  },
});
</script>

<template>
  <q-input
    stack-label
    outlined
    debounce="300"
    type="number"
    step="any"
    autofocus
    label-slot
    :tabindex="this.tabIndex"
    :disable="opts.disable"
    :placeholder="opts.placeholder"
    @keypress="(evt) => evt.stopPropagation()"
    @click="(evt) => evt.stopPropagation()"
    :rules="[
      (val) => {
        if (
          (val === null ||
            val === undefined ||
            (typeof val === 'string' && val.trim() === '')) &&
          opts.required
        )
          return opts.requiredMessage ?? 'This field is required.';
      },
    ]"
    v-model="value"
  >
    <template v-slot:label>
      {{ opts.label }}
      <span v-if="opts.required" class="text-weight-bold text-red"> *</span>
    </template>

    <template v-slot:append v-if="opts.description !== undefined">
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
  </q-input>
</template>

<script>
import { defineComponent } from "vue";
import { mapGetters } from "vuex";

export default defineComponent({
  name: "NumberField",
  props: ["opts", "tabIndex"],
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

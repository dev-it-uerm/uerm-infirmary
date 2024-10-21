<template>
  <component
    :is="fields.type"
    ref="formInputs"
    :loading="this.bools.loading"
    :opts="fields"
    dense
    @setFields="setFields"
    :tabIndex="this.tabIndex"
    :initialValue="
      this.fieldData[this.fields.code] === undefined
        ? ''
        : this.fieldData[this.fields.code].value
    "
  ></component>
</template>

<script>
import { defineComponent, defineAsyncComponent } from "vue";

export default defineComponent({
  name: "MainField",
  props: {
    fields: {
      type: Object,
      required: true,
    },
    tabIndex: {
      type: Number,
      required: false,
    },
    initialValue: {
      type: String,
      required: false,
    },
    fieldData: {
      type: Object,
    },
  },
  components: {
    textfield: defineAsyncComponent(() =>
      import("src/components/FieldTypes/Text.vue")
    ),
    numberfield: defineAsyncComponent(() =>
      import("src/components/FieldTypes/Number.vue")
    ),
    selectfield: defineAsyncComponent(() =>
      import("src/components/FieldTypes/Select.vue")
    ),
    textareafield: defineAsyncComponent(() =>
      import("src/components/FieldTypes/Textarea.vue")
    ),
  },
  // watch: {
  //   data(val) {
  //     console.log(val, "val");
  //   },
  // },
  data() {
    return {
      bools: {
        loading: false,
      },
      fieldValues: {},
    };
  },
  mounted() {},
  methods: {
    setFields(fieldValues) {
      this.fieldValues = fieldValues;
    },
  },
});
</script>

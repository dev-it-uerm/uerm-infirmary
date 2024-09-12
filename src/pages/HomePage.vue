<template>
  <div class="text-center">
    <clock-widget></clock-widget>
  </div>
  <div class="page-content">
    <div
      class="fit row items-stretch content-stretch justify-center q-col-gutter-md"
    >
      <div class="col-12 text-center">
        <span class="text-h6 text-weight-light">DAILY REPORT</span>
      </div>
      <div class="col-12">
        <q-card style="height: 250px" v-if="!this.bools.loading">
          <q-card-section class="fit flex flex-center">
            TEST REPORT
          </q-card-section>
        </q-card>

        <q-skeleton v-if="this.bools.loading" height="250px" />
      </div>
      <div class="col-12">
        <q-card style="height: 250px" v-if="!this.bools.loading">
          <q-card-section class="fit flex flex-center">
            TEST REPORT
          </q-card-section>
        </q-card>
        <q-skeleton v-if="this.bools.loading" height="250px" />
      </div>
      <div class="col-12">
        <q-card style="height: 250px" v-if="!this.bools.loading">
          <q-card-section class="fit flex flex-center">
            TEST REPORT
          </q-card-section>
        </q-card>
        <q-skeleton v-if="this.bools.loading" height="250px" />
      </div>
    </div>
  </div>
</template>

<script>
import ClockWidget from "src/components/Widgets/ClockWidget.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "HomePage",
  components: { ClockWidget },
  data() {
    return {
      bools: {
        loading: true,
      },
    };
  },
  mounted() {
    setTimeout(() => {
      this.bools.loading = false;
    }, 5000);
  },
});
</script>

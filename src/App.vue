<template>
  <NotifyMessage
    v-if="notification.displayNotify"
    :message="notification.message"
    :type="notification.type"
  ></NotifyMessage>
  <router-view />
</template>

<script>
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import NotifyMessage from "./components/Helpers/NotifyMessage.vue";
export default defineComponent({
  name: "App",
  components: { NotifyMessage },
  computed: {
    ...mapGetters({
      currentScreenProperty: "helpers/currentScreenProperty",
      notification: "helpers/notification",
      logoffUser: "helpers/logoffUser",
    }),
  },
  created() {
    this.initializeStore();
  },
  methods: {
    async initializeStore() {
      await this.$store.dispatch("config/getFieldGroups");
      await this.$store.dispatch("config/getFields");
    },
  },
});
</script>

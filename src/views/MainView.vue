<template>
  <main class="h-full w-full flex">
    <Sidebar />
    <FlowChart />
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Sidebar from "@/layouts/Sidebar.vue";
import FlowChart from "@/layouts/FlowChart.vue";
import type { IEmployeeOrgApp } from "@/models/EmployeeOrgApp";

export default defineComponent({
  props: {
    $store: Object as () => IEmployeeOrgApp,
  },
  components: {
    Sidebar,
    FlowChart,
  },
  data() {
    return {};
  },
});
</script>

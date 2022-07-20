<template>
  <aside class="w-full h-full bg-gray-700">
    <vue-tree
      style="width: 100%; height: 100%"
      :dataset="chartData"
      :config="treeConfig"
      :collapse-enabled="false"
      :linkStyle="`straight`"
    >
      <template v-slot:node="{ node, collapsed }">
        <div class="rounded-md shadow-sm bg-amber-300 p-4">
          <span style="padding: 4px 0; font-weight: bold">{{ node.name }}</span>
        </div>
      </template>
    </vue-tree>
  </aside>
</template>
<script lang="ts">
//@ts-ignore
import VueTree from "@ssthouse/vue3-tree-chart";
import { defineComponent } from "vue";
import type { IEmployeeOrgApp } from "@/models/EmployeeOrgApp";
import "@ssthouse/vue3-tree-chart/dist/vue3-tree-chart.css";
import Employee from "@/components/Employee.vue";
import type { IEmployee } from "@/models/Employee";

type ChartDataEmployee = {
  name: string;
  children: ChartDataEmployee[];
};
export default defineComponent({
  props: {
    $store: Object as () => IEmployeeOrgApp,
  },
  components: {
    Employee,
    VueTree,
  },
  data() {
    return {
      treeConfig: { nodeWidth: 120, nodeHeight: 80, levelHeight: 200 },
    };
  },
  computed: {
    chartData: function () {
      return this.normalizeEmployeeData(this.$store!.ceo);
    },
  },
  methods: {
    normalizeEmployeeData(employee: IEmployee): ChartDataEmployee {
      return {
        name: employee.name,
        children: employee.subordinates.map((children) => {
          return this.normalizeEmployeeData(children);
        }),
      };
    },
  },
});
</script>

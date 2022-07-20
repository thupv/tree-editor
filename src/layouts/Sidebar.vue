<template>
  <aside class="w-72 h-full text-white overflow-auto bg-gray-800" aria-label="Sidebar">
    <div class="py-4 px-3 h-max w-max">
      <ul class="space-y-2">
        <li>
          <Employee :employee="$store.ceo" :move-employee="moveEmployee" v-if="$store?.ceo"/>
        </li>
      </ul>
    </div>
    <div id="dropdown-cta" class="p-4 mt-6 bg-blue-50 rounded-lg m-2" role="alert" v-if="openHowToUse">
      <div class="flex items-center mb-3">
          <span class="bg-orange-100 text-orange-800 text-sm font-semibold rounded">
            <IconBulb/>
          </span>
        <span class="bg-orange-100 text-orange-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded">How to use?</span>
        <button type="button" @click="hideHowToUse"
                class="ml-auto -mx-1.5 -my-1.5 bg-blue-50 text-blue-900 rounded-lg focus:ring-2 focus:ring-blue-400 p-1 hover:bg-blue-200 inline-flex h-6 w-6 dark:bg-blue-900 dark:text-blue-400 dark:hover:bg-blue-800" data-collapse-toggle="dropdown-cta" aria-label="Close">
          <span class="sr-only">Close</span>
          <IconClose/>
        </button>
      </div>
      <p class="mb-3 text-sm text-blue-900 dark:text-blue-400">
        Drag drop to move employees!
      </p>
    </div>
  </aside>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import type { IEmployeeOrgApp } from "@/models/EmployeeOrgApp";
import Employee from "@/components/Employee.vue";
import IconClose from "@/components/icons/IconClose.vue";
import IconBulb from "@/components/icons/IconBulb.vue";


export default defineComponent({
  props: {
    $store: Object as () => IEmployeeOrgApp,
  },
  components: {
    Employee,
    IconClose,
    IconBulb
  },
  data() {
    return {
      openHowToUse: true,
    };
  },
  methods: {
    moveEmployee(employeeId: number, supervisorId: number) {
      this.$store!.move(employeeId, supervisorId);
    },
    hideHowToUse() {
      this.openHowToUse = false;
    },
  },
});
</script>

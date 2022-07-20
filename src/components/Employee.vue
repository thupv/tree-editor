<template>
  <div>
    <button
      type="button"
      @dragenter.prevent
      @dragover.prevent
      draggable="true"
      @dragstart="onDragStart"
      @drop="onDrop"
      @click="toggleChildren"
      class="flex items-center p-2 w-full text-base font-normal transition duration-75 group hover:bg-gray-700 rounded-sm"
    >
      <IconFolderAdd v-show="!isOpen && employee.subordinates.length > 0" />
      <IconFolderRemove v-show="isOpen && employee.subordinates.length > 0" />
      <IconFolder v-show="employee.subordinates.length === 0" />
      <IconPeople />
      <span class="flex-1 ml-3 text-left">{{employee.name}}</span>
    </button>
    <div :class="{ 'space-y-2': true, 'pl-5': true, hidden: !isOpen }">
      <ul class="space-y-2 border-l-2">
        <li v-for="item in employee.subordinates">
          <Employee :employee="item" :move-employee="moveEmployee" />
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import type { IEmployee } from "@/models/Employee";
import IconPeople from "@/components/icons/IconPeople.vue";
import IconFolderAdd from "@/components/icons/IconFolderAdd.vue";
import IconFolderRemove from "@/components/icons/IconFolderRemove.vue";
import IconFolder from "@/components/icons/IconFolder.vue";

export default defineComponent({
  props: {
    employee: {
      type: Object as () => IEmployee,
      required: true,
    },
    moveEmployee: Function,
  },
  components: { IconFolderRemove, IconFolderAdd, IconPeople, IconFolder },
  data() {
    return {
      isOpen: true,
    };
  },
  methods: {
    onDragStart(event: DragEvent) {
      event.dataTransfer?.setData(
        "employeeId",
        this.employee!.uniqueId.toString()
      );
      event.stopPropagation();
    },
    onDrop(e: DragEvent) {
      const employeeId = e.dataTransfer?.getData("employeeId");
      if (!employeeId) {
        return;
      }
      if (this.employee?.uniqueId.toString() === employeeId) {
        return;
      }
      if (this.moveEmployee) {
        this.moveEmployee(parseInt(employeeId), this.employee!.uniqueId);
      }
    },
    toggleChildren() {
      this.isOpen = !this.isOpen;
    },
  },
});
</script>

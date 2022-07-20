<script setup lang="ts"></script>

<template>
  <nav class="bg-gray-900">
    <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <IconLogo />
          </div>
          <div class="block">
            <div class="ml-10 flex items-baseline space-x-4">
              <div class="inline-flex rounded-md shadow-sm" role="group">
                <button
                  type="button"
                  @click="undo"
                  :disabled="!$store?.canUndo"
                  :class="{
                    'py-2 px-4 bg-white rounded-l-md border border-gray-200 hover:bg-gray-100 hover:text-blue-700': true,
                    'opacity-50 cursor-not-allowed': !$store?.canUndo,
                  }"
                >
                  <IconUndo />
                </button>
                <button
                  type="button"
                  @click="redo"
                  :disabled="!$store?.canRedo"
                  :class="{
                    'py-2 px-4 bg-white rounded-r-md border border-gray-200 hover:bg-gray-100 hover:text-blue-700': true,
                    'opacity-50 cursor-not-allowed': !$store?.canRedo,
                  }"
                >
                  <IconRedo />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { IEmployeeOrgApp } from "@/models/EmployeeOrgApp";
import IconUndo from "@/components/icons/IconUndo.vue";
import IconRedo from "@/components/icons/IconRedo.vue";
import IconLogo from "@/components/icons/IconLogo.vue";

export default defineComponent({
  props: {
    $store: Object as () => IEmployeeOrgApp,
  },
  components: {
    IconUndo,
    IconRedo,
    IconLogo,
  },
  data() {
    return {};
  },
  methods: {
    undo() {
      this.$store!.undo();
    },
    redo() {
      this.$store!.redo();
    },
  },
});
</script>

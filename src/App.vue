<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import TabBar from './components/TabBar.vue';
import AdminBar from "./components/AdminBar.vue";

const route = useRoute();

const isAdminPage = computed(() => route.path.startsWith("/admin"));
</script>

<template>
  <div id="app">
    <main class="p-4">
      <div class="flex flex-col min-h-screen">
        <main class="grow">
          <router-view />
        </main>
      </div>
      <footer class="text-gray-400 white:text-dark mt-10 mb-10 text-xs py-4 font-medium tracking-tight text-center">
        <p>
          a Tim Zykov production<br />
          @gumcol
        </p>
      </footer>
    </main>
    <TabBar v-if="!isAdminPage" />
    <AdminBar v-if="isAdminPage" />
  </div>
</template>

<style lang="css">
h1 {
  text-align: center;
}

select,
input {
  transition: border 0.3s, box-shadow 0.3s;
}

select:focus,
input:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.3);
}
</style>
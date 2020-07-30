<template>
  <nav>
    <div class="h-full px-4">
      <div class="p-3 flex justify-between mb-4">
        <h1 class="uppercase font-semibold">
          MAGNUM
        </h1>
        <v-mdi name="mdi-playlist-minus" />
      </div>
      <div>
        <router-link to="/" class="mb-2 capitalize list-ui">
          <v-mdi name="mdi-cash-usd-outline" class="mr-3" />
          POS
        </router-link>
        <router-link to="/about" class="mb-2 capitalize list-ui">
          <v-mdi name="mdi-alpha-p-circle-outline" class="mr-3" />
          Inventario
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Sidebar',
})
</script>

<style lang="postcss" scoped>
nav {
  @apply bg-gray-900 px-1 rounded-l-lg;
  @apply bg-white h-screen py-6 inline-block;
  width: 240px;

  -webkit-user-select: none;
  -webkit-app-region: drag;
}
.list-ui {
  @apply p-3 flex items-center transition-colors ease-in overflow-hidden relative cursor-pointer;
  border-radius: 0.9375rem;
  -webkit-app-region: no-drag;
  &:hover:not(.router-link-exact-active) {
    @apply bg-gray-100;
  }
}
</style>

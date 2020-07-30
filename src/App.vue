<template>
  <div class="flex">
    <sidebar />
    <div class="bar2">Search</div>
  </div>
  <main>
    <div class="pt-6 pr-6 absolute right-0 top-0">
      <button class="focus:outline-none p-2 rounded-full bg-gray-200">
        <span>
          <v-mdi name="mdi-moon-waning-crescent" />
        </span>
      </button>
    </div>
    <router-view />
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ipcRenderer } from 'electron'
import Sidebar from '@/components/Sidebar.vue'

export default defineComponent({
  components: { Sidebar },
  setup() {
    const btnClick = () => {
      console.log('message')
      ipcRenderer.send('message', 'ping')
    }
    return { btnClick }
  },
})
</script>

<style lang="postcss" scoped>
.bar2 {
  @apply bg-gray-200 h-screen p-6 relative inline-block;
  width: 300px;
}

main {
  @apply bg-white rounded-r-lg  w-full h-full p-6;
}
</style>

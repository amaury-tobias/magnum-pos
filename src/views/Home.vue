<template>
  <div class="home">
    <h2>
      <span class="font-bold">Current Printer:</span>
      {{ currentPrinter }}
    </h2>
    <input
      class="focus:outline-none bg-gray-200 rounded-lg px-4 py-2 text-gray-800"
      type="text"
      placeholder="text to print..."
      v-model="textToPrint"
    />
    <a
      class="block cursor-pointer py-1"
      v-for="(printer, i) in printers"
      :key="i"
      @click="handleSelectPrinter(printer.name)"
    >
      {{ printer.name }}
    </a>
    <button @click="handlePrint">Print!</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { remote, ipcRenderer } from 'electron'

export default defineComponent({
  name: 'Home',
  setup() {
    const currentPrinter = ref('')
    const textToPrint = ref('')

    const printers = computed(() =>
      remote.getCurrentWebContents().getPrinters()
    )
    const handlePrint = () =>
      ipcRenderer.send('print', currentPrinter.value, textToPrint.value)

    const handleSelectPrinter = (printer: string) =>
      (currentPrinter.value = printer)

    return {
      currentPrinter,
      printers,
      handlePrint,
      handleSelectPrinter,
      textToPrint,
    }
  },
})
</script>

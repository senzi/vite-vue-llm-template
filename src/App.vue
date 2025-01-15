<script setup lang="ts">
import AppHeader from './components/AppHeader.vue'
import InputPanel from './components/InputPanel.vue'
import OutputPanel from './components/OutputPanel.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
    <AppHeader />
    
    <main class="flex-1 container mx-auto p-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputPanel />
        <OutputPanel />
      </div>
    </main>
  </div>
</template>

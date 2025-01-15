<template>
  <div class="flex flex-col gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
    <!-- JSON Schema -->
    <div v-if="store.currentTemplate?.type === 'json' && store.currentTemplate.schema" class="space-y-2">
      <h3 class="text-sm font-medium text-gray-700 dark:text-gray-200">
        JSON Schema
      </h3>
      <pre
        class="p-4 rounded-md bg-gray-50 dark:bg-gray-900 overflow-auto"
      ><code class="language-json">{{ JSON.stringify(store.currentTemplate.schema, null, 2) }}</code></pre>
    </div>
    
    <!-- 输出结果 -->
    <div class="space-y-2">
      <div class="flex items-center justify-between">
        <h3 class="text-sm font-medium text-gray-700 dark:text-gray-200">
          输出结果
        </h3>
        <button
          v-if="store.output"
          @click="copyOutput"
          class="text-sm text-primary-600 hover:text-primary-500"
          :class="{ 'text-green-600': copied }"
        >
          {{ copied ? '已复制！' : '复制' }}
        </button>
      </div>
      <div class="relative">
        <pre
          class="p-4 rounded-md bg-gray-50 dark:bg-gray-900 overflow-auto"
          :class="{ 'min-h-[12rem]': !store.output }"
        ><code v-if="store.output" class="language-json">{{ store.output }}</code><span v-else class="text-gray-400">输出内容将显示在这里...</span></pre>
      </div>
    </div>
    
    <!-- 错误信息 -->
    <div
      v-if="store.error"
      class="p-4 rounded-md bg-red-50 dark:bg-red-900/20"
    >
      <div class="flex">
        <div class="shrink-0">
          <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-red-800 dark:text-red-200">
            错误信息
          </h3>
          <div class="mt-2 text-sm text-red-700 dark:text-red-300">
            {{ store.error }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePlaygroundStore } from '../stores/playground'
import { ref } from 'vue'
import { useClipboard } from '@vueuse/core'

const store = usePlaygroundStore()
const { copy } = useClipboard()
const copied = ref(false)

const copyOutput = async () => {
  if (!store.output) return
  await copy(store.output)
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 2000)
}
</script>

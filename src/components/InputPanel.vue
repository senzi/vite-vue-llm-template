<template>
  <div class="flex flex-col gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
    <!-- 模板选择 -->
    <div class="space-y-2">
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-200">
        选择模板
      </label>
      <select
        v-model="store.currentTemplate"
        class="block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500"
      >
        <option value="">请选择模板</option>
        <option
          v-for="template in store.templates"
          :key="template.name"
          :value="template"
        >
          {{ template.name }} - {{ template.description }}
        </option>
      </select>
    </div>
    
    <!-- 环境配置 -->
    <div class="space-y-4">
      <h3 class="text-sm font-medium text-gray-700 dark:text-gray-200">环境配置</h3>
      <div class="grid gap-4">
        <div>
          <label class="block text-sm text-gray-500 dark:text-gray-400">API Key</label>
          <input
            v-model="store.envConfig.apiKey"
            type="password"
            class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            placeholder="输入你的 API Key"
          >
        </div>
        <div>
          <label class="block text-sm text-gray-500 dark:text-gray-400">Base URL</label>
          <input
            v-model="store.envConfig.baseUrl"
            type="text"
            class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            placeholder="https://api.example.com"
          >
        </div>
        <div>
          <label class="block text-sm text-gray-500 dark:text-gray-400">Model</label>
          <input
            v-model="store.envConfig.model"
            type="text"
            class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            placeholder="gpt-3.5-turbo"
          >
        </div>
      </div>
    </div>
    
    <!-- 输入框 -->
    <div class="space-y-2">
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-200">
        输入内容
      </label>
      <textarea
        v-model="store.input"
        rows="8"
        class="block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        placeholder="在这里输入你的请求内容..."
      />
    </div>
    
    <div class="flex justify-end">
      <button
        @click="store.executeRequest"
        :disabled="store.loading"
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg
          v-if="store.loading"
          class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          />
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        {{ store.loading ? '执行中...' : '执行' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePlaygroundStore } from '../stores/playground'
import { onMounted } from 'vue'

const store = usePlaygroundStore()

onMounted(() => {
  store.fetchTemplates()
})
</script>

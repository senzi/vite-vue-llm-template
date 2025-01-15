import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import type { Template, EnvConfig, GenerateRequest } from '../types'

export const usePlaygroundStore = defineStore('playground', () => {
  const currentTemplate = ref<Template | null>(null)
  const templates = ref<Template[]>([])
  const input = ref('')
  const output = ref('')
  const loading = ref(false)
  const error = ref<string | null>(null)
  
  const envConfig = reactive<EnvConfig>({
    apiKey: '',
    baseUrl: '',
    model: ''
  })

  async function fetchTemplates() {
    try {
      loading.value = true
      const response = await fetch('/api/templates')
      templates.value = await response.json()
    } catch (e) {
      error.value = e instanceof Error ? e.message : '获取模板列表失败'
    } finally {
      loading.value = false
    }
  }

  async function executeRequest() {
    if (!currentTemplate.value || !input.value) return
    
    try {
      loading.value = true
      error.value = null
      
      const params: GenerateRequest = {
        template_name: currentTemplate.value.name,
        input: input.value,
        api_key: envConfig.apiKey || undefined,
        base_url: envConfig.baseUrl || undefined,
        model: envConfig.model || undefined
      }

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || '请求失败')
      }

      const result = await response.json()
      output.value = JSON.stringify(result, null, 2)
    } catch (e) {
      error.value = e instanceof Error ? e.message : '执行请求失败'
    } finally {
      loading.value = false
    }
  }

  return {
    currentTemplate,
    templates,
    input,
    output,
    loading,
    error,
    envConfig,
    fetchTemplates,
    executeRequest
  }
})

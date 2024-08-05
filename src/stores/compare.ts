import type { Hotel } from '@/types'
import { defineStore } from 'pinia'

export const useCompareStore = defineStore('compare', {
  state: () => ({
    checkedHotels: [] as Hotel[]
  }),
  actions: {
    resetCheckedHotels() {
      this.checkedHotels = []
    }
  }
})
import { defineStore } from 'pinia'

export const useAppConfigStore = defineStore('appConfig', {
  state: () => ({
    appLanguage: 'pt-br'
  }),
  actions: {
    changeAppLanguage() {
      this.appLanguage = this.appLanguage == 'pt-br' ? 'en-us' : 'pt-br'
    }
  },
})
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: {
      name: 'John Doe',
      email: 'johndoe@email.com',
      cpf: '123.123.123-12',
      contact: '(75) 99999-9999'
    }
  }),
})
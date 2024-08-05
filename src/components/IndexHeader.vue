<script lang="ts" setup>
// importações de pacotes
import { computed, ref } from 'vue'
import * as dateFns from 'date-fns'
// importações de outros arquivos do projeto (sempre utilizar o @ para referenciar o .app)
import { useAppConfigStore } from '@/stores/appConfig'
import { useNotificationStore } from '@/stores/notification'
import ptBrFlag from '@/assets/img/flags/pt-br.png'
import enUsFlag from '@/assets/img/flags/en-us.png'
// importações de tipos
// definePageMeta
// interfaces
// definição de props
// definição de emits (useEventBus)
// execuções gerais (geralmente são iniciadas com o prefixo 'on')
// constantes das libs
// constantes dos hooks
const appConfigStore = useAppConfigStore()
const notificationStore = useNotificationStore()
// recursos de validação(zod, schema, initialvalue)
// refs
const showNotifications = ref(false)
// computeds
const appLanguage = computed(() => appConfigStore.appLanguage)
const notifications = computed(() => notificationStore.notifications)
const notificationsLength = computed(() => notificationStore.getNotificationsLength)
// functions
const changeAppLanguage = () => appConfigStore.changeAppLanguage()
// watches
// onMounted
</script>
<template>
  <header class="py-4">
    <div class="flex items-center justify-between w-full">
      <div class="header-top-left">
        <img src="@/assets/logo.svg" alt="Logo" class="min-w-12 w-12">
      </div>
      <div class="flex items-center header-top-right gap-4">
        <v-btn @click="changeAppLanguage()" icon elevation="0" variant="text">
          <img :src="appLanguage == 'pt-br' ? ptBrFlag : enUsFlag" width="30" alt="flag">
        </v-btn>

        <v-menu :disabled="!notificationsLength" v-model="showNotifications" :close-on-content-click="false"
          transition="scroll-y-transition">
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" icon flat variant="text">
              <v-badge :max="9" color="error" :content="notificationsLength">
                <v-icon>mdi-bell</v-icon>
              </v-badge>
            </v-btn>
          </template>

          <v-card min-width="300">
            <div class="flex flex-col p-4 gap-2">
              <div v-for="notification in notifications" class="border rounded-lg px-4 py-2">
                <h3>{{ notification.description }}</h3>
                <div class="flex justify-between items-center">
                  <p class="text-xs">{{ notification.status }}</p>
                  <p class="text-xs">{{ dateFns.format(notification.createdAt, 'dd/MM/yyyy HH:mm:ss') }}</p>
                </div>
              </div>
            </div>
          </v-card>
        </v-menu>

        <v-btn icon="mdi-account" elevation="0" variant="text" />
      </div>
    </div>
  </header>
</template>

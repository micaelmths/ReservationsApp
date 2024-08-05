<script lang="ts" setup>
// importações de pacotes
import { RouterView, useRoute } from 'vue-router'

// importações de outros arquivos do projeto (sempre utilizar o @ para referenciar o .app)
import IndexHeader from '@/components/IndexHeader.vue'
// importações de tipos
// definePageMeta
// interfaces
// definição de props
// definição de emits (useEventBus)
// execuções gerais (geralmente são iniciadas com o prefixo 'on')
// constantes das libs
// constantes dos hooks
const route = useRoute()
// recursos de validação(zod, schema, initialvalue)
// refs

// computeds
// functions 
const setButtonRouteLinkVariant = (routeName: string) => {
  return route.name == routeName ? 'tonal' : 'text'
}

// watches
// onMounted

</script>
<template>
  <div class="main bg-gray-50 flex justify-center w-screen min-h-screen">
    <div class="flex flex-col w-full max-w-6xl px-4">
      <IndexHeader />

      <div class="my-8">
        <nav>
          <ul class="flex gap-2">
            <li><v-btn to="/" :variant="setButtonRouteLinkVariant('index')" color="primary"
                rounded="xl">Hospedagens</v-btn></li>
            <li><v-btn to="/flights" :variant="setButtonRouteLinkVariant('flights')" color="primary"
                rounded="xl">Voos</v-btn></li>
            <li><v-btn to="/car-rent" :variant="setButtonRouteLinkVariant('car-rent')" color="primary"
                rounded="xl">Aluguel de carros</v-btn></li>
            <li><v-btn to="/airbnb" :variant="setButtonRouteLinkVariant('airbnb')" color="primary"
                rounded="xl">Airbnb</v-btn></li>
          </ul>
        </nav>
      </div>
      <RouterView />
    </div>

  </div>
</template>

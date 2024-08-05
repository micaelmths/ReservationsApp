<script lang="ts" setup>
// importações de pacotes
import { type Ref, ref } from 'vue'
import { useRouter } from 'vue-router'
// importações de outros arquivos do projeto (sempre utilizar o @ para referenciar o .app)
import axios from 'axios'
import * as dateFns from 'date-fns'
// importações de tipos
import type { LocationData, CVCLocationsResponse } from '@/types'
// definePageMeta
// interfaces
interface SearchForm {
  local: null | LocationData
  dates: Date[] | string[],
  guests: {
    adults: number
    children: number
    rooms: number
  }
}
// definição de props
// definição de emits (useEventBus)
// execuções gerais (geralmente são iniciadas com o prefixo 'on')
// constantes das libs
// constantes dos hooks
const router = useRouter()
// recursos de validação(zod, schema, initialvalue)
// refs
const searchForm: Ref<SearchForm> = ref({
  local: null,
  dates: [],
  guests: {
    adults: 1,
    children: 0,
    rooms: 1
  }
})
const autocompleteInput = ref({
  search: ''
})
const items: Ref<LocationData[]> = ref([])
const showGuestsOptions = ref(false)
// computeds
// functions
async function fetchSearchInput() {
  const { data } = await axios<CVCLocationsResponse>(`${import.meta.env.VITE_SEARCH_URL}?q=${autocompleteInput.value.search}`)
  const newData = data.locations.filter(location => location.type == 'CITY')
  items.value = newData
}
function handleSearch() {
  router.push({
    path: '/search', query: {
      rooms: '30,30',
      checkIn: dateFns.format(searchForm.value.dates[0], 'yyyy-MM-dd'),
      checkOut: dateFns.format(searchForm.value.dates[searchForm.value.dates.length - 1], 'yyyy-MM-dd'),
      sortBy: 'pricePerDayWithTax',
      sortOrder: 'ascending',
      ignoreCache: 'false',
      noWebSocket: 'true',
      location: searchForm.value.local?.description,
      zoneId: searchForm.value.local?.masterCode
    }
  })
}
// watches
// onMounted
</script>
<template>
  <div>
    <div class="hero flex flex-col">
      <h1 class="font-bold tracking-wide text-5xl text-muted-800  text-center lg:text-left">Os melhores lugares você
        encontra aqui!
      </h1>
    </div>
    <div class="flex flex-col lg:flex-row items-center gap-2 lg:gap-1 my-8">
      <v-autocomplete class="w-full lg:w-1/4" hide-details variant="outlined" rounded="xl" density="compact"
        color="primary" prepend-inner-icon="mdi-map-marker" ref="autocompleteInput" @update:search="fetchSearchInput"
        v-model="searchForm.local" item-title="description" return-object :items="items"
        placeholder="Busque por destinos" no-data-text="Nenhum resultado encontrado">
      </v-autocomplete>
      <v-date-input class="w-full lg:w-1/4" hide-details v-model="searchForm.dates" :min="new Date()"
        show-adjacent-months clearable prepend-icon="" placeholder="DD/MM/AAAA" prepend-inner-icon="$calendar"
        variant="outlined" rounded="xl" density="compact" multiple="range" label="Período"></v-date-input>
      <v-menu v-model="showGuestsOptions" :close-on-content-click="false" transition="scroll-y-transition">
        <template v-slot:activator="{ props }">
          <v-text-field class="w-full lg:w-1/4" hide-details variant="outlined" density="compact" rounded="xl"
            :value="`${searchForm.guests.adults} adultos | ${searchForm.guests.children} crianças | ${searchForm.guests.rooms} quartos  `"
            color="primary" prepend-inner-icon="mdi-account-multiple" readonly v-bind="props"></v-text-field>
        </template>

        <v-card min-width="300">
          <div class="flex flex-col p-4 gap-2">
            <div class="flex items-center justify-between">
              <p>Adultos</p>
              <v-number-input v-model="searchForm.guests.adults" variant="outlined" density="compact" hide-details
                max-width="140" :min="1" :max="10" :reverse="false" inset label="" :hideInput="false"
                control-variant="split"></v-number-input>
            </div>
            <div class="flex items-center justify-between">
              <p>Crianças</p>
              <v-number-input v-model="searchForm.guests.children" variant="outlined" density="compact" hide-details
                max-width="140" :min="0" :max="10" :reverse="false" inset label="" :hideInput="false"
                control-variant="split"></v-number-input>
            </div>
            <div class="flex items-center justify-between">
              <p>Quartos</p>
              <v-number-input v-model="searchForm.guests.rooms" variant="outlined" density="compact" hide-details
                max-width="140" :min="1" :max="10" :reverse="false" inset label="" :hideInput="false"
                control-variant="split"></v-number-input>
            </div>
          </div>
        </v-card>
      </v-menu>
      <v-btn @click="handleSearch" class="w-full lg:w-1/4" variant="flat" color="primary" height="40" rounded="xl">
        <span class="font-semibold">Pesquisar</span>
      </v-btn>
    </div>
    <div class="my-24">
      <h1 class="text-3xl font-semibold text-muted-800">Destinos mais procurados</h1>
      <p class="text-lg">Conheça os cartões postais mais procurados do Brasil</p>
      <div class="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        <div class="relative hover:scale-105 transition">
          <img class="w-full h-full rounded-xl " src="@/assets/img/cities/alagoinhas.jpg" alt="Alagoinhas" />
          <p class="absolute text-lg top-2 left-3 font-semibold text-white">Alagoinhas - BA</p>
        </div>
        <div class="relative hover:scale-105 transition">
          <img class="w-full h-full rounded-xl" src="@/assets/img/cities/brasilia.jpg" alt="Brasilia">
          <p class="absolute text-lg top-2 left-3 font-semibold text-white">Brasilia - DF</p>
        </div>
        <div class="relative hover:scale-105 transition">
          <img class="w-full h-full rounded-xl" src="@/assets/img/cities/rio-de-janeiro.jpg" alt="Rio de Janeiro">
          <p class="absolute text-lg top-2 left-3 font-semibold text-white">Rio de Janeiro - RJ</p>
        </div>
        <div class="relative hover:scale-105 transition">
          <img class="w-full h-full rounded-xl" src="@/assets/img/cities/salvador.jpg" alt="Salvador">
          <p class="absolute text-lg top-2 left-3 font-semibold text-white">Salvador - BA</p>
        </div>
        <div class="relative hover:scale-105 transition">
          <img class="w-full h-full rounded-xl" src="@/assets/img/cities/sao-paulo.jpg" alt="São Paulo">
          <p class="absolute text-lg top-2 left-3 font-semibold text-white">São Paulo - SP</p>
        </div>
        <div class="relative hover:scale-105 transition">
          <img class="w-full h-full rounded-xl" src="@/assets/img/cities/gramado.jpg" alt="Gramado">
          <p class="absolute text-lg top-2 left-3 font-semibold text-white">Gramado - RS</p>
        </div>
      </div>
    </div>
  </div>
</template>

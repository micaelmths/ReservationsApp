<script lang="ts" setup>
// importações de pacotes
import { computed } from 'vue'
import * as dateFns from 'date-fns'
import { useRoute, useRouter } from 'vue-router'
// importações de outros arquivos do projeto (sempre utilizar o @ para referenciar o .app)
import { useCompareStore } from '@/stores/compare'
// importações de tipos
import type { Hotel } from '@/types'
// definePageMeta
// interfaces
// definição de props
defineProps<{
  hotel: Hotel
}>()
// definição de emits (useEventBus)
// execuções gerais (geralmente são iniciadas com o prefixo 'on')
// constantes das libs
// constantes dos hooks
const router = useRouter()
const route = useRoute()
const compareStore = useCompareStore()
// recursos de validação(zod, schema, initialvalue)
// refs
// computeds
const diffDays = computed(() => dateFns.differenceInDays(route.query.checkOut as string, route.query.checkIn as string))
// functions
function goToLocationAddress(latitude: number, longitude: number) {
  window.open(`https://www.google.com/maps?q=${latitude},${longitude}`, '_blank')
}
function goToHotelDetails(id: string) {
  router.push({ path: `/hotel/${id}`, query: route.query })
}
// watches
// onMounted
</script>
<template>
  <div class="card-hotel sm:flex rounded-xl elevation-2">
    <div class="images">
      <img
        class="rounded-tl-xl rounded-tr-xl w-full sm:rounded-tr-none sm:rounded-tl-xl sm:rounded-bl-xl sm:w-44 sm:h-48 object-cover"
        :src="`${hotel.images[0].href}`" :alt="`${hotel.images[0].title}`">
    </div>
    <div class="description p-2 flex-1">
      <h3 class="text-lg font-semibold text-muted-800">{{ hotel.name }}</h3>
      <p class="text-sm text-muted-500">{{ hotel.location.address }} | <span
          @click="goToLocationAddress(hotel.location.coordinates.latitude, hotel.location.coordinates.longitude)"
          class="text-blue-500 underline cursor-pointer">Ver no Maps</span></p>
      <v-rating size="x-small" readonly v-model="hotel.award" color="orange" density="compact"></v-rating>
    </div>
    <div class="price-info flex flex-col justify-between border-t sm:border-t-0 sm:border-l sm:max-w-56 w-full p-2">
      <div class="flex flex-col">
        <v-checkbox v-model="compareStore.checkedHotels" :value="hotel" density="compact" hide-details class="text-xs">
          <template #label>
            <p class="text-sm">Comparar</p>
          </template>
        </v-checkbox>
        <p class="text-muted-800">Diária <span class="font-semibold">{{
          hotel.room.rate.pricePerDayWithTax.toLocaleString('pt-br', {
            style:
              'currency', currency: 'BRL'
          }) }}</span>
        </p>
      </div>
      <div>
        <p class="text-muted-800">Total para {{ diffDays }} diárias</p>
        <h2 class="text-4xl text-muted-800">{{ (hotel.room.rate.pricePerDayWithTax *
          diffDays).toLocaleString('pt-br', {
            style:
              'currency', currency: 'BRL'
          }) }}</h2>
      </div>
      <v-btn @click="goToHotelDetails(hotel.id)" rounded="lg" class="" color="primary">Detalhes</v-btn>
    </div>
  </div>
</template>

<script lang="ts" setup>
// importações de pacotes
import { computed, onMounted, ref, type Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import * as dateFns from 'date-fns'
// importações de outros arquivos do projeto (sempre utilizar o @ para referenciar o .app)
import FormReservationDialog from '@/components/reservation/FormReservationDialog.vue'
import { hotels } from '@/utils/mock'
// importações de tipos
import type { Hotel } from '@/types'
// definePageMeta
// interfaces
// definição de props
// definição de emits (useEventBus)
// execuções gerais (geralmente são iniciadas com o prefixo 'on')
// constantes das libs
// constantes dos hooks
const route = useRoute()
const router = useRouter()
// recursos de validação(zod, schema, initialvalue)
// refs
const hotelDetails: Ref<Hotel | undefined> = ref(undefined)
// computeds
const hotelAward = computed(() => hotelDetails.value?.award || 0)
const diffDays = computed(() => dateFns.differenceInDays(route.query.checkOut as string, route.query.checkIn as string))
// functions 
function loadHotelDetails() {
  const hotel = hotels.find(hotel => hotel.id == route.params.id)
  if (!hotel) {
    router.push('/404')
  }
  hotelDetails.value = hotel
}
function goToLocationAddress(latitude?: number, longitude?: number) {
  window.open(`https://www.google.com/maps?q=${latitude},${longitude}`, '_blank')
}
// watches
// onMounted
onMounted(() => {
  loadHotelDetails()
})
</script>
<template>
  <div class="pb-20">
    <h3 class="text-3xl font-semibold text-muted-800">{{ hotelDetails?.name }}</h3>
    <p class="text-sm text-muted-500">{{ hotelDetails?.location.address }} | <span
        @click="goToLocationAddress(hotelDetails?.location.coordinates.latitude, hotelDetails?.location.coordinates.longitude)"
        class="text-blue-500 underline cursor-pointer">Ver no Maps</span></p>
    <v-rating size="x-small" readonly v-model="hotelAward" color="orange" density="compact"></v-rating>
    <div class="flex gap-2 justify-between">
      <v-carousel class="w-[850px] h-96 elevation-2 rounded-lg" hide-delimiters>
        <v-carousel-item v-for="img in hotelDetails?.images" :src="`${img.href}`" class="object-cover" rounded="lg"
          cover></v-carousel-item>
      </v-carousel>
      <div>
        <v-card class="flex flex-col justify-between p-4 min-w-60 h-96" rounded="lg">
          <div>
            <p class="font-semibold text-lg text-muted-800 text-center">Detalhes da acomodação</p>
            <p class="text-muted-800"><span class="font-semibold">{{ (hotelDetails?.room.rate.pricePerDayWithTax ||
              0).toLocaleString('pt-br', {
                style:
                  'currency', currency: 'BRL'
              }) }}</span>/diária</p>
          </div>
          <div class="flex flex-col">
            <p class="text-muted-800">Categoria</p>
            <span class="text-muted-800 w-full rounded-lg border px-4 py-2"><v-icon icon="mdi-bed"></v-icon> {{
              hotelDetails?.room.category }}</span>
            <p class="text-muted-800">Café</p>
            <span class="text-muted-800 w-full rounded-lg border px-4 py-2"><v-icon icon="mdi-coffee-maker"></v-icon> {{
              hotelDetails?.room.mealPlan }}</span>

          </div>
          <div class="flex flex-col">
            <p class="text-muted-800">Valor total para {{ diffDays }} diárias</p>
            <p class="text-xl font-extrabold text-muted-800">{{ ((hotelDetails?.room.rate.pricePerDayWithTax || 0) *
              diffDays).toLocaleString('pt-br', {
                style:
                  'currency', currency: 'BRL'
              }) }}</p>
            <p class="text-xs text-muted-800" v-if="hotelDetails?.room.cancellationPolicy || false">Cancelamento
              gratuito</p>
            <div class="h-1 border-t my-3"></div>
            <FormReservationDialog :hotel="hotelDetails" />
          </div>
        </v-card>
      </div>
    </div>
    <div class="mt-4">
      <h2 class="text-2xl font-bold">Sobre a acomodação</h2>
      <p>{{ hotelDetails?.description }}</p>
      <h2 class="text-2xl font-bold mt-4">Serviços</h2>
      <div class="flex flex-wrap gap-2">
        <v-chip v-for="service in hotelDetails?.contents[0].items">{{ service.name }}</v-chip>
      </div>
    </div>

  </div>
</template>

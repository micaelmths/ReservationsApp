<script lang="ts" setup>
// importações de pacotes
import { onMounted, computed, ref, watch, getCurrentInstance } from 'vue'
import { useRoute } from 'vue-router'
import * as dateFns from 'date-fns'
// importações de outros arquivos do projeto (sempre utilizar o @ para referenciar o .app)
import { hotels, sortHotels } from '@/utils/mock'
import HotelCard from '@/components/HotelCard.vue'
import { useCompareStore } from '@/stores/compare'
// importações de tipos
// definePageMeta
// interfaces
// definição de props
// definição de emits (useEventBus)
// execuções gerais (geralmente são iniciadas com o prefixo 'on')
// constantes das libs
// constantes dos hooks
const route = useRoute()
const compareStore = useCompareStore()
// recursos de validação(zod, schema, initialvalue)
// refs
const compareDialog = ref(false)
// computeds
const diffDays = computed(() => dateFns.differenceInDays(route.query.checkOut as string, route.query.checkIn as string))
const hotelOne = computed(() => compareStore.checkedHotels[0])
const hotelTwo = computed(() => compareStore.checkedHotels[1])
// functions
const resetCheckedHotels = () => compareStore.resetCheckedHotels()

function closeDialog() {
  resetCheckedHotels()
  compareDialog.value = false
}
function orderList(value: 'price' | 'award') {
  sortHotels(value)
  const instance = getCurrentInstance()
  instance?.proxy?.$forceUpdate()
}
// watches
watch(() => compareStore.checkedHotels, () => {
  if (compareStore.checkedHotels.length == 2) {
    compareDialog.value = true
  }
})
// onMounted
</script>
<template>
  <div class="pb-10">
    <div class="flex justify-between py-2">
      <h2>{{ hotels.length }} hotéis para {{ diffDays }} diárias</h2>
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" variant="text" rounded="lg" color="primary"> <v-icon
              icon="mdi-filter-variant"></v-icon>Ordenar por</v-btn>
        </template>
        <v-list>
          <v-list-item @click="orderList('price')" value="price">
            <v-list-item-title>Preço</v-list-item-title>
          </v-list-item>
          <v-list-item @click="orderList('award')" value="award">
            <v-list-item-title>Avaliação</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
    <div class="flex flex-col gap-6">
      <HotelCard :hotel="hotel" v-for="hotel in hotels" />
    </div>

    <v-dialog persistent v-model="compareDialog" max-width="1152">
      <v-card class="p-4">
        <div v-if="hotelOne && hotelTwo" class="flex flex-col sm:flex-row">
          <div class="hotel-one sm:w-1/2 p-2">
            <h3 class="text-3xl font-semibold text-muted-800">{{ hotelOne.name }}</h3>
            <p class="text-sm text-muted-500">{{ hotelOne.location.address }}</p>
            <v-rating size="x-small" readonly v-model="hotelOne.award" color="orange" density="compact"></v-rating>
            <div>
            </div>
            <div class="flex flex-col gap-2">
              <span class="text-muted-800 w-full rounded-lg border px-4 py-2"><v-icon icon="mdi-bed"></v-icon> {{
                hotelOne.room.category }}</span>
              <span class="text-muted-800 w-full rounded-lg border px-4 py-2"><v-icon icon="mdi-coffee-maker"></v-icon>
                {{
                  hotelOne.room.mealPlan }}</span>

            </div>
            <div class="flex flex-wrap gap-2 mt-2">
              <v-chip v-for="service in hotelOne.contents[0].items">{{ service.name }}</v-chip>
            </div>
            <div class="flex justify-center mt-2">

              <p class="text-muted-800"><span class="font-semibold">{{ (hotelOne.room.rate.pricePerDayWithTax ||
                0).toLocaleString('pt-br', {
                  style:
                    'currency', currency: 'BRL'
                }) }}</span>/diária</p>
            </div>
          </div>
          <div class="hotel-one sm:w-1/2 border-t sm:border-t-0 sm:border-l p-2">
            <h3 class="text-3xl font-semibold text-muted-800">{{ hotelTwo.name }}</h3>
            <p class="text-sm text-muted-500">{{ hotelTwo.location.address }}</p>
            <v-rating size="x-small" readonly v-model="hotelTwo.award" color="orange" density="compact"></v-rating>
            <div>
            </div>
            <div class="flex flex-col gap-2">
              <span class="text-muted-800 w-full rounded-lg border px-4 py-2"><v-icon icon="mdi-bed"></v-icon> {{
                hotelTwo.room.category }}</span>
              <span class="text-muted-800 w-full rounded-lg border px-4 py-2"><v-icon icon="mdi-coffee-maker"></v-icon>
                {{
                  hotelTwo.room.mealPlan }}</span>

            </div>
            <div class="flex flex-wrap gap-2 mt-2">
              <v-chip v-for="service in hotelTwo.contents[0].items">{{ service.name }}</v-chip>
            </div>
            <div class="flex justify-center mt-2">

              <p class="text-muted-800"><span class="font-semibold">{{ (hotelTwo.room.rate.pricePerDayWithTax ||
                0).toLocaleString('pt-br', {
                  style:
                    'currency', currency: 'BRL'
                }) }}</span>/diária</p>
            </div>
          </div>
        </div>
        <template v-slot:actions>
          <v-btn class="ms-auto" text="Fechar" @click="closeDialog"></v-btn>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts" setup>
// importações de pacotes
import { computed, ref, type ImgHTMLAttributes, type Ref } from 'vue'
import { useRoute } from 'vue-router'
import * as dateFns from 'date-fns'
import qrcode from 'qrcode'
// importações de outros arquivos do projeto (sempre utilizar o @ para referenciar o .app)
import { useAuthStore } from '@/stores/auth'
import { useNotificationStore } from '@/stores/notification'
// importações de tipos
import type { Hotel, Notification, NotificationStatus } from '@/types'
// definePageMeta
// interfaces
// definição de props
defineProps<{
  hotel?: Hotel
}>()
// definição de emits (useEventBus)
// execuções gerais (geralmente são iniciadas com o prefixo 'on')
// constantes das libs
// constantes dos hooks
const { user } = useAuthStore()
const notificationStore = useNotificationStore()
const route = useRoute()
// recursos de validação(zod, schema, initialvalue)
// refs
const finishingReservation = ref(false)
const form = ref({
  paymentType: '',
  creditCard: {
    number: '',
    name: '',
    code: '',
    installment: 1,
    installmentOptions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  }
})
// computeds
const checkIn = computed(() => dateFns.format(route.query.checkIn as string, 'dd/MM/yyyy'))
const checkOut = computed(() => dateFns.format(route.query.checkOut as string, 'dd/MM/yyyy'))
const diffDays = computed(() => dateFns.differenceInDays(route.query.checkOut as string, route.query.checkIn as string))
// functions
const addNotification = (notification: Notification) => notificationStore.addNotification(notification)
const updateNotificationStatus = (notificationId: string, status: NotificationStatus) => notificationStore.updateNotificationStatus(notificationId, status)
async function generateQrCode() {
  let canvas = document.getElementById('canvas')
  var opts = {
    errorCorrectionLevel: 'H',
    type: 'image/jpeg',
    quality: 0.3,
    margin: 1,
    color: {
      dark: "#010599FF",
      light: "#FFBF60FF"
    }
  }

  qrcode.toDataURL('exemple', function (err, url) {
    if (err) throw err
    var img: HTMLImageElement | null = document.getElementById('image') as HTMLImageElement
    if (!img) return
    img.src = url
  })
}
function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
async function finishReservation() {
  finishingReservation.value = true
  const notification = addNotification({
    description: 'Reserva',
    status: 'Pendente' as NotificationStatus,
    createdAt: new Date().toISOString()
  })
  let status = ''
  for (let i = 0; i < 2; i++) {
    await sleep(5000)
    status = i == 0 ? 'Em analise' : 'Concluído'
    updateNotificationStatus(notification.id as string, status as NotificationStatus)
  }
}
// watches
// onMounted
</script>
<template>
  <v-dialog transition="dialog-top-transition" max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn v-bind="activatorProps" rounded="lg" color="primary">Reservar</v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card class="text-muted-800 pb-3" title="Reserva">
        <div class="flex flex-col px-6">
          <v-text-field readonly v-model="user.name" variant="outlined" density="compact" label="Nome"></v-text-field>
          <v-text-field readonly v-model="user.email" variant="outlined" density="compact"
            label="E-mail"></v-text-field>
          <v-text-field readonly v-model="user.cpf" variant="outlined" density="compact" label="CPF"></v-text-field>
          <v-text-field readonly v-model="user.contact" variant="outlined" density="compact"
            label="Contato"></v-text-field>
          <div class="border-t"></div>
          <h2 class="text-center text-lg font-semibold mt-4">Detalhes da reserva</h2>
          <div class="flex flex-col">
            <h4 class="font-semibold">Local</h4>
            <p>{{ hotel?.name }}</p>
            <h4 class="font-semibold">Período</h4>
            <p>De {{ checkIn }} à {{ checkOut }}</p>
          </div>
          <div class="border-t mt-4"></div>
          <h2 class="text-center text-lg font-semibold mt-4">Pagamento</h2>
          <v-select v-model="form.paymentType" label="Opção de pagamento" :items="['Cartão de crédito', 'Pix']"
            variant="outlined" density="compact"></v-select>
          <div v-if="form.paymentType == 'Cartão de crédito'">
            <h4 class="font-semibold">Dados do cartão</h4>
            <v-text-field v-model="form.creditCard.name" variant="outlined" density="compact"
              label="Nome no cartão"></v-text-field>
            <div class="flex gap-2">
              <v-text-field class="w-2/3" v-model="form.creditCard.number" variant="outlined" density="compact"
                label="Número do cartão" v-maska="`#### #### #### ####`"></v-text-field>
              <v-text-field class="w-1/3" v-model="form.creditCard.code" variant="outlined" density="compact"
                label="CVC" v-maska="`###`"></v-text-field>
            </div>
            <v-select class="" v-model="form.creditCard.installment" :items="form.creditCard.installmentOptions"
              variant="outlined" density="compact" label="Parcelas">
              <template #item="{ props, item }">
                <v-list-item v-bind="props">
                  <template #title></template>
                  <template #default>
                    <div class="w-full flex items-center justify-between">
                      {{ props.value }}x {{ ((hotel?.room.rate.pricePerDayWithTax as number *
                        diffDays) / Number(props.value)).toLocaleString('pt-br', {
                          style:
                            'currency', currency: 'BRL'
                        }) }}

                    </div>
                  </template>
                </v-list-item>
              </template>
            </v-select>
          </div>
          <div v-if="form.paymentType == 'Pix'" class="flex flex-col justify-center mb-4">
            <v-btn @click="generateQrCode" color="primary" variant="tonal">Gerar QrCode</v-btn>
            <div class="flex justify-center">
              <img id="image">
            </div>
            <p class="text-xs text-muted-500 text-center mt-2">Ao utilizar a nossa plataforma para realizar pagamentos
              via
              PIX, você
              concorda com
              os termos e
              condições
              descritos neste documento. Caso não concorde com algum dos termos, por favor, não utilize este serviço.
            </p>
          </div>
          <v-btn @click="finishReservation" color="primary">Finalizar compra</v-btn>
        </div>
        <!-- <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="Sair" @click="isActive.value = false"></v-btn>
        </v-card-actions> -->
      </v-card>
    </template>
  </v-dialog>
</template>

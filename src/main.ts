import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { vMaska } from 'maska/vue'

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { VDateInput } from 'vuetify/labs/VDateInput'
import { VNumberInput } from 'vuetify/labs/VNumberInput'

import App from './App.vue'
import router from './router'

const vuetify = createVuetify({
  components: {
    ...components,
    VDateInput,
    VNumberInput,
  },
  directives,
  theme: {
    themes: {
      light: {
        dark: false,
        colors: {
          primary: '#13293D',
        }
      },
    },
  },
  locale: {
    locale: 'pt-br'
  }
})
const app = createApp(App).directive('maska', vMaska)

app.use(createPinia())
app.use(vuetify)
app.use(router)

app.mount('#app')

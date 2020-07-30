import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import '@/assets/main.css'

import {
  mdiCashUsdOutline,
  mdiPlaylistMinus,
  mdiAlphaPCircleOutline,
  mdiMoonWaningCrescent,
} from '@mdi/js'
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
//@ts-ignore
import VueMdijs from 'vue-mdijs'

VueMdijs.add({
  mdiCashUsdOutline,
  mdiPlaylistMinus,
  mdiAlphaPCircleOutline,
  mdiMoonWaningCrescent,
})

createApp(App).use(router).use(VueMdijs).mount('#app')

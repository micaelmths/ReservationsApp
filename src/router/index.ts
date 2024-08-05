import { createRouter, createWebHistory } from 'vue-router'
import IndexPage from '@/pages/IndexPage.vue'
import FlightsPage from '@/pages/FlightsPage.vue'
import CarRentPage from '@/pages/CarRentPage.vue'
import AirbnbPage from '@/pages/AirbnbPage.vue'
import SearchPage from '@/pages/SearchPage.vue'
import HotelDetailsPage from '@/pages/HotelDetailsPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: IndexPage
    },
    {
      path: '/flights',
      name: 'flights',
      component: FlightsPage
    },
    {
      path: '/car-rent',
      name: 'car-rent',
      component: CarRentPage
    },
    {
      path: '/airbnb',
      name: 'airbnb',
      component: AirbnbPage
    },
    {
      path: '/search',
      name: 'search',
      component: SearchPage
    },
    {
      path: '/hotel/:id',
      name: 'hotel-details-id',
      component: HotelDetailsPage
    },
  ]
})

export default router

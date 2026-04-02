import { createRouter, createWebHistory } from 'vue-router'
import SignUp from '@/pages/SignUp.vue'
import SignIn from '@/pages/SignIn.vue'
import TransactionOperation from '@/pages/TransactionOperation.vue'
import TransactionList from '@/pages/TransactionList.vue'

const routes = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: SignIn },
    { path: '/sign-up', component: SignUp },
    {
      path: '/transaction-list',
      children: [
        {
          path: '',
          component: TransactionList,
        },
        { path: ':operation/:type/:id?', component: TransactionOperation },
      ],
    },
  ],
})

export default routes

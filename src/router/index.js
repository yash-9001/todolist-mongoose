import { createRouter, createWebHistory } from 'vue-router'
import userRegistration from '@/components/userRegistration.vue'
import userLogin from '@/components/userLogin.vue'
import homeComponent from '@/components/homeComponent.vue'
import TodoList from '@/components/todoList.vue'
import ViewTask from '@/components/viewTask.vue'
import { ref } from 'vue'
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

const toast = useToast()

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: userLogin
    }, {
      path: '/register',
      name: 'register',
      component: userRegistration
    },
    {
      path: '/home',
      name: 'home',
      component: homeComponent
    },
    {
      path: '/todolist',
      name: 'todolist',
      component: TodoList
    },
    {
      path: '/viewtask',
      name: 'viewtask',
      component: ViewTask
    }
  ]
})
export default router;

const loggedIn = ref()
router.beforeEach((to) => {
  if (to.redirectedFrom) {
    loggedIn.value = to.redirectedFrom;
    if (loggedIn.value) {
      localStorage.setItem('isLoggedIn', true)
      localStorage.setItem('currentUser', loggedIn.value.query.userId)
    }
  }
  let currentUser = localStorage.getItem('currentUser');
  if (!currentUser || currentUser == 'undefined') {
    localStorage.setItem('isLoggedIn', false)
  }

  let isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'))
  let isRegistered = JSON.parse(localStorage.getItem('isRegistered'))

  if (!isLoggedIn && isRegistered) {
    if (to.name != 'login') {
      return { name: 'login' }
    }
  }

  if (!isLoggedIn && !isRegistered) {
    if (to.name != 'register') {
      return { name: 'register' }
    }
  }

  if (isLoggedIn && isRegistered) {
    if (to.name == 'login' || to.name == 'register') {
      toast.success("User Logged In Successfully")
      return { name: 'home' }
    }
  }

})
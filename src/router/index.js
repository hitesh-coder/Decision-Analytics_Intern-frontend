import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import store from '@/store'

const jwt = require('jsonwebtoken');

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '../views/Login.vue'),
    meta: { checkUser: true }
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import(/* webpackChunkName: "Signup" */ '../views/Signup.vue'),
    meta: { checkUser: true }
  },

  {
    path: '/:pathMatch(.*)*',
    name: 'pageNotFound',
    component: () => import(/* webpackChunkName: "PageNotFound" */ '../views/PageNotFound.vue'),
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem("jwt");

      if (token) {
        jwt.verify(token, 'Calendar App', (err, decodedToken) => {
          if (err) {
            store.commit("updateErrorMessage", err.message)
            next()
          } else {
            store.commit("updateCurrentUserId", decodedToken.id);
            next();
          }
        })
      } else {
        next();
      }
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const token = localStorage.getItem("jwt");

    if (token) {
      jwt.verify(token, 'Secret Code', (err, decodedToken) => {
        if (err) {
          store.commit("updateErrorMessage", err.message)
          next({
            name: "Login"
          })
        } else {
          store.commit("updateCurrentUserId", decodedToken.id);
          next();
        }
      })
    } else {
      next({
        name: "Login"
      });
    }
  }
  else if (to.matched.some(record => record.meta.checkUser)) {
    const token = localStorage.getItem("jwt");

    if (token) {
      jwt.verify(token, 'Secret Code', (err, decodedToken) => {
        if (err) {
          store.commit("updateErrorMessage", err.message)
          next()
        } else {
          store.commit("updateCurrentUserId", decodedToken.id);
          next({
            name: "Home"
          });
        }
      })
    } else {
      next();
    }
  }
  else {
    next();
  }
})

export default router

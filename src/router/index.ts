import {createRouter, createWebHistory} from 'vue-router'

import Access from '../views/Access.vue'
import Home from '../views/Home.vue'
import PasswordReset from '../views/PasswordReset.vue'

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: '/access/:method/',
		name: 'Access',
		component: Access,
		meta: {
			hideForAuth: true
		}
	},
	{
		path: '/reset/',
		name: 'Password Reset',
		component: PasswordReset,
		meta: {
			requiresAuth: true
		}
	}
]

let router = createRouter({
	history: createWebHistory(),
	routes
})

router.beforeEach((to, from, next) => {
	if (sessionStorage.getItem('jwt') !== null) {
		if (to.name === 'Access')
			next({path: '/'})
		else
			next()
	} else {
		if (to.name !== 'Access')
			next({path: '/access/sign-in'})
		else
			next()
	}
})

export default router

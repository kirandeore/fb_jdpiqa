// import Login from './views/Login.vue'
import Jdpiqa from './views/Jdpiqa.vue'

export default ({ constants,
    Router,
    vuexModuleRegistrationManager }) => new Router({
  routes: [
    // {
    //   path: '/',
    //   component: Login
    // },
    {
      path: '/apps',
      component: () => import(/* webpackChunkName: "Apps" */ './views/Apps.vue'),
      children: [{
        path: 'jdpiqa',
        component: Jdpiqa,
        beforeEnter: (to, from, next) => {
          vuexModuleRegistrationManager.registerVuexModules(constants.jdpiqa.modules)
          next()
        },
      }]
    }
  ]
})

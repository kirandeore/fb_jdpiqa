import Vue from 'vue'
import Vuex from 'vuex'
import Router from 'vue-router'
import _ from 'lodash'
import axios from 'axios'
import firebase from 'firebase'
import App from './App.vue'
import './registerServiceWorker'
import VuexModuleCreator from '@/vuex'
import AxiosInstanceCreator from '@/axios'
import ServiceCreator from '@/services'
import config from '@/config'
import SessionStorageManager from '@/utils/SessionStorageManager'
import constants from '@/utils/constants'
import globalLibs from '@/utils/globalLibs'
import logDisabler from '@/utils/logDisabler'
import makeRouter from '@/router'
import VuexModuleRegistrationManager from '@/utils/vuexModuleRegistrationManager'
import InterceptorCreator from '@/axios/interceptors'
import RequestCanceller from '@/utils/requestCanceller'
import iView from 'iview'
import 'iview/dist/styles/iview.css'

Vue.use(iView);
Vue.use(Vuex)
Vue.use(Router)

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAjzNDi4fBMjpUwxBsj_oEcsRsZNcsjF2U",
  authDomain: "jdpiqa.firebaseapp.com",
  databaseURL: "https://jdpiqa.firebaseio.com",
  projectId: "jdpiqa",
  storageBucket: "jdpiqa.appspot.com",
  messagingSenderId: "961745701287"
})

firebaseApp.firestore().settings({ timestampsInSnapshots: true })

if (!config.enableLogging) {
  logDisabler()
}

const interceptors = _.mapValues(InterceptorCreator, value => value())

const requestCanceller = RequestCanceller({ _, axios })

const axiosInstances = _.mapValues(AxiosInstanceCreator, value => value({
  config, axios, interceptors }))

const services = _.mapValues(ServiceCreator, value => value({ axiosInstances, requestCanceller }))

const vuexModules = _.mapValues(VuexModuleCreator, value => value({
  services,
  SessionStorageManager,
  _,
  storageKey: 'vueApp' }))

const store = new Vuex.Store({
    modules: {
      sessionModule: vuexModules.sessionModule
    }
})

const vuexModuleRegistrationManager = VuexModuleRegistrationManager({
  store, vuexModules
})

Vue.use(globalLibs, {
  prototypeCollection: {
    _,
    vuexModuleRegistrationManager,
    config,
    constants,
    services,
    firebase,
    firebaseApp
  }
})

const router = makeRouter({ constants, vuexModuleRegistrationManager, Router })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

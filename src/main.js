import Vue from 'vue'
import 'es6-promise/auto'
import App from './App.vue'
import appStore from "./services/vuex/store";

import css from './scss/main.scss';

let app = new Vue({
  el: '#app',
  store: appStore,
  render: h => h(App)
})

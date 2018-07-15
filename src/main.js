import Vue from 'vue';

import './helper/style/reset.css'
import './helper/style/main.css'
import './helper/style/global.css'

import App from './App.vue';

new Vue({
  el: '#app',
  render: h => h(App)
});

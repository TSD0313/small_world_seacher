import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';

Vue.use(Vuetify);

export default new Vuetify({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app');

import "@mdi/font/css/materialdesignicons.css";
import Vue from "vue";
import VueRouter from "vue-router";
import Vuelidate from "vuelidate";
import Vuetify from "vuetify/lib";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import { createProvider } from './vue-apollo'

Vue.use(VueRouter);
Vue.use(Vuelidate);
Vue.use(Vuetify);

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount("#app");

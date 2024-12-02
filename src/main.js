import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';

import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import BootstrapVue3 from 'bootstrap-vue-3';

import axios from 'axios';
import VueAxios from 'vue-axios';

const app = createApp(App);

app.use(BootstrapVue3);

app.use(router);
app.use(VueAxios, axios);

app.mount('#app');

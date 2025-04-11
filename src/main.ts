import { createApp } from 'vue'
import './assets/styles/index.css'

import App from './App.vue'
import router from './router';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const app = createApp(App);

// Глобальное подключение иконок(компонент в коде)
app.component('font-awesome-icon', FontAwesomeIcon);

//Роуты для переключения по страницам(маршрутизации)
app.use(router);

// Запуск и монтировка приложения
app.mount('#app');

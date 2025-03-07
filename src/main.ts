import { createApp } from 'vue'
import './assets/styles/index.css'

import App from './App.vue'
import router from './router';

// import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
// import { faHome, faChalkboardTeacher, faCalendar } from '@fortawesome/free-solid-svg-icons';

// library.add(faHome, faCalendar, faChalkboardTeacher);

const app = createApp(App);

// Глобальное подключение иконок(компонент в коде)
app.component('font-awesome-icon', FontAwesomeIcon);

//Роуты для переключения по страницам(маршрутизации)
app.use(router);

// Запуск и монтировка приложения
app.mount('#app');

import { createApp } from 'vue'
import Antd from 'ant-design-vue';
import router from './routes/index'
import App from './App.vue';
import store from './store/index';
import TestPlugin from './plugins/test.plugin';

const app = createApp(App);

app.use(Antd);

app.use(router);

app.use(store);

app.use(TestPlugin);

app.mount('#app')

import { App } from 'vue'
import HelloTest from '../components/HelloTest.vue';

const plugins = {
    install: (app: App) => {
        app.config.globalProperties.$echo = () => {
            console.log('全局上注册一个$echo方法~~~');
        }

        app.component('hello-test', HelloTest)
    }
}

export default plugins
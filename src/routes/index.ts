import { createRouter, createWebHistory } from 'vue-router'
import Editor from '../views/Editor.vue'
import Home from '../views/Home.vue'
import TemplateDetail from '../views/TemplateDetail.vue'
import Index from '../views/Index.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'index',
            component: Index,
            children: [
                {
                    path: '',
                    name: 'home',
                    component: Home,
                },
                {
                    path: 'template/:id',
                    name: 'template',
                    component: TemplateDetail,
                    meta: {
                        withHeader: true
                    }
                }
            ]
        },
        // {
        //     path: '/',
        //     name: 'home',
        //     component: Home,
        //     meta: {
        //         withHeader: true
        //     }
        // },
        {
            path: '/editor',
            name: 'editor',
            component: Editor
        },
        // {
        //     path: '/template/:id',
        //     name: 'template',
        //     component: TemplateDetail,
        //     meta: {
        //         withHeader: true
        //     }
        // }
    ]
})

export default router;
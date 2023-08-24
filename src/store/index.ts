import { createStore } from 'vuex'
import templates, { TemplatesProps } from './templates'
import user, { UserProps } from './user';

/**
 * ts
 * 自动补全，类型检查
 */


export interface GlobalDataProps {
    user: UserProps;
    templates: TemplatesProps;
}

const store = createStore<GlobalDataProps>({
    modules: {
      user,
      templates,
    }
    // state: {
    //     user: {
    //         isLogin: false,
    //     },
    //     templates: listData
    // },
    
    // getters: {
    //   getTemplateById: (state) => (id: number) => {
    //     return state.templates.find(t => t.id === id)
    //   }
    // }
});

export default store
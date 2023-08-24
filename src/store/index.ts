import { createStore } from 'vuex'
import templates, { TemplatesProps } from './templates'
import user, { UserProps } from './user';
import editor, { EditorProps } from './editor'

/**
 * ts
 * 自动补全，类型检查
 */


export interface GlobalDataProps {
    user: UserProps;
    templates: TemplatesProps;
    editor: EditorProps;
}

const store = createStore<GlobalDataProps>({
    modules: {
      user,
      templates,
      editor,
    }
});

export default store
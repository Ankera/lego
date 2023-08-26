import { Module } from "vuex";
import { v4 as uuidv4 } from "uuid";
import { GlobalDataProps } from "./index";
import { TextComponentProps } from "../defaultProps";

export interface ComponentData {
  props: { [key: string]: any };
  // uuid
  id: string;

  name: string;
}

export interface EditorProps {
  components: ComponentData[];

  currentElement: string;
}

export const testComponents: ComponentData[] = [
  {
    props: {
      text: "hello world 111",
      fontSize: "20px",
      color: "red",
      lineHeight: "1",
      textAlign: "left",
      fontFamily: "",
    },
    id: uuidv4(),
    name: "l-text",
  },
  {
    props: { text: "hello world 222", fontSize: "20px", fontFamily: "" },
    id: uuidv4(),
    name: "l-text",
  },
  {
    props: {
      text: "hello world 333",
      fontSize: "36px",
      lineHeight: "2",
      // actionType: "url",
      // url: "https://www.baidu.com/",
    },
    id: uuidv4(),
    name: "l-text",
  },
];

const editor: Module<EditorProps, GlobalDataProps> = {
  state: {
    components: testComponents,
    currentElement: "",
  },
  mutations: {
    // addComponent(state, props: Partial<TextComponentProps>) {
    //   const newComponent: ComponentData = {
    //     id: uuidv4(),
    //     name: "l-text",
    //     props,
    //   };

    //   state.components.push(newComponent);
    // },
    addComponent(state, component: ComponentData) {
      // const newComponent: ComponentData = {
      //   id: uuidv4(),
      //   name: "l-text",
      //   props,
      // };
      state.components.push(component);
    },
    setActive(state, currentId: string) {
      state.currentElement = currentId;
    },
    updateComponent(state, { key, value }) {
      const updateComponent = state.components.find(
        (component) => component.id === state.currentElement
      );
      if (updateComponent) {
        updateComponent.props[key as keyof TextComponentProps] = value;
      }
    },
  },
  getters: {
    getCurrentElement(state) {
      return state.components.find(
        (component) => component.id === state.currentElement
      );
    },
  },
};

export default editor;

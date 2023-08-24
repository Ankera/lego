import { Module } from "vuex";
import { GlobalDataProps } from "./index";

export interface TemplateProps {
  id: number;
  title: string;
  coverImg: string;
  author: string;
  copiedCount: number;
  isHot?: boolean;
  isNew?: boolean;
}

const listData: TemplateProps[] = [
  {
    id: 1,
    coverImg:
      "https://img0.baidu.com/it/u=1604010673,2427861166&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1692982800&t=d6b23975188da4187d104da3a7f4482d",
    title: "测试111",
    author: "111",
    copiedCount: 2,
  },
  {
    id: 2,
    coverImg: "",
    title: "测试222",
    author: "222",
    copiedCount: 2,
  },
  {
    id: 3,
    coverImg: "",
    title: "测试333",
    author: "333",
    copiedCount: 2,
  },
  {
    id: 4,
    coverImg: "",
    title: "测试444",
    author: "444",
    copiedCount: 2,
  },
  {
    id: 5,
    coverImg: "",
    title: "测试555",
    author: "555",
    copiedCount: 2,
  },
];

export interface TemplatesProps {
  data: TemplateProps[];
}

const templates: Module<TemplatesProps, GlobalDataProps> = {
  state: {
    data: listData,
  },
  getters: {
    getTemplateById: (state) => (id: number) => {
      return state.data.find((t) => t.id === id);
    },
  },
};

export default templates;

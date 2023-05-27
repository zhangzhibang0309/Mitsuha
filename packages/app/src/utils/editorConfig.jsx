// 列表区可以显示所有的物料
// key对应的组件映射关系

import MyRange from "@/components/myRange";
import './style.css'

import { ref } from "vue";

function createEditorConfig() {
  const componentList = []; // 左侧物料显示内容
  const componentMap = {}; // 显示区域匹配对应物料
  return {
    componentList,
    componentMap,
    register: (component) => {
      componentList.push(component);
      componentMap[component.key] = component;
    },
  };
}

export const registerConfig = createEditorConfig();

const createInputProp = (label) => ({ type: "input", label });
const createColorProp = (label) => ({ type: "color", label });
const createSelectProp = (label, options) => ({
  type: "select",
  label,
  options,
});

// 注册物料信息
registerConfig.register({
  label: "文本",
  preview: () => "预览文本",
  render: ({ props }) => {
    return (
      <span style={{ color: props.color, fontSize: props.size }}>
        {props.text || "渲染文本"}
      </span>
    );
  },
  key: "text",
  props: {
    text: createInputProp("文本内容"),
    color: createColorProp("字体颜色"),
    size: createSelectProp("字体大小", [
      { label: "14px", value: "14px" },
      { label: "24px", value: "24px" },
      { label: "34px", value: "34px" },
    ]),
  },
});

registerConfig.register({
  label: "链接",
  preview: () => "链接",
  render: ({ props }) => {
    return (
      <el-link
        style={{ color: props.color, fontSize: props.size }}
        href={props.href}
        target="_blank"
      >
        {props.text || "链接"}
      </el-link>
    );
  },
  key: "link",
  props: {
    text: createInputProp("文本内容"),
    color: createColorProp("字体颜色"),
    size: createSelectProp("字体大小", [
      { label: "14px", value: "14px" },
      { label: "24px", value: "24px" },
      { label: "34px", value: "34px" },
    ]),
  },
});

registerConfig.register({
  label: "按钮",
  resize: {
    width: true,
    height: true,
  },
  preview: () => <el-button>预览按钮</el-button>,
  render: ({ props, size }) => {
    return (
      <el-button
        style={{ height: size.height + "px", width: size.width + "px" }}
        type={props.type}
        size={props.size}
      >
        {props.text || "渲染按钮"}
      </el-button>
    );
  },
  key: "button",
  props: {
    text: createInputProp("按钮内容"),
    type: createSelectProp("按钮类型", [
      { label: "基础", value: "primary" },
      { label: "成功", value: "success" },
      { label: "警告", value: "warning" },
      { label: "危险", value: "danger" },
      { label: "文本", value: "text" },
    ]),
    size: createSelectProp("按钮尺寸", [
      { label: "默认", value: "default" },
      { label: "大", value: "large" },
      { label: "小", value: "small" },
    ]),
  },
});

registerConfig.register({
  label: "输入框",
  resize: {
    width: true, // 更改输入框的横向大小
  },
  preview: () => <el-input placeholder="预览输入框" />,
  render: ({ model, size }) => (
    <el-input
      placeholder="渲染输入框"
      {...model.default}
      style={{ width: size.width + "px" }}
    />
  ),
  key: "input",
  model: {
    // {default: 'username'}
    default: "绑定字段",
  },
});

registerConfig.register({
  label: "范围选择器",
  preview: () => <MyRange placeholder="预览输入框" />,
  render: ({ model }) => {
    return (
      <MyRange
        {...{
          start: model.start.modelValue, // @update:start
          end: model.end.modelValue,
          "onUpdate:start": model.start["onUpdate:modelValue"],
          "onUpdate:end": model.end["onUpdate:modelValue"],
        }}
      />
    );
  },
  key: "range",
  model: {
    start: "开始范围字段",
    end: "结束范围字段",
  },
});

registerConfig.register({
  label: "图片",
  resize: {
    width: true,
    height: true,
  },
  preview: () => (
    <img
      style={{ width: "200px" }}
      src="https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg"
    />
  ),
  render: ({ props, size }) => {
    return (
      <div>
        <img
          style={{ height: size.height + "px", width: size.width + "px" }}
          size={props.size}
          src={
            props.src ||
            "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg"
          }
        />
      </div>
    );
  },
  key: "img",
});

// 轮播图
registerConfig.register({
  label: "轮播图",
  resize: {
    width: true,
    height: true,
  },
  preview: () => <h1>轮播图</h1>,
  render: ({props, size}) => {
    let srcs = props?.srcs || ["https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg"]
    console.log(srcs)
    if(typeof srcs === "string") {
      srcs = srcs.split(',')
    }
    const tmp = srcs.map((item) => (
      <el-carousel-item style="height: 100%">
        <img style="width: 100%; height: 100%" src={item || "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg"} />
      </el-carousel-item>
    ));

    return (
      <div
        style={{ height: size.height + "px", width: size.width + "px"}}
        size={props.size}
        class="block"
      >
        <span class="demonstration">轮播</span>
        <el-carousel style="height: 100%">{tmp}</el-carousel>
      </div>
    );
  },
  key: "carousel",
});

const tableData = [
  {
    name: "张三",
    location: "北京",
    isSatisfaction: "是",
    type: "篮球",
    identity: "选手",
    words: "活动非常精彩！😊",
  },
  {
    name: "张三",
    location: "北京",
    isSatisfaction: "是",
    type: "篮球",
    identity: "选手",
    words: "活动非常精彩！😊",
  },
  {
    name: "张三",
    location: "北京",
    isSatisfaction: "是",
    type: "篮球",
    identity: "选手",
    words: "活动非常精彩！😊",
  },
];
registerConfig.register({
  label: "表格",
  resize: {
    width: true,
    height: true,
  },
  preview: () => <h1>表格</h1>,
  render: ({ props, size }) => {
    return (
      <el-table
        style={{ height: size.height + "px", width: size.width + "px" }}
        size={props.size}
        data={tableData}
      >
        <el-table-column prop="name" label="活动名称" />
        <el-table-column prop="location" label="活动地点" />
        <el-table-column prop="isSatisfaction" label="是否满意" />
        <el-table-column prop="type" label="活动类型" />
        <el-table-column prop="identity" label="身份" />
        <el-table-column prop="words" label="想说的话" />
      </el-table>
    );
  },
  key: "tabel",
});

const form = ref({
  name: "",
  region: "",
  date1: "",
  date2: "",
  delivery: false,
  type: [],
  resource: "",
  desc: "",
});

const onSubmit = () => {
  console.log("submit!");
};
registerConfig.register({
  label: "表单",
  resize: {
    width: true,
    height: true,
  },
  preview: () => <h1>表单</h1>,
  render: ({ props, size }) => {
    return (
      <el-form
        style={{ height: size.height + "px", width: size.width + "px" }}
        size={props.size}
        model={form}
        label-width="120px"
      >
        <el-form-item label="活动名称">
          <el-input v-model={form.value.name} />
        </el-form-item>
        <el-form-item label="活动地点">
          <el-select v-model={form.value.region} placeholder="请选择活动地点">
            <el-option label="上海" value="shanghai" />
            <el-option label="北京" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="是否满意">
          <el-switch v-model={form.value.delivery} />
        </el-form-item>
        <el-form-item label="活动类型">
          <el-checkbox-group v-model={form.value.type}>
            <el-checkbox label="足球" name="type" />
            <el-checkbox label="篮球" name="type" />
            <el-checkbox label="排球" name="type" />
            <el-checkbox label="乒乓球" name="type" />
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="身份">
          <el-radio-group v-model={form.value.resource}>
            <el-radio label="裁判" />
            <el-radio label="参加者" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="想说的话">
          <el-input v-model={form.value.desc} type="textarea" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" onClick={onSubmit}>
            提交
          </el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    );
  },
  key: "form",
});

const value1 = ref([
  new Date(2000, 10, 10, 10, 10),
  new Date(2000, 10, 11, 10, 10),
]);
registerConfig.register({
  label: "日期事件选择器",
  preview: () => <h1>日期事件选择器</h1>,
  render: () => {
    return (
      <div class="block">
        <span class="demonstration">Default</span>
        <el-date-picker
          v-model={value1}
          type="datetimerange"
          range-separator="To"
          start-placeholder="Start date"
          end-placeholder="End date"
        />
      </div>
    );
  },
  key: "date",
});

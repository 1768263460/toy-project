export class ToyVue {
  constructor(config) {
    // 1. 模板 -> 真实 dom
    this.tempalte = document.querySelector(config.el);
    // 2. data -> 响应式 data
    this.data = reactive(config.data);
    // 3. 处理 methods
    this.handleMethods(config.methods);
    // 4. 处理 template
    this.traversal(this.tempalte);
  }

  handleMethods(methods) {
    for (let name in methods) {
      // 保证方法中的 this 指向为 this.data
      this[name] = methods[name].bind(this.data);
    }
  }

  traversal(node) {
    // 1. 处理文本节点，处理 {{}}
    if (node.nodeType === Node.TEXT_NODE) {
      console.log("textContent = ", node.textContent);
      if (node.textContent.trim().match(/^{{([\s\S]+)}}$/)) {
        let name = RegExp.$1.trim();
        // 1.1 替换 {{ msg }} 为 data.msg
        effect(() => {
          node.textContent = this.data[name];
        });
      }
    }
    // 2. 处理 dom 元素 attributes 属性, 处理指令
    if (node.nodeType === Node.ELEMENT_NODE) {
      let attributes = node.attributes;
      for (let attribute of attributes) {
        console.log("attribute = ", attribute);
        // 2.1 处理 v-model
        if (attribute.name === "v-model") {
          let name = attribute.value;
          // 2.1.1 更新 dom 元素 value
          effect(() => {
            node.value = this.data[name];
          });
          // 2.1.2 给 dom 元素注册事件，根据不同表单类型注册不同事件
          node.addEventListener("input", () => {
            this.data[name] = node.value;
          });
        }
        // 2.2 处理 v-bind
        if (attribute.name.match(/^v\-bind:([\s\S]+)$/)) {
          let attrName = RegExp.$1;
          let name = attribute.value;
          console.log("v-bind = ", attrName, name);
          // 2.2.1 为 dom 元素设置对应属性和属性内容
          effect(() => {
            node.setAttribute(attrName, this.data[name]);
          });
        }
        // 2.3 处理 v-on
        if (attribute.name.match(/^v\-on:([\s\S]+)$/)) {
          let attrName = RegExp.$1;
          let name = attribute.value;
          console.log("v-on = ", attrName, name);
          // 2.2.1 为 dom 元素注册事件
          effect(() => {
            node.addEventListener(attrName, this[name]);
          });
        }
      }
    }
    // 3. 递归处理子节点
    if (node.childNodes && node.childNodes.length) {
      for (let child of node.childNodes) {
        this.traversal(child);
      }
    }
  }
}

let effects = new Map();
let currentEffect = null;

// 收集依赖
function effect(fn) {
  currentEffect = fn;
  fn(); // 初始化执行，目的是为了自动收集依赖 depends
  currentEffect = null;
}

// 响应式
function reactive(traget) {
  let observe = new Proxy(traget, {
    get(object, prop) {
      console.log("get = ", object, prop);
      // 1. 当前 currentEffect 存在，证明当前 effect 中依赖了当前响应式数据中的属性，此时要收集依赖
      if (currentEffect) {
        // 1.1 当前 effects 不存在和 object 对应属性, 收集依赖
        if (!effects.has(object)) {
          effects.set(object, new Map());
        }
        // 1.2 从 effects 中获到对应依赖项，判断当前访问 key 是否已存在对应依赖中，不存在则给定初始值为 array ，方便之后添加和删除
        if (!effects.get(object).has(prop)) {
          effects.get(object).set(prop, new Array());
        }
        // 1.3 将当前 currentEffect 存储在对应的 effects[object][prop] 中
        effects.get(object).get(prop).push(currentEffect);
      }

      // 2. 返回当前访问属性对应值
      return object[prop];
    },
    set(object, prop, value) {
      console.log("set = ", object, prop, value);
      // 1. 更新当前属性对应值
      object[prop] = value;

      // 2. 根据收集的依赖，执行 effect
      if (effects.has(object) && effects.get(object).has(prop)) {
        for (let effect of effects.get(object).get(prop)) {
          effect();
        }
      }

      return true;
    },
  });

  return observe;
}

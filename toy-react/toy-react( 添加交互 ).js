// ElementWrapper
class ElementWrapper {
  constructor(type) {
    this.root = document.createElement(type);
  }

  setAttribute(name, value) {
    if (name.match(/^on([\s\S]+)$/)) {
      const eventName = RegExp.$1;
      this.root.addEventListener(eventName.toLowerCase(), value);
    } else {
      if (name === "className") {
        name = "class";
      }
      this.root.setAttribute(name, value);
    }
  }

  appendChild(component) {
    let range = document.createRange();
    range.setStart(this.root, this.root.childNodes.length);
    range.setEnd(this.root, this.root.childNodes.length);
    component._renderToDom(range);
  }

  _renderToDom(range) {
    // 删除内容
    range.deleteContents();
    // 重新添加内容
    range.insertNode(this.root);
  }
}

// TextWrapper
class TextWrapper {
  constructor(content) {
    this.root = document.createTextNode(content);
  }

  _renderToDom(range) {
    // 删除内容
    range.deleteContents();
    // 重新添加内容
    range.insertNode(this.root);
  }
}

// Component
export class Component {
  constructor() {
    this.props = {};
    this.children = [];
    this._range = null;
  }

  setAttribute(name, value) {
    this.props[name] = value;
  }

  appendChild(component) {
    this.children.push(component);
  }

  _renderToDom(range) {
    this._range = range;
    this.render()._renderToDom(range);
  }

  rerender() {
    // 保存 oldRange
    let oldRange = this._range;

    // 根据 oldRange 创建新的 range
    const { startContainer, startOffset } = oldRange;
    let range = document.createRange();
    range.setStart(startContainer, startOffset);
    range.setEnd(startContainer, startOffset);
    this._renderToDom(range);

    // 重置 oldRange 的 start
    oldRange.setStart(range.endContainer, range.endOffset);
    // 删除 oldRange 的 contents
    oldRange.deleteContents();
  }

  setState(newState) {
    if (this.state === null || typeof this.state !== "object") {
      this.state = newState;
      this.rerender();
      return;
    }

    let merge = (oldState, newState) => {
      for (let key in newState) {
        if (oldState[key] === null || typeof oldState[key] !== "object") {
          oldState[key] = newState[key];
        } else {
          merge(oldState[key], newState[key]);
        }
      }
    };

    merge(this.state, newState);
    this.rerender();
  }
}

// createElement
export function createElement(type, attributes, ...children) {
  // 1. 获取 dom 实例
  let currentElement;
  if (typeof type === "string") {
    currentElement = new ElementWrapper(type);
  } else {
    currentElement = new type();
  }

  // 2. 处理 dom 实例属性
  if (attributes) {
    for (const name in attributes) {
      currentElement.setAttribute(name, attributes[name]);
    }
  }

  // 3. 处理子节点
  const insertChildren = (children) => {
    if (children.length) {
      for (let child of children) {
        // 为 null 不做处理
        if (child === null) {
          continue;
        }

        // 处理文本节点(包括 string 和 num 类型)
        if (typeof child === "string" || typeof child === "number") {
          child = new TextWrapper(child);
        }

        // 当子节点拥有子节点时，递归处理
        // 即在组件中使用了 { this.children } 表达式
        if (typeof child === "object" && child instanceof Array) {
          insertChildren(child);
        } else {
          currentElement.appendChild(child);
        }
      }
    }
  };

  // 初始化调用
  insertChildren(children);

  return currentElement;
}

// render
export function render(component, parentElement) {
  let range = document.createRange();
  range.setStart(parentElement, 0);
  range.setEnd(parentElement, parentElement.childNodes.length);
  component._renderToDom(range);
}

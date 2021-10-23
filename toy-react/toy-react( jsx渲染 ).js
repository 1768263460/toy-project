class ElementWrapper {
  constructor(type) {
    // 创建一个真实 dom 容器，方便统一规范，以及可操作 Dom Api
    this.root = document.createElement(type);
  }
  setAttribute(name, value) {
    this.root.setAttribute(name, value);
  }
  appendChild(component) {
    this.root.appendChild(component.root);
  }
}

class TextWrapper {
  constructor(content) {
    this.root = document.createTextNode(content);
  }
}

// Component
export class Component {
  constructor() {
    this.props = Object.create(null);
    this.children = [];
    this._root = null;
  }
  setAttribute(name, value) {
    this.props[name] = value;
  }
  appendChild(component) {
    this.children.push(component);
  }
  get root() {
    if (!this._root) {
      this._root = this.render().root;
    }
    return this._root;
  }
}

// createElement
export function createElement(type, attributes, ...children) {
  let currElement;

  if (typeof type === "string") {
    // type 为 string 则属于正常 HTML 标签名
    currElement = new ElementWrapper(type);
  } else {
    // 否则 type 为 class 组价 | function 组件
    currElement = new type();
  }

  if (attributes) {
    for (const name in attributes) {
      currElement.setAttribute(name, attributes[name]);
    }
  }

  let insertChildren = (children) => {
    if (children.length) {
      for (let child of children) {
        if (typeof child === "string") {
          child = new TextWrapper(child);
        }
        if (typeof child === "object" && child instanceof Array) {
          insertChildren(child);
        } else {
          currElement.appendChild(child);
        }
      }
    }
  };

  insertChildren(children);

  return currElement;
}

// render
export function render(component, parentElement) {
  parentElement.appendChild(component.root);
}

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

  get vDom() {
    return this.render().vDom;
  }

  // get vChildren() {
  //   return this.children.map((child) => child.vDom);
  // }

  _renderToDom(range) {
    this._range = range;
    this._vDom = this.vDom;
    this._vDom._renderToDom(range);
  }

  update() {
    let isSameNode = (oldNode, newNode) => {
      // 类型比对
      if (oldNode.type !== newNode.type) return false;

      // props比对
      for (let name in newNode.props) {
        if (newNode.props[name] !== oldNode.props[name]) {
          return false;
        }
      }

      if (Object.keys(oldNode.props).length > Object.keys(newNode.props).length)
        return false;

      // 文本比对
      if (newNode.type === "#text") {
        if (newNode.content !== oldNode.content) {
          return false;
        }
      }

      return true;
    };
    let update = (oldNode, newNode) => {
      // type , props , children
      // #text content
      if (!isSameNode(oldNode, newNode)) {
        newNode._renderToDom(oldNode._range);
        return;
      }
      newNode._range = oldNode._range;
      let newChildren = newNode.vChildren;
      let oldChildren = oldNode.vChildren;

      if(!newChildren || !newChildren.length) return;

      let tailRange = oldChildren[oldChildren.length - 1]._range;

      for (let i = 0; i <= newChildren.length; i++) {
        let newChild = newChildren[i];
        let oldChild = oldChildren[i];
        if (i < oldChildren.length) {
          update(oldChild, newChild);
        } else {
          // Todo
          let range = document.createRange();
          range.setStart(tailRange.endContainer, tailRange.endOffset);
          range.setEnd(tailRange.endContainer, tailRange.endOffset);
          newChild._renderToDom(range);
          tailRange = range;
        }
      }
    };

    let vDom = this.vDom;
    update(this._vDom, vDom);
    this._vDom = vDom;
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

// ElementWrapper
class ElementWrapper extends Component {
  constructor(type) {
    super(type);
    this.type = type;
    this._vChildren = null;
  }

  // 虚拟 dom
  get vDom() {
    this._vChildren = this.children.map((child) => child.vDom);
    return this;
    // return {
    //   type: this.type,
    //   props: this.props,
    //   children: this.children.map((child) => child.vDom),
    // };
  }

  _renderToDom(range) {
    this._range = range;
    let root = document.createElement(this.type);

    // 处理属性
    for (let name in this.props) {
      let value = this.props[name];
      if (name.match(/^on([\s\S]+)$/)) {
        const eventName = RegExp.$1;
        root.addEventListener(eventName.toLowerCase(), value);
      } else {
        if (name === "className") {
          name = "class";
        }
        root.setAttribute(name, value);
      }
    }

    if (!this.vChildren)
      this.vChildren = this.children.map((child) => child.vDom);

    // 处理 children
    for (let child of this.children) {
      let childRange = document.createRange();
      childRange.setStart(root, root.childNodes.length);
      childRange.setEnd(root, root.childNodes.length);
      child._renderToDom(childRange);
    }

    replaceContent(range, root);
  }
}

// TextWrapper
class TextWrapper extends Component {
  constructor(content) {
    super(content);
    this.content = content;
    this.type = "#text";
  }

  get vDom() {
    return this;
    // return {
    //   type: "#text",
    //   content: this.content,
    // };
  }

  _renderToDom(range) {
    this._range = range;
    let root = document.createTextNode(this.content);
    replaceContent(range, root);
  }
}


function replaceContent(range, node){
  range.insertNode(node);
  range.setStartAfter(node);
  range.deleteContents();

  range.setStartBefore(node);
  range.setEndAfter(node);
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

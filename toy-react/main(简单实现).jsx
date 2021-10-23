import { Component, createElement, render} from "./toy-react.js";

class MyComponent extends Component{
  render() {
    return (
      <div id="MyComponent">
        <h1>this is my component</h1>
        {this.children}
      </div>
    );
  }
}

// 这里会被 @babel/plugin-transform-react-jsx 解析为 createElement 方法进行调用
const jsx = (
  <div id="jsx" class="wrapper">
    <h1>this is JSX</h1>
    <MyComponent class="my-component">
      <h1 id="ComponentChild">this MyComponent Children</h1>
    </MyComponent>
  </div>
);

render(jsx,document.body)


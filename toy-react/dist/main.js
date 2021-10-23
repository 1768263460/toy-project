/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./main.jsx":
/*!******************!*\
  !*** ./main.jsx ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _toy_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toy-react */ \"./toy-react.js\");\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } else if (call !== void 0) { throw new TypeError(\"Derived constructors may only return object or undefined\"); } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\n\n\nvar MyComponent = /*#__PURE__*/function (_Component) {\n  _inherits(MyComponent, _Component);\n\n  var _super = _createSuper(MyComponent);\n\n  function MyComponent() {\n    var _this;\n\n    _classCallCheck(this, MyComponent);\n\n    _this = _super.call(this);\n    _this.state = {\n      count: '100'\n    };\n    return _this;\n  }\n\n  _createClass(MyComponent, [{\n    key: \"render\",\n    value: function render() {\n      return (0,_toy_react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"div\", {\n        id: \"MyComponent\"\n      }, (0,_toy_react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"h1\", null, \"i am MyComponent\"), (0,_toy_react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"h1\", null, \"this is count: \", this.state.count), this.children);\n    }\n  }]);\n\n  return MyComponent;\n}(_toy_react__WEBPACK_IMPORTED_MODULE_0__.Component);\n\nvar JSX = (0,_toy_react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"div\", {\n  id: \"jsx\"\n}, (0,_toy_react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"h1\", null, \"i am Jsx\"), (0,_toy_react__WEBPACK_IMPORTED_MODULE_0__.createElement)(MyComponent, null, (0,_toy_react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"h1\", null, \"i am MyComponent child\")));\n(0,_toy_react__WEBPACK_IMPORTED_MODULE_0__.render)(JSX, document.querySelector(\"#app\"));\n\n//# sourceURL=webpack://toy-react/./main.jsx?");

/***/ }),

/***/ "./toy-react.js":
/*!**********************!*\
  !*** ./toy-react.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Component\": () => (/* binding */ Component),\n/* harmony export */   \"createElement\": () => (/* binding */ createElement),\n/* harmony export */   \"render\": () => (/* binding */ render)\n/* harmony export */ });\n// ElementWrapper\r\nclass ElementWrapper {\r\n  constructor(type) {\r\n    this.root = document.createElement(type);\r\n  }\r\n  setAttribute(name, value) {\r\n    this.root.setAttribute(name, value);\r\n  }\r\n  appendChild(component) {\r\n    this.root.appendChild(component.root);\r\n  }\r\n}\r\n\r\n// TextWrapper\r\nclass TextWrapper {\r\n  constructor(content) {\r\n    this.root = document.createTextNode(content);\r\n  }\r\n}\r\n\r\n// Component\r\nclass Component {\r\n  constructor() {\r\n    this._root = null;\r\n    this.props = {};\r\n    this.children = [];\r\n  }\r\n\r\n  setAttribute(name, value) {\r\n    this.props[name] = value;\r\n  }\r\n\r\n  appendChild(component) {\r\n    this.children.push(component);\r\n  }\r\n\r\n  get root() {\r\n    if (!this._root) {\r\n      this._root = this.render().root;\r\n    }\r\n    return this._root;\r\n  }\r\n}\r\n\r\n// createElement\r\nfunction createElement(type, attributes, ...children) {\r\n  // 1. 获取 dom 实例\r\n  let currentElement;\r\n  if (typeof type === \"string\") {\r\n    currentElement = new ElementWrapper(type);\r\n  } else {\r\n    currentElement = new type();\r\n  }\r\n\r\n  // 2. 处理 dom 实例属性\r\n  if (attributes) {\r\n    for (const name in attributes) {\r\n      currentElement.setAttribute(name, attributes[name]);\r\n    }\r\n  }\r\n\r\n  // 3. 处理子节点\r\n  const insertChildren = (children) => {\r\n    if (children.length) {\r\n      for (let child of children) {\r\n        // 处理文本节点\r\n        if (typeof child === \"string\") {\r\n          child = new TextWrapper(child);\r\n        }\r\n        // 当子节点拥有子节点时，递归处理\r\n        // 即在组件中使用了 { this.children } 表达式\r\n        if (typeof child === \"object\" && child instanceof Array) {\r\n          insertChildren(child);\r\n        } else {\r\n          currentElement.appendChild(child);\r\n        }\r\n      }\r\n    }\r\n  };\r\n\r\n  // 初始化调用\r\n  insertChildren(children);\r\n\r\n  return currentElement;\r\n}\r\n\r\n// render\r\nfunction render(component, parentElement) {\r\n  parentElement.appendChild(component.root);\r\n}\r\n\n\n//# sourceURL=webpack://toy-react/./toy-react.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./main.jsx");
/******/ 	
/******/ })()
;
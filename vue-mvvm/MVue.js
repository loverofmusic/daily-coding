class Compile {
  constructor(el, vm) {
    this.el = this.isElementNode(el) ? el : document.querySelector(el);
    this.vm = vm;
    // console.log(this.el);
    // 1.获取文档碎片对象 放入内存中会减少页面的回流和重绘
    const fragment = this.node2Fragment(this.el);

    // 2. 编译模版
    this.compile(fragment);

    // 3. 追加子元素到根元素
    this.el.appendChild(fragment);
  }
  compile(fragment) {
    // 1.获取子节点
    const childNodes = fragment.childNodes;
    // console.log([...childNodes])
    [...childNodes].forEach(child => {
      if (this.isElementNode(child)) {
        // console.log("元素节点", child);
        //元素节点
        //编译元素节点
        this.compileElement(child);
      } else {
        // console.log("文本节点", child);
        //文本节点
        //编译文本节点
        this.compileText(child);
      }
      if (child.childNodes && child.childNodes.length) {
        this.compile(child);
      }
    });
  }
  isElementNode(node) {
    return node.nodeType === 1;
  }
  node2Fragment(el) {
    //创建文档碎片
    const f = document.createDocumentFragment();
    let firstChild;
    while ((firstChild = el.firstChild)) {
      // while (el.firstChild) {
      // f.appendChild(el.firstChild);
      f.appendChild(firstChild);
    }
    return f;
  }
  compileElement(node) {}
  compileText(node) {}
}

class MVue {
  constructor(options) {
    this.$el = options.el;
    this.$data = options.data;
    this.$options = options;
    if (this.$el) {
      //1.实现一个数据观察者
      //2.实现一个指令解析器
      new Compile(this.$el, this);
    }
  }
}

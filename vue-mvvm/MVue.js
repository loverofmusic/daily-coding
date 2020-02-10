class Compile {
  constructor(el, vm) {
    this.el = this.isElementNode(el) ? el : document.querySelector(el);
    this.vm = vm;
    // console.log(this.el);
    // 获取文档碎片对象 放入内存中会减少页面的回流和重绘
    const fragment = this.node2Fragment(this.el);
    // console.log(fragment)
  }
  isElementNode(node) {
    return node.nodeType === 1;
  }
  node2Fragment(el) {
    //创建文档碎片
    const f = document.createDocumentFragment();
    let firstChild;
    while (firstChild = el.firstChild) {
    // while (el.firstChild) {
      // f.appendChild(el.firstChild);
      f.appendChild(firstChild);
    }
    return f;
  }
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

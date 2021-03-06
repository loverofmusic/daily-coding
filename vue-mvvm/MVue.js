const compileUtil = {
  getVal(expr, vm) {
    // [person,name]
    return expr.split(".").reduce((data, currentVal) => {
      // console.log(currentVal);
      return data[currentVal];
    }, vm.$data);
  },
  text(node, expr, vm) {
    //expr:msg 学习mvvm原理
    // const value = vm.$data[expr];
    //也有可能expr是person.name这种类型
    // const value = this.getVal(expr, vm);
    // this.updater.textUpdater(node, value);
    let value;
    if (expr.indexOf("{{") !== -1) {
      value = expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
        return this.getVal(args[1], vm);
      });
    } else {
      value = this.getVal(expr, vm);
    }
    this.updater.textUpdater(node, value);
  },
  html(node, expr, vm) {
    const value = this.getVal(expr, vm);
    this.updater.htmlUpdater(node, value);
  },
  model(node, expr, vm) {
    const value = this.getVal(expr, vm);
    this.updater.modelUpdater(node, value);
  },
  on(node, expr, vm, eventName) {
    let fn = vm.$options.methods && vm.$options.methods[expr];
    node.addEventListener(eventName, fn.bind(vm), false);
  },
  bind(node, expr, vm, attrName){

  },
  //更新的函数
  updater: {
    textUpdater(node, value) {
      node.textContent = value;
    },
    htmlUpdater(node, value) {
      node.innerHTML = value;
    },
    modelUpdater(node, value) {
      node.value = value;
    }
  }
};

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
  compileElement(node) {
    // <div v-text='msg'></div>
    const attributes = node.attributes;
    // console.log(attributes);
    [...attributes].forEach(attr => {
      // console.log(attr)
      const { name, value } = attr;
      // console.log(name);
      if (this.isDirective(name)) {
        //是一个指令 v-text v-html v-model v-on:click v-bind:src
        const [, directive] = name.split("-");
        const [dirName, eventName] = directive.split(":");
        //更新数据 数据驱动视图
        compileUtil[dirName](node, value, this.vm, eventName); //方括号为取 对象 属性

        //删除有指令的标签上的属性
        node.removeAttribute("v-" + directive);
      } else if (this.isEventName(name)) {
        //@click='handlerClick'
        let [, eventName] = name.split('@');
        compileUtil['on'](node, value, this.vm, eventName);
      }
    });
  }
  isEventName(attrName) {
    return attrName.startsWith("@");
  }
  compileText(node) {
    //{{}}
    const content = node.textContent;
    if (/\{\{(.+?)\}\}/.test(content)) {
      // console.log(content)
      compileUtil["text"](node, content, this.vm);
    }
  }
  isDirective(attrName) {
    return attrName.startsWith("v-");
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

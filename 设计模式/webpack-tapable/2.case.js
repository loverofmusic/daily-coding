class SyncHook {//报社
  constructor(args){
    this.tasks = [];
  }
  tap(name, task){//订阅
    this.tasks.push(task);
  }
  call(...args){//发布
    this.tasks.forEach((task)=>task(...args));
  }
}

let hook = new SyncHook(["name"]);
hook.tap("react", function(name){
  console.log("react", name);
});
hook.tap("node", function(name){
  console.log("node", name);
});
hook.call("jw");


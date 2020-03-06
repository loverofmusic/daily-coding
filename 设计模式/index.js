const PaperPublisher = {
  subscribers: {
    dailyPaper: [],
    monthlyPaper: [],
    all: []
  },
  subscribe(newSubscriberFn, type){
    let type1 = type || 'all';
    this.subscribers[type1].push(newSubscriberFn);
  },
  unsubscribe(subscriberFn, type){
    let type2 = type || 'all',index = 0;
    for(let i = 0, len = this.subscribers[type2].length;i<len;i++){
      if(subscriberFn==this.subscribers[type2][i]){
        index= i;
        break;
      }
    }
    this.subscribers[type].splice(index, 1)
  },
  publish(type, value){
      for(let i = 0, len = this.subscribers[type].length;i<len;i++){
        this.subscribers[type][i](value);
      }
      for(let i = 0, len = this.subscribers.all.length;i<len;i++){
        this.subscribers.all[i](value);
      }
  },
  publishDailyPaper (){
    this.publish('dailyPaper','日报内容：今天发生了地震。。。')
  },
  publishMonthlyPaper (){
    this.publish('monthlyPaper','月报内容：这个月发生了what，可怕。。。')
  }
}

//小王
const XiaoWangSubscriber = {
  subscriberFn (value){
    console.log(`小王正在读${value}`);
  }
}
//小李
const XiaoLiSubscriber = {
  subscriberFn (value){
    console.log(`小李正在读${value}`);
  }
}
//小赵
const XiaoZhaoSubscriber = {
  subscriberFn (value){
    console.log(`小赵正在读${value}`);
  }
}

//让小王订阅日报，小李订阅月报，小赵两类的报纸都订阅
PaperPublisher.subscribe(XiaoWangSubscriber.subscriberFn,'dailyPaper');
PaperPublisher.subscribe(XiaoLiSubscriber.subscriberFn,'monthlyPaper');
PaperPublisher.subscribe(XiaoZhaoSubscriber.subscriberFn);
console.log(PaperPublisher.subscribers)
// debugger
// 当报社发布日报，小王和小赵能收到报纸并阅读
PaperPublisher.publishDailyPaper();
// 当报社发布月报，小李和小赵能收到报纸并阅读
PaperPublisher.publishMonthlyPaper();
// 小王因为工作原因，去外地出差了，于是取消了日报的订阅
PaperPublisher.unsubscribe(XiaoWangSubscriber.subscriberFn,'dailyPaper')

PaperPublisher.publishDailyPaper();
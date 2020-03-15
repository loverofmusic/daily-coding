class Hd {
  static PENDING = "pending";
  static FULFILLED = "fulfilled";
  static REJECTED = "rejected";
  constructor(executor){
    this.status = Hd.PENDING;
    this.value = null;
    try {
      executor(this.resolve.bind(this),this.reject.bind(this));
    } catch (error) {
      this.reject(error);
    }
    
  }
  resolve(value){
    if (this.status === Hd.PENDING) {
      this.status = Hd.FULFILLED;
      this.value = value;
    }
    
  }
  reject(err){
    if (this.status === Hd.PENDING) {
      this.status = Hd.REJECTED;
      this.value = err;
    }
  }
  then(onFulfilled, onRejected){
    if(typeof onFulfilled !== "function"){
      onFulfilled = () => {}
    }
    if(typeof onRejected !== "function"){
      onRejected = () => {}
    }
    if (this.status === Hd.FULFILLED) {
      onFulfilled(this.value);
    }
    if (this.status === Hd.REJECTED) {
      onRejected(this.value);
    }
  }
}
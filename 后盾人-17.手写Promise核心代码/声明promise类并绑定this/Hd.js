class Hd {
  static PENDING = "pending";
  static FULFILLED = "fulfilled";
  static REJECTED = "rejected";
  constructor(executor){
    this.status = Hd.PENDING;
    this.value = null;
    executor(this.resolve.bind(this),this.reject.bind(this));
  }
  resolve(value){
    this.status = Hd.FULFILLED;
    this.value = value;
    
  }
  reject(err){
    this.status = Hd.REJECTED;
    this.value = err;
    // console.log(this)
  }
}
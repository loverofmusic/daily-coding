class Hd {
  static PENDING = "pending";
  static FULFILLED = "fulfilled";
  static REJECTED = "rejected";
  constructor(executor){
    this.status = Hd.PENDING;
    this.value = null;
    this.callbacks = [];
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
      this.callbacks.map(callback =>{
        callback.onFulfilled(this.value)
      })
    }
    
  }
  reject(err){
    if (this.status === Hd.PENDING) {
      this.status = Hd.REJECTED;
      this.value = err;
      this.callbacks.map(callback =>{
        callback.onRejected(this.value)
      })
    }
  }
  then(onFulfilled, onRejected){
    if(typeof onFulfilled !== "function"){
      onFulfilled = () => {}
    }
    if(typeof onRejected !== "function"){
      onRejected = () => {}
    }
    if(this.status === Hd.PENDING){
      console.log('PENDING')
      this.callbacks.push({
        // onFulfilled,
        // onRejected
        onFulfilled: (value)=>{
          try {
            onFulfilled(value)
          } catch (error) {
            onRejected(error);
          }
        },
        onRejected: (value)=>{
          try {
            onRejected(value)
          } catch (error) {
            onRejected(error);
          }
        }
      })
    }
    if (this.status === Hd.FULFILLED) {
      setTimeout(()=>{
        try {
          onFulfilled(this.value);
        } catch (error) {
          onRejected(error);
        }
      })
      
    }
    if (this.status === Hd.REJECTED) {
      setTimeout(()=>{
        try {
          onRejected(this.value);
        } catch (error) {
          onRejected(error);
        }
      })
    }
  }
}
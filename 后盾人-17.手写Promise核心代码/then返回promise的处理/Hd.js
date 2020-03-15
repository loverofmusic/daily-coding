class Hd {
  static PENDING = "pending";
  static FULFILLED = "fulfilled";
  static REJECTED = "rejected";
  constructor(executor) {
    this.status = Hd.PENDING;
    this.value = null;
    this.callbacks = [];
    try {
      executor(this.resolve.bind(this), this.reject.bind(this));
    } catch (error) {
      this.reject(error);
    }
  }
  resolve(value) {
    if (this.status === Hd.PENDING) {
      this.status = Hd.FULFILLED;
      this.value = value;
      setTimeout(() => {
        this.callbacks.map(callback => {
          callback.onFulfilled(this.value);
        });
      });
    }
  }
  reject(err) {
    if (this.status === Hd.PENDING) {
      this.status = Hd.REJECTED;
      this.value = err;
      setTimeout(() => {
        this.callbacks.map(callback => {
          callback.onRejected(this.value);
        });
      });
    }
  }
  then(onFulfilled, onRejected) {
    if (typeof onFulfilled !== "function") {
      onFulfilled = () => this.value;
    }
    if (typeof onRejected !== "function") {
      onRejected = () => this.value;
    }
    return new Hd((resolve, reject) => {
      if (this.status === Hd.PENDING) {
        console.log("PENDING");
        this.callbacks.push({
          // onFulfilled,
          // onRejected
          onFulfilled: value => {
            try {
              let res = onFulfilled(value);
              resolve(res);
            } catch (error) {
              onRejected(error);
            }
          },
          onRejected: value => {
            try {
              let res = onRejected(value);
              resolve(res);
            } catch (error) {
              reject(error);
            }
          }
        });
      }
      if (this.status === Hd.FULFILLED) {
        setTimeout(() => {
          try {
            let res = onFulfilled(this.value);
            if (res instanceof Hd) {
              // res.then(value => {
              //   resolve(value);
              // },reason=>{
              //   reject(reason)
              // });
              res.then(resolve, reject);
            } else {
              resolve(res);
            }
          } catch (error) {
            reject(error);
          }
        });
      }
      if (this.status === Hd.REJECTED) {
        setTimeout(() => {
          try {
            let res = onRejected(this.value);
            resolve(res);
          } catch (error) {
            reject(error);
          }
        });
      }
    });
  }
}

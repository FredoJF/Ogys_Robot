module.exports = class command {
  static parse(msg) {
    if (this.match(msg)) {
      this.action(msg);
      return true;
    }
    return false;
  }

  static match(msg) {
    return false;
  }

  static action(msg) {}
};

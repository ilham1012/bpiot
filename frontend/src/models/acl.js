export default class Acl {
    constructor(pub, pattern, device_id) {
      this.device_id = device_id;
      this.pub = pub;
      this.pattern = pattern;
    }
  }
export default class QueryParams {
  constructor(options) {
    this.options = options;
    this.params = new URLSearchParams(options.location.search);
    return new Proxy(this, {
      get(target, prop) {
        if (prop in target) {
          return target[prop];
        } else if (typeof prop === 'string') {
          return target.get(prop);
        } else {
          return this[prop];
        }
      },
    });
  }

  get size() {
    return this.params.size;
  }

  append(name, value) {
    this.params.append(name, value);
    this.onChange();
  }

  clear() {
    this.params = new URLSearchParams();
    this.onChange();
  }

  delete(...names) {
    for (let name of names) {
      this.params.delete(name);
    }
    this.onChange();
  }

  entries() {
    return this.params.entries();
  }

  forEach(callback) {
    return this.params.forEach(callback);
  }

  get(name) {
    return this.params.get(name);
  }

  getAll(name) {
    return this.params.getAll(name);
  }

  has(name) {
    return this.params.has(name);
  }

  keys() {
    return this.params.keys();
  }

  set(name, value) {
    this.params.set(name, value);
    this.onChange();
  }

  sort() {
    return this.params.sort();
  }

  toString() {
    return this.params.toString();
  }

  values() {
    return this.params.values();
  }

  onChange() {
    this.options.onChange(this.params);
  }
}

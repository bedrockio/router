function wrapFunction(name) {
  if (typeof window === 'undefined') {
    return;
  }

  const native = history[name];
  const event = name.toLowerCase();

  history[name] = function (...args) {
    const ret = native.apply(this, args);
    const [state] = args;
    window.dispatchEvent(
      new CustomEvent(event, {
        detail: state,
      })
    );
    return ret;
  };
}

wrapFunction('pushState');
wrapFunction('replaceState');

export default history;

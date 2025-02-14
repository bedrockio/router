function wrapHistory(history) {
  history = wrapFunction(history, 'pushState');
  history = wrapFunction(history, 'replaceState');
  return history;
}

function wrapFunction(history, name) {
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

  return history;
}

export default wrapHistory(history);

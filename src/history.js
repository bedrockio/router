function wrapHistory(history) {
  history = wrapFunction(history, 'pushState');
  history = wrapFunction(history, 'replaceState');
  return history;
}

function wrapFunction(history, name) {
  const native = history[name];
  const event = name.toLowerCase();

  history[name] = function (state, unused, url) {
    // Allow an empty string to remove query params.
    url ||= location.pathname;

    const ret = native.call(this, state, unused, url);
    window.dispatchEvent(
      new CustomEvent(event, {
        detail: state,
      }),
    );
    return ret;
  };

  return history;
}

export default wrapHistory(history);

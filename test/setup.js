// jest.setup.js or at the top of your test file
Object.defineProperty(window, 'scrollTo', {
  value: () => {},
  writable: true,
});

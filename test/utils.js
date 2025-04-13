import { act } from '@testing-library/react';

export function setLocation(path, state = {}) {
  window.history.pushState(state, '', path);
}

export async function navigate(path, state) {
  await act(async () => {
    setLocation(path, state);
    window.dispatchEvent(new PopStateEvent('popstate'));
  });
}

export async function assertText(page, text) {
  const el = await page.getByText(text);
  expect(el).toBeInTheDocument();
}

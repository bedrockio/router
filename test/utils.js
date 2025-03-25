import { act } from '@testing-library/react';

export function setLocation(path) {
  window.history.pushState({}, '', path);
}

export async function navigate(path) {
  await act(async () => {
    setLocation(path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  });
}

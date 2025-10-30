import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';

import { setLocation } from './utils';
import { BrowserRouter, Link } from '../src';

describe('Link', () => {
  it('should not prevent default navigation when clicked with metaKey', () => {
    setLocation('/');
    const page = render(
      <BrowserRouter>
        <Link to="/shop">Shop</Link>
      </BrowserRouter>,
    );

    const link = page.getByRole('link', { name: 'Shop' });

    const clickEvent = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      metaKey: true,
    });

    const preventDefaultSpy = jest.spyOn(clickEvent, 'preventDefault');

    fireEvent(link, clickEvent);

    expect(preventDefaultSpy).not.toHaveBeenCalled();
  });
});

import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import { navigate, setLocation } from './utils';
import { BrowserRouter, Route, Routes, useLocation } from '../src';

describe('useLocation', () => {
  it('should access basic location', async () => {
    setLocation('/shops');

    function Detail() {
      const location = useLocation();
      return <div role="shop">href: {location.href}</div>;
    }

    const page = render(
      <BrowserRouter>
        <Routes>
          <Route path="/shops" render={Detail} />
        </Routes>
      </BrowserRouter>,
    );

    const shop = page.getByRole('shop');
    expect(shop.textContent).toBe('href: http://localhost/shops');
  });

  it('should be able to access state', async () => {
    setLocation('/');

    function Detail() {
      const location = useLocation();
      return <div role="shop">foo: {location.state.foo}</div>;
    }

    const page = render(
      <BrowserRouter>
        <Routes>
          <Route path="/shops" render={Detail} />
        </Routes>
      </BrowserRouter>,
    );

    await navigate('/shops', { foo: 'bar' });
    const shop = page.getByRole('shop');
    expect(shop.textContent).toBe('foo: bar');
  });
});

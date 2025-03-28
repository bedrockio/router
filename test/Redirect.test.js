import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { setLocation, navigate } from './utils';
import { BrowserRouter, Routes, Route, Redirect } from '../src';

describe('Redirect', () => {
  it('should perform a basic global redirect', async () => {
    setLocation('/shop');
    render(
      <BrowserRouter>
        <Routes>
          <Route path="/shop" render={<div>Shop</div>} />
          <Redirect to="/shop" />
        </Routes>
      </BrowserRouter>,
    );

    await navigate('/foo');
    expect(location.pathname).toBe('/shop');
  });

  it('should perform a scoped redirect', async () => {
    setLocation('/shop');
    render(
      <BrowserRouter>
        <Routes>
          <Route path="/shop" render={<div>Shop</div>} />
          <Redirect path="/foo" to="/shop" />
        </Routes>
      </BrowserRouter>,
    );

    await navigate('/bar');
    expect(location.pathname).toBe('/bar');

    await navigate('/foo');
    expect(location.pathname).toBe('/shop');
  });
});

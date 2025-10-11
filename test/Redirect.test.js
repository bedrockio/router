import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import { BrowserRouter, Redirect, Route, Routes, useParams } from '../src';
import { navigate, setLocation } from './utils';
import { assertText } from './utils';

describe('Redirect', () => {
  it('should perform a basic global redirect', async () => {
    setLocation('/shop');
    const page = render(
      <BrowserRouter>
        <Routes>
          <Route path="/shop" render={<div>Shop</div>} />
          <Redirect to="/shop" />
        </Routes>
      </BrowserRouter>,
    );

    await navigate('/foo');
    expect(location.pathname).toBe('/shop');
    await assertText(page, 'Shop');
  });

  it('should perform a scoped redirect', async () => {
    setLocation('/shop');
    const page = render(
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
    await assertText(page, 'Shop');
  });

  it('should perform a redirect with deep paths', async () => {
    setLocation('/shop');
    const page = render(
      <BrowserRouter>
        <Routes>
          <Route path="/shop/products" render={<div>Shop</div>} exact />
          <Redirect path="/shop/products/foo" to="/shop/products" />
        </Routes>
      </BrowserRouter>,
    );

    await navigate('/shop/products');
    expect(location.pathname).toBe('/shop/products');
    await assertText(page, 'Shop');

    await navigate('/shop/products/foo');
    expect(location.pathname).toBe('/shop/products');
    await assertText(page, 'Shop');
  });

  it('should perform a redirect with params', async () => {
    setLocation('/');
    const page = render(
      <BrowserRouter>
        <Routes>
          <Redirect path="/shop/foo" to="/shop/bar" />
          <Route path="/shop/:id" render={<div>Shop Detail</div>} exact />
        </Routes>
      </BrowserRouter>,
    );

    await navigate('/shop/12345');
    await assertText(page, 'Shop Detail');

    await navigate('/shop/foo');
    expect(location.pathname).toBe('/shop/bar');
    await assertText(page, 'Shop Detail');
  });

  it('should perform redirect with params', async () => {
    setLocation('/');

    function Edit() {
      const { id } = useParams();
      return <div>Edit {id}</div>;
    }

    const page = render(
      <BrowserRouter>
        <Routes>
          <Route path="/products/:id/edit" render={Edit} exact />
          <Redirect path="/products/:id" to="/products/:id/edit" />
        </Routes>
      </BrowserRouter>,
    );

    await navigate('/products/1234/edit');
    await assertText(page, 'Edit 1234');

    await navigate('/products/5678');
    await assertText(page, 'Edit 5678');
  });
});

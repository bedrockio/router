import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { setLocation, navigate } from './utils';
import { BrowserRouter, Routes, Route, NavLink } from '../src';

describe('NavLink', () => {
  it('should correctly match loose NavLink', async () => {
    setLocation('/');
    const page = render(
      <BrowserRouter>
        <Routes>
          <Route path="/shop" render={<div>Shop</div>} />
          <Route path="/shops" render={<div>Shops</div>} />
        </Routes>
        <NavLink to="/shop">Shop</NavLink>
        <NavLink to="/shops">Shops</NavLink>
      </BrowserRouter>,
    );

    const shop = page.getByRole('link', { name: 'Shop' });
    const shops = page.getByRole('link', { name: 'Shops' });

    expect(shop).not.toHaveAttribute('aria-current');
    expect(shops).not.toHaveAttribute('aria-current');

    await navigate('/shop');
    expect(shop).toHaveAttribute('aria-current');
    expect(shops).not.toHaveAttribute('aria-current');

    await navigate('/shops');
    expect(shop).not.toHaveAttribute('aria-current');
    expect(shops).toHaveAttribute('aria-current');

    await navigate('/shops/1');
    expect(shop).not.toHaveAttribute('aria-current');
    expect(shops).toHaveAttribute('aria-current');

    await navigate('/other');
    expect(shop).not.toHaveAttribute('aria-current');
    expect(shops).not.toHaveAttribute('aria-current');
  });

  it('should correctly match precise NavLink', async () => {
    setLocation('/');
    const page = render(
      <BrowserRouter>
        <Routes>
          <Route path="/shop" render={<div>Shop</div>} />
          <Route path="/shops" render={<div>Shops</div>} />
        </Routes>
        <NavLink to="/shop" exact>
          Shop
        </NavLink>
        <NavLink to="/shops" exact>
          Shops
        </NavLink>
      </BrowserRouter>,
    );

    const shop = page.getByRole('link', { name: 'Shop' });
    const shops = page.getByRole('link', { name: 'Shops' });

    expect(shop).not.toHaveAttribute('aria-current');
    expect(shops).not.toHaveAttribute('aria-current');

    await navigate('/shop');
    expect(shop).toHaveAttribute('aria-current');
    expect(shops).not.toHaveAttribute('aria-current');

    await navigate('/shops');
    expect(shop).not.toHaveAttribute('aria-current');
    expect(shops).toHaveAttribute('aria-current');

    await navigate('/shops/1');
    expect(shop).not.toHaveAttribute('aria-current');
    expect(shops).not.toHaveAttribute('aria-current');

    await navigate('/other');
    expect(shop).not.toHaveAttribute('aria-current');
    expect(shops).not.toHaveAttribute('aria-current');
  });

  it('should allow NavLink outside the main context', async () => {
    setLocation('/shops/1');

    function Layout(props) {
      return (
        <div>
          <header>
            <NavLink to="/shops">Shops</NavLink>
            <NavLink to="/other">Other</NavLink>
          </header>
          <main>{props.children}</main>
        </div>
      );
    }

    const page = render(
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Layout>
              <Routes>
                <Route path="/shops/:id" render={<div>Shop 1</div>} />
              </Routes>
            </Layout>
          </Route>
          <Route render={<div>Not Found</div>} />
        </Routes>
      </BrowserRouter>,
    );

    const otherLink = page.getByRole('link', { name: 'Other' });
    expect(otherLink).not.toHaveAttribute('aria-current');
  });
});

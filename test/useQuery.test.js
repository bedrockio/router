import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { useEffect } from 'react';

import { BrowserRouter, Route, Routes, useLocation, useQuery } from '../src';
import { navigate, setLocation } from './utils';

describe('useParams', () => {
  it('should get search params', async () => {
    setLocation('/shops');

    function List() {
      const search = useQuery();
      return (
        <div role="shop" id={search.get('foo')}>
          Shop
        </div>
      );
    }

    const page = render(
      <BrowserRouter>
        <Routes>
          <Route path="/shops" render={List} />
        </Routes>
      </BrowserRouter>,
    );

    const shop = page.getByRole('shop');
    expect(shop.id).toBe('');

    await navigate('/shops?foo=bar');
    expect(shop.id).toBe('bar');
  });

  it('should set the query string', async () => {
    function Detail() {
      const search = useQuery();
      const location = useLocation();

      useEffect(() => {
        search.set('foo', 'bar');
      }, []);

      return <div role="url">{location.search}</div>;
    }

    const page = render(
      <BrowserRouter>
        <Routes>
          <Route render={Detail} />
        </Routes>
      </BrowserRouter>,
    );

    const element = await page.findByRole('url');
    expect(element.textContent).toBe('?foo=bar');
  });

  it('should delete the query string', async () => {
    setLocation('?foo=bar&baz=moo');

    function Detail() {
      const search = useQuery();
      const location = useLocation();

      useEffect(() => {
        search.delete('foo');
      }, []);

      return <div role="url">{location.search}</div>;
    }

    const page = render(
      <BrowserRouter>
        <Routes>
          <Route render={Detail} />
        </Routes>
      </BrowserRouter>,
    );

    const element = await page.findByRole('url');
    expect(element.textContent).toBe('?baz=moo');
  });

  it('should delete multiple', async () => {
    setLocation('?foo=bar&baz=moo&boo=bea');

    function Detail() {
      const search = useQuery();
      const location = useLocation();

      useEffect(() => {
        search.delete('foo', 'baz');
      }, []);

      return <div role="url">{location.search}</div>;
    }

    const page = render(
      <BrowserRouter>
        <Routes>
          <Route render={Detail} />
        </Routes>
      </BrowserRouter>,
    );

    const element = await page.findByRole('url');
    expect(element.textContent).toBe('?boo=bea');
  });

  it('should clear the entire query string', async () => {
    setLocation('?foo=bar&baz=moo');

    function Detail() {
      const search = useQuery();
      const location = useLocation();

      useEffect(() => {
        search.clear();
      }, []);

      return <div role="url">{location.search}</div>;
    }

    const page = render(
      <BrowserRouter>
        <Routes>
          <Route render={Detail} />
        </Routes>
      </BrowserRouter>,
    );

    const element = await page.findByRole('url');
    expect(element.textContent).toBe('');
  });
});

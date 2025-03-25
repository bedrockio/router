import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { setLocation, navigate } from './utils';
import { BrowserRouter, Routes, Route, useSearch } from '../src';

describe('useParams', () => {
  it('should correctly match loose NavLink', async () => {
    setLocation('/shops');

    function List() {
      const search = useSearch();
      return (
        <div role="shop" id={search.foo}>
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
});

import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { setLocation, navigate } from './utils';
import { BrowserRouter, Routes, Route, useParams } from '../src';

describe('useParams', () => {
  it('should correctly match loose NavLink', async () => {
    setLocation('/shops/1');

    function Detail() {
      const params = useParams();
      return (
        <div role="shop" id={params.id}>
          Shop
        </div>
      );
    }

    const page = render(
      <BrowserRouter>
        <Routes>
          <Route path="/shops/:id" render={Detail} />
        </Routes>
      </BrowserRouter>,
    );

    const shop = page.getByRole('shop');
    expect(shop.id).toBe('1');

    await navigate('/shops/500');
    expect(shop.id).toBe('500');
  });
});

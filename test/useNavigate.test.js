import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { useEffect } from 'react';

import { setLocation } from './utils';
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from '../src';

describe('useNavigate', () => {
  it('should set the query string', async () => {
    function Detail() {
      const navigate = useNavigate();
      const location = useLocation();

      useEffect(() => {
        run();
      }, []);

      async function run() {
        navigate('?foo=bar');
      }

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

  it('should unset the query string', async () => {
    setLocation('?foo=bar');

    function Detail() {
      const navigate = useNavigate();
      const location = useLocation();

      useEffect(() => {
        run();
      }, []);

      async function run() {
        navigate('');
      }

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

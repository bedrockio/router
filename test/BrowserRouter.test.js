import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { setLocation, navigate } from './utils';
import { BrowserRouter, Routes, Route } from '../src';

describe('BrowserRouter', () => {
  it('should render the router', async () => {
    const page = render(
      <BrowserRouter>
        <Routes>
          <Route path="*" render={<div>Splat</div>} />
        </Routes>
      </BrowserRouter>,
    );
    const div = await page.getByText('Splat');
    expect(div).toBeInTheDocument();
  });

  it('should find the root page', async () => {
    window.history.pushState({}, '', '/');
    const page = render(
      <BrowserRouter>
        <Routes>
          <Route path="/page" render={<div>Page</div>} />
          <Route path="/" render={<div>Root</div>} />
        </Routes>
      </BrowserRouter>,
    );
    const div = await page.getByText('Root');
    expect(div).toBeInTheDocument();
  });

  it('should find an individual page', async () => {
    window.history.pushState({}, '', '/page');
    const page = render(
      <BrowserRouter>
        <Routes>
          <Route path="/page" render={<div>Page</div>} />
          <Route path="/" render={<div>Root</div>} />
        </Routes>
      </BrowserRouter>,
    );
    const div = await page.getByText('Page');
    expect(div).toBeInTheDocument();
  });

  it('should render a root page with a catch-all at the end', async () => {
    let div;

    setLocation('/');

    const page = render(
      <BrowserRouter>
        <Routes>
          <Route path="/" render={<div>Dashboard</div>} exact />
          <Route render={<div>Not Found</div>} />
        </Routes>
      </BrowserRouter>,
    );

    div = await page.getByText('Dashboard');
    expect(div).toBeInTheDocument();

    await navigate('/other');

    div = await page.getByText('Not Found');
    expect(div).toBeInTheDocument();
  });

  it('should nesting routers', async () => {
    let div;

    setLocation('/shops/1');

    const page = render(
      <BrowserRouter>
        <Routes>
          <Route path="/foo" render={<div>Foo</div>} />
          <Route path="/shops">
            <Routes>
              <Route path="/shops/:id" render={<div>Shop 1</div>} />
            </Routes>
          </Route>
          <Route render={<div>Not Found</div>} />
        </Routes>
      </BrowserRouter>,
    );

    div = await page.getByText('Shop 1');
    expect(div).toBeInTheDocument();
  });
});

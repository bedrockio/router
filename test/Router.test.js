import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { BrowserRouter, Routes, Route } from '../src';

describe('BrowserRouter', () => {
  it('should render the router', async () => {
    const page = render(
      <BrowserRouter>
        <Routes>
          <Route to="*" render={<div>Hello</div>} />
        </Routes>
      </BrowserRouter>
    );
    const div = await page.getByText('Hello');
    expect(div).toBeInTheDocument();
  });
});

import React from 'react';
import { render } from '@testing-library/react';

import BusinessesListing from './businesses-listing';

describe('BusinessesListing', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BusinessesListing />);
    expect(baseElement).toBeTruthy();
  });
});

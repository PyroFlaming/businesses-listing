import React from 'react';
import { render } from '@testing-library/react';

import BusinessView from './business-view';

describe('BusinessView', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BusinessView />);
    expect(baseElement).toBeTruthy();
  });
});

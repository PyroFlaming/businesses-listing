import React from 'react';
import { render } from '@testing-library/react';

import LoadingHoc from './loading-hoc';

describe('LoadingHoc', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LoadingHoc />);
    expect(baseElement).toBeTruthy();
  });
});

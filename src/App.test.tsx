import React from 'react';
import { render } from '@testing-library/react';
import Button from './components/UI/Button';

test('renders button component', () => {
  render(<Button>Test Button</Button>);
});

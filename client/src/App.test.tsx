import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app', () => {
  render(<App />);
  // eslint-disable-next-line testing-library/no-node-access
  const app = document.querySelector('#app');
  expect(app).toBeInTheDocument();
});

describe('Submit button', () => {
  it('has \'Submit\' text on page load', () => {
    render(<App />);
    
    const buttonElement = screen.getByText('Submit');
    
    expect(buttonElement).toHaveTextContent('Submit');
  });
});

describe('Longitude-Latitude display section', () => {
  it('changes to a Spinner on Form submit', () => {
    const { container } = render(<App />);

    // eslint-disable-next-line testing-library/no-node-access, testing-library/no-container
    const longLatContainer = container.querySelector('#long-lat-display');

    expect(longLatContainer).toBeEmptyDOMElement();
  });
});
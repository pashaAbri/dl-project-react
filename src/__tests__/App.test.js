import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from '../App';

describe('App', () => {
  test('renders App component without crashing', () => {
    render(<Router><App /></Router>);
    const appElement = screen.getByTestId('app');
    expect(appElement).toBeInTheDocument();
  });

  test('renders navigation elements', () => {
    render(<Router><App /></Router>);
    const linkElements = screen.getAllByText(/Home/i);
    expect(linkElements[0]).toBeInTheDocument();
  });
});
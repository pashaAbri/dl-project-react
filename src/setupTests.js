// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

class ResizeObserver {
  observe() {
    // do nothing here
  }
  unobserve() {
    // do nothing here
  }
  disconnect() {
    // do nothing here
  }
}

window.ResizeObserver = ResizeObserver;

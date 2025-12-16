import '@testing-library/jest-dom';

// Mock window.alert
window.alert = jest.fn();

// Mock window.confirm
window.confirm = jest.fn(() => true);

// Mock URL.createObjectURL
global.URL.createObjectURL = jest.fn(() => 'mock-url');
global.URL.revokeObjectURL = jest.fn();

// Mock console.log for form submission tests
const originalConsoleLog = console.log;
beforeEach(() => {
    console.log = jest.fn();
});
afterEach(() => {
    console.log = originalConsoleLog;
    jest.clearAllMocks();
});

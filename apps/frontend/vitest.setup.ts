import '@testing-library/jest-dom/vitest';

const testGlobal = globalThis as typeof globalThis & {
  window?: { scrollTo: () => void };
};

if (testGlobal.window) {
  testGlobal.window.scrollTo = () => undefined;
}

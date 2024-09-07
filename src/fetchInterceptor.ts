import fetchMock from 'fetch-mock';

export const interceptFetch = () => {
  console.log('Intercepting fetch');
  fetchMock.mock('*', () => {
    console.error('Fetch request intercepted');
    throw new Error('Test failed: Fetch requests are blocked.');
  });
};

export const restoreFetch = () => {
  console.log('Restoring fetch');
  fetchMock.restore();
};
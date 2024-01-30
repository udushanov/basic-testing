import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

describe('partial mocking', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    const spyLog = jest.spyOn(console, 'log');

    spyLog.mockImplementationOnce(mockOne);
    spyLog.mockImplementationOnce(mockTwo);
    spyLog.mockImplementationOnce(mockThree);

    console.log('Calling actual console.log');

    expect(spyLog).toHaveBeenCalledTimes(4);

    spyLog.mockRestore();
  });

  test('unmockedFunction should log into console', () => {
    const spyLog = jest.spyOn(console, 'log');

    spyLog.mockImplementationOnce(unmockedFunction);

    console.log('Calling actual console.log');

    expect(spyLog).toHaveBeenCalledTimes(2);

    spyLog.mockRestore();
  });
});

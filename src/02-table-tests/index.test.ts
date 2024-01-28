import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 5, b: 2, action: Action.Subtract, expected: 3 },
  { a: 8, b: 3, action: Action.Subtract, expected: 5 },
  { a: 4, b: 3, action: Action.Multiply, expected: 12 },
  { a: 2, b: 5, action: Action.Multiply, expected: 10 },
  { a: 8, b: 2, action: Action.Divide, expected: 4 },
  { a: 15, b: 3, action: Action.Divide, expected: 5 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 4, b: 0.5, action: Action.Exponentiate, expected: 2 },
];

describe('simpleCalculator', () => {
  test('should correctly calculate results for various cases', () => {
    testCases.forEach(({ a, b, action, expected }) => {
      const input = { a, b, action };

      const result = simpleCalculator(input);

      expect(result).toBe(expected);
    });
    expect(true).toBe(true);
  });
});

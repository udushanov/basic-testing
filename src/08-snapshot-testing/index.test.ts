import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const elements = [1, 2, 3, 4, 5];

    const result = generateLinkedList(elements);

    expect(result).toStrictEqual({
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: {
            value: 4,
            next: {
              value: 5,
              next: {
                value: null,
                next: null,
              },
            },
          },
        },
      },
    });
  });

  test('should generate linked list from values 2', () => {
    const elements = ['a', 'b', 'c'];

    const result = generateLinkedList(elements);

    expect(result).toMatchSnapshot();
  });
});

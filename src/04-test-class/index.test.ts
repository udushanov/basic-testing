import {
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
  getBankAccount,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const account = getBankAccount(1000);

    expect(account.getBalance()).toBe(1000);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(500);

    expect(() => account.withdraw(1000)).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const account1 = getBankAccount(500);
    const account2 = getBankAccount(200);

    expect(() => account1.transfer(1000, account2)).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(500);

    expect(() => account.transfer(1000, account)).toThrowError(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const account = getBankAccount(500);

    account.deposit(200);

    expect(account.getBalance()).toBe(700);
  });

  test('should withdraw money', () => {
    const account = getBankAccount(700);

    account.withdraw(200);

    expect(account.getBalance()).toBe(500);
  });

  test('should transfer money', () => {
    const account1 = getBankAccount(500);
    const account2 = getBankAccount(200);

    account1.transfer(300, account2);

    expect(account1.getBalance()).toBe(200);
    expect(account2.getBalance()).toBe(500);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(1000);

    jest
      .spyOn(account, 'fetchBalance')
      .mockReturnValueOnce(Promise.resolve(500));

    const balance = await account.fetchBalance();

    expect(typeof balance === 'number').toBe(true);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(1000);

    jest.spyOn(account, 'fetchBalance').mockReturnValue(Promise.resolve(null));

    await expect(account.synchronizeBalance()).rejects.toThrowError(
      SynchronizationFailedError,
    );
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(1000);

    jest
      .spyOn(account, 'fetchBalance')
      .mockReturnValueOnce(Promise.resolve(null));

    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});

import {
  MonthlyBalance,
  FinancialItem,
  FinancialEstimate,
  Category
} from '@/domain';

describe('MonthlyBalance', () => {
  it('should be created with an ID and start with no financial items', () => {
    const id = '2025-07';

    const balance = new MonthlyBalance(id);

    expect(balance.id).toBe(id);

    expect(balance.incomes).toEqual([]);
    expect(balance.expenses).toEqual([]);
  });

  it('should add a new financial item to its list', () => {
    const balance = new MonthlyBalance('2025-07');
    const salaryCategory = new Category('cat-1', 'Salary');
    const newItem = new FinancialItem(
      'item-1',
      'July Salary',
      'INCOME',
      salaryCategory,
    );

    balance.addItem(newItem);

    expect(balance.incomes).toHaveLength(1);
    expect(balance.incomes[0]).toBe(newItem);
    expect(balance.expenses).toHaveLength(0);
  });

  it('should change its status to "CLOSED" when the close method is called', () => {
    const balance = new MonthlyBalance('2025-07');
    balance.close();
    expect(balance.status).toBe('CLOSED');
  });

  it('should throw an error when trying to add an item to a closed balance', () => {
    const balance = new MonthlyBalance('2025-07');
    const item = new FinancialItem('item-1', 'Item', 'EXPENSE', new Category('c1', 'Cat'));
    balance.close();
    expect(() => balance.addItem(item)).toThrow('Cannot add items to a closed monthly balance.');
  });

  it('should throw an error if trying to close a balance that is already closed', () => {
    const balance = new MonthlyBalance('2025-07');
    balance.close();

    expect(() => balance.close()).toThrow('Cannot close a balance that is already closed.');
  });
});

describe('when calculating totals', () => {
  it.each([
    {
      items: [
        new FinancialItem('i1', 'Salary 1', 'INCOME', new Category('c1', 'Salary'), new FinancialEstimate(5000, 5000, 5000)),
        new FinancialItem('i2', 'Salary 2', 'INCOME', new Category('c1', 'Salary'), new FinancialEstimate(3000, 3000, 3000)),
        new FinancialItem('e1', 'Rent', 'EXPENSE', new Category('c2', 'Housing'), new FinancialEstimate(2000, 2000, 2000)),
      ],
      expectedTotal: 8000,
      case: 'with multiple incomes'
    },
    {
      items: [
        new FinancialItem('e1', 'Rent', 'EXPENSE', new Category('c2', 'Housing'), new FinancialEstimate(2000, 2000, 2000)),
      ],
      expectedTotal: 0,
      case: 'with no incomes'
    },
    {
      items: [],
      expectedTotal: 0,
      case: 'with no items at all'
    }
  ])('should return the correct total of incomes for the case: $case', ({ items, expectedTotal }) => {
    const balance = new MonthlyBalance('2025-07');
    items.forEach(item => balance.addItem(item));

    const totalIncomes = balance.getTotalIncomes();

    expect(totalIncomes).toBe(expectedTotal);
  });

  it.each([
    {
      items: [
        new FinancialItem('i1', 'Salary 1', 'INCOME', new Category('c1', 'Salary'), new FinancialEstimate(5000, 5000, 5000)),
        new FinancialItem('e1', 'Rent', 'EXPENSE', new Category('c2', 'Housing'), new FinancialEstimate(2000, 2000, 2000)),
        new FinancialItem('e2', 'Internet', 'EXPENSE', new Category('c2', 'Housing'), new FinancialEstimate(150, 150, 150)),
      ],
      expectedTotal: 2150,
      case: 'with multiple expenses'
    },
    {
      items: [
        new FinancialItem('i1', 'Salary 1', 'INCOME', new Category('c1', 'Salary'), new FinancialEstimate(5000, 5000, 5000)),
      ],
      expectedTotal: 0,
      case: 'with no expenses'
    }
  ])('should return the correct total of expenses for the case: $case', ({ items, expectedTotal }) => {
    const balance = new MonthlyBalance('2025-07');
    items.forEach(item => balance.addItem(item));

    const totalExpenses = balance.getTotalExpenses();

    expect(totalExpenses).toBe(expectedTotal);
  });

  it('should return the correct final balance (incomes - expenses)', () => {
    const balance = new MonthlyBalance('2025-07');
    const items = [
      new FinancialItem('i1', 'Salary 1', 'INCOME', new Category('c1', 'Salary'), new FinancialEstimate(0, 0, 5000)),
      new FinancialItem('e1', 'Rent', 'EXPENSE', new Category('c2', 'Housing'), new FinancialEstimate(0, 0, 2000)),
      new FinancialItem('e2', 'Internet', 'EXPENSE', new Category('c2', 'Housing'), new FinancialEstimate(0, 0, 150)),
    ];
    items.forEach(item => balance.addItem(item));

    const finalBalance = balance.getBalance();

    expect(finalBalance).toBe(2850); // 5000 - 2000 - 150
  });
});

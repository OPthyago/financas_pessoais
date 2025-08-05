import { MonthlyBalance, Category, IMonthlyBalanceRepository } from '@/domain/';
import { AddFinancialItemCommand, AddFinancialItemHandler } from '@/application/useCases';
import { mock, MockProxy } from 'jest-mock-extended';

const BALANDE_ID = '2025-07';
describe('AddFinancialItemHandler', () => {
  let repository: MockProxy<IMonthlyBalanceRepository>;

  beforeAll(() => {
    repository = mock();
  })

  beforeEach(() => {
    repository.findById.mockResolvedValue(new MonthlyBalance(BALANDE_ID))
  })

  it('should add a new financial item to an existing monthly balance', async () => {

    const handler = new AddFinancialItemHandler(repository);

    const command: AddFinancialItemCommand = {
      monthlyBalanceId: BALANDE_ID,
      data: {
        name: 'My Salary',
        type: 'INCOME',
        value: 5000,
        category: new Category('cat-1', 'Salary')
      }
    };

    await handler.execute(command);

    const updatedBalance = await repository.findById(BALANDE_ID);
    expect(updatedBalance).not.toBeNull();
    expect(updatedBalance!.incomes).toHaveLength(1);
    expect(updatedBalance!.incomes[0].name).toBe('My Salary');
    expect(updatedBalance!.incomes[0].values.actual).toBe(5000);
  });
});

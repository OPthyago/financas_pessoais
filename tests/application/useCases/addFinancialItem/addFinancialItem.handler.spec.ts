import { MonthlyBalance, Category, IMonthlyBalanceRepository } from '@/domain/';
import { AddFinancialItemCommand } from './AddFinancialItemCommand';
import { AddFinancialItemHandler } from './AddFinancialItemHandler';

// Repositório "Falso" (em memória) para nossos testes
class InMemoryMonthlyBalanceRepository implements IMonthlyBalanceRepository {
  public balances: Map<string, MonthlyBalance> = new Map();

  async findById(id: string): Promise<MonthlyBalance | null> {
    return this.balances.get(id) || null;
  }
  async save(balance: MonthlyBalance): Promise<void> {
    this.balances.set(balance.id, balance);
  }
}

describe('AddFinancialItemHandler', () => {
  it('should add a new financial item to an existing monthly balance', async () => {
    const repository = new InMemoryMonthlyBalanceRepository();
    const balanceId = '2025-07';
    await repository.save(new MonthlyBalance(balanceId));

    const handler = new AddFinancialItemHandler(repository);

    const command: AddFinancialItemCommand = {
      monthlyBalanceId: balanceId,
      name: 'My Salary',
      type: 'INCOME',
      value: 5000,
      category: new Category('cat-1', 'Salary'), // Supondo que a categoria já foi buscada
    };

    await handler.execute(command);

    const updatedBalance = await repository.findById(balanceId);
    expect(updatedBalance).not.toBeNull();
    expect(updatedBalance!.incomes).toHaveLength(1);
    expect(updatedBalance!.incomes[0].name).toBe('My Salary');
    expect(updatedBalance!.incomes[0].values.actual).toBe(5000);
  });
});

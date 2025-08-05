import { IMonthlyBalanceRepository } from '@/domain/repositories';
import { AddFinancialItemCommand } from './addFinancialItem.command';
import { ICommandHandler } from '@/application/shared';

export class AddFinancialItemHandler implements ICommandHandler<AddFinancialItemCommand, void> {
  constructor(
    private readonly monthlyBalanceRepository: IMonthlyBalanceRepository
  ) { }

  async execute(command: AddFinancialItemCommand): Promise<void> {
    const balance = await this.monthlyBalanceRepository.findById(
      command.monthlyBalanceId
    );

    if (!balance) {
      throw new Error('Monthly balance not found.');
    }

    balance.addItem(command.data);

    await this.monthlyBalanceRepository.save(
      balance
    );
  }
}

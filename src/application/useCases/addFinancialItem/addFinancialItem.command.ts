import { NewFinancialItemData } from '@/domain/model/';
import { ICommand } from '@/application/shared/';

export class AddFinancialItemCommand implements ICommand {
  constructor(
    readonly monthlyBalanceId: string,
    readonly data: NewFinancialItemData
  ) { }
}

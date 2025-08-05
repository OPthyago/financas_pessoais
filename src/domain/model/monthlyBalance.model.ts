import { CustomError } from "../errors";
import { FinancialItem, FinancialItemType } from "./financialItem";

export type BalanceStatus = 'OPEN' | 'CLOSED';

export class MonthlyBalance {
  private readonly _items: FinancialItem[];
  private _status: BalanceStatus;

  constructor(
    readonly id: string
  ) {
    this._items = [];
    this._status = 'OPEN';
  }

  get incomes(): FinancialItem[] {
    return this.filterItems('INCOME');
  }

  get expenses(): FinancialItem[] {
    return this.filterItems('EXPENSE');
  }

  get status(): BalanceStatus {
    return this._status;
  }

  addItem(item: FinancialItem): void {
    if (this._status === 'CLOSED') {
      throw new CustomError('Cannot add items to a closed monthly balance.', 400);
    }
    this._items.push(item);
  }

  getTotalIncomes(): number {
    return this.incomes.reduce((total, item) => {
      return total + item.values.actual;
    }, 0);
  }

  getTotalExpenses(): number {
    return this.expenses.reduce((total, item) => {
      return total + item.values.actual;
    }, 0);
  }

  getBalance(): number {
    return this.getTotalIncomes() - this.getTotalExpenses();
  }

  close(): void {
    if (this._status === 'CLOSED') {
      throw new CustomError('Cannot close a balance that is already closed.', 400);
    }
    this._status = 'CLOSED';
  }

  private filterItems(type: FinancialItemType): FinancialItem[] {
    return this._items.filter(item => item.type === type);
  }
}

import { CustomError } from "../errors";
import { FinancialItem, FinancialItemType, Category, FinancialEstimate } from "@/domain/model";
import { v4 as uuidv4 } from 'uuid';

export type BalanceStatus = 'OPEN' | 'CLOSED';

export type NewFinancialItemData = {
  name: string;
  type: FinancialItemType;
  category: Category;
  value: number;
};

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

  addItem(data: NewFinancialItemData): void {
    if (this._status === 'CLOSED') {
      throw new CustomError('Cannot add items to a closed monthly balance.', 400);
    }
    const id = uuidv4();
    const estimate = new FinancialEstimate(data.value, data.value, data.value);
    const newItem = new FinancialItem(id, data.name, data.type, data.category, estimate);

    this._items.push(newItem);
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

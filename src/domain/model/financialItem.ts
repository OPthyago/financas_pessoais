import { Category } from "./category";
import { FinancialEstimate } from "./financialEstimate";

export type FinancialItemType = 'INCOME' | 'EXPENSE';

export class FinancialItem {
  private _values: FinancialEstimate;

  constructor(
    readonly id: string,
    readonly name: string,
    readonly type: FinancialItemType,
    readonly category: Category
  ) {
    this._values = new FinancialEstimate(0, 0, 0);
  }

  get values(): FinancialEstimate {
    return this._values;
  }

  updateValues(newValues: FinancialEstimate): void {
    this._values = newValues;
  }
}

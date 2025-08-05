import { MonthlyBalance } from "@/domain";

export interface IMonthlyBalanceRepository {
  findById(id: string): Promise<MonthlyBalance | null>;
  save(balance: MonthlyBalance): Promise<void>;
}

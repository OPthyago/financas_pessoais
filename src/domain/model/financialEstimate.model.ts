import { CustomError } from "../errors";

export class FinancialEstimate {


  constructor(
    readonly planned: number,
    readonly adjusted: number,
    readonly actual: number,
  ) {
    if (planned < 0 || adjusted < 0 || actual < 0) {
      throw new CustomError('Financial estimate values cannot be negative.', 400);
    }
  }
}

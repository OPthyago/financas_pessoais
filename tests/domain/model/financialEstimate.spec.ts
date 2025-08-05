import { FinancialEstimate } from '@/domain'

describe('FinancialEstimate', () => {
  it.each([
    { planned: -100, adjusted: 200, actual: 0, case: 'planned is negative' },
    { planned: 100, adjusted: -200, actual: 0, case: 'adjusted is negative' },
    { planned: 100, adjusted: 200, actual: -50, case: 'actual is negative' },
  ])('should throw an error when $case', ({ planned, adjusted, actual }) => {
    expect(() => new FinancialEstimate(planned, adjusted, actual)).toThrow(
      'Financial estimate values cannot be negative.',
    );
  });
});

import { FinancialEstimate, FinancialItem, FinancialItemType } from '@/domain'

describe('FinancialItem', () => {
  it('should be created correctly with an ID, name, type, and a default zeroed estimate', () => {
    const id = 'some-unique-id-123';
    const name = 'Monthly Salary';
    const type: FinancialItemType = 'INCOME';

    const item = new FinancialItem(id, name, type);

    expect(item.id).toBe(id);
    expect(item.name).toBe(name);
    expect(item.type).toBe(type);

    expect(item.values).toBeInstanceOf(FinancialEstimate);
    expect(item.values.planned).toBe(0);
    expect(item.values.adjusted).toBe(0);
    expect(item.values.actual).toBe(0);
  });

  it('should update its financial values with a new estimate', () => {
    const item = new FinancialItem('id-1', 'Test Item', 'EXPENSE', 'Test');
    const newValues = new FinancialEstimate(1000, 950, 950);

    item.updateValues(newValues);

    expect(item.values).toBe(newValues);
    expect(item.values.planned).toBe(1000);
  });
})

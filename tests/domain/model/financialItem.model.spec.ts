import {
  FinancialEstimate,
  FinancialItem,
  FinancialItemType,
  Category
} from '@/domain'

describe('FinancialItem', () => {
  let sut: FinancialItem;
  let category: Category;
  let id: string;
  let name: string;
  let type: FinancialItemType;

  beforeAll(() => {
    category = new Category('category_id_1', 'Salary');
    id = 'some-unique-id-123';
    name = 'Monthly Salary';
    type = 'INCOME';
  });

  beforeEach(() => {
    sut = new FinancialItem(id, name, type, category);
  })

  it('should be created correctly with an ID, name, type, and a default zeroed estimate', () => {
    expect(sut.id).toBe(id);
    expect(sut.name).toBe(name);
    expect(sut.type).toBe(type);

    expect(sut.values).toBeInstanceOf(FinancialEstimate);
    expect(sut.values.planned).toBe(0);
    expect(sut.values.adjusted).toBe(0);
    expect(sut.values.actual).toBe(0);
  });

  it('should update its financial values with a new estimate', () => {
    const newValues = new FinancialEstimate(1000, 950, 950);

    sut.updateValues(newValues);

    expect(sut.values).toBe(newValues);
    expect(sut.values.planned).toBe(1000);
  });
})

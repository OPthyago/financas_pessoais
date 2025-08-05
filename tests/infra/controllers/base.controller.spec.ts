import { IQuery, IQueryHandler } from '@/application/shared';
import { BaseController, HttpRequest } from '@/infra/controllers';
import { mock } from 'jest-mock-extended';

class TestQuery implements IQuery {
  constructor(public readonly id: string) { }
}
type TestQueryResult = { id: string; name: string };

describe('BaseController', () => {
  describe('forQuery', () => {
    const mockQueryHandler = mock<IQueryHandler<TestQuery, TestQueryResult>>();

    const mockMapToQuery = jest.fn();

    const controller = BaseController.forQuery({
      queryHandler: mockQueryHandler,
      mapToQuery: mockMapToQuery,
    });

    beforeEach(() => {
      mockQueryHandler.execute.mockReset();
      mockMapToQuery.mockReset();
    });

    it('should return statusCode 200 and the body on success', async () => {
      const httpRequest: HttpRequest = { params: { id: '123' } };
      const query = new TestQuery('123');
      const result: TestQueryResult = { id: '123', name: 'Test' };

      mockMapToQuery.mockReturnValue(query);
      mockQueryHandler.execute.mockResolvedValue(result);

      const httpResponse = await controller.handle(httpRequest);

      expect(httpResponse.statusCode).toBe(200);
      expect(httpResponse.body).toEqual(result);
      expect(mockMapToQuery).toHaveBeenCalledWith(httpRequest);
      expect(mockQueryHandler.execute).toHaveBeenCalledWith(query);
    });

    it('should return statusCode 404 when handler returns null', async () => {
      const httpRequest: HttpRequest = { params: { id: 'not-found' } };
      mockMapToQuery.mockReturnValue(new TestQuery('not-found'));
      mockQueryHandler.execute.mockResolvedValue(null);

      const httpResponse = await controller.handle(httpRequest);

      expect(httpResponse.statusCode).toBe(404);
      expect(httpResponse.body.message).toBe('Not found.');
    });

    it('should return statusCode 500 when handler throws an error', async () => {
      const httpRequest: HttpRequest = { params: { id: 'error-id' } };
      const error = new Error('Internal Server Error');
      mockMapToQuery.mockReturnValue(new TestQuery('error-id'));
      mockQueryHandler.execute.mockRejectedValue(error);

      const httpResponse = await controller.handle(httpRequest);

      expect(httpResponse.statusCode).toBe(500);
      expect(httpResponse.body.message).toBe('An unexpected error occurred.');
    });
  });
});

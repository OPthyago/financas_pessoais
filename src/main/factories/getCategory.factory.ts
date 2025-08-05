import { BaseController } from '@/infra/controllers';
import { GetCategoryQuery, GetCategoryQueryHandler } from '@/application/useCases';
import { PrismaCategoryRepository } from '@/infra/repositories';


export const makeGetCategoryController = (): BaseController => {
  const prismaCategoryRepository = new PrismaCategoryRepository();
  const handler = new GetCategoryQueryHandler(prismaCategoryRepository);

  return BaseController.forQuery({
    queryHandler: handler,
    mapToQuery: (request) => new GetCategoryQuery(request.params.id)
  });
};

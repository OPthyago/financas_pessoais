import { BaseController } from '@/infra/controllers';
import { GetCategoryQuery, GetCategoryQueryHandler } from '@/application/useCases';
import { PrismaCategoryRepository } from '@/infra/repositories';
import { PrismaClient } from '@prisma/client';

export const makeGetCategoryController = (prisma: PrismaClient): BaseController => {
  const prismaCategoryRepository = new PrismaCategoryRepository(prisma);
  const handler = new GetCategoryQueryHandler(prismaCategoryRepository);

  return BaseController.forQuery({
    queryHandler: handler,
    mapToQuery: (request) => new GetCategoryQuery(request.params.id)
  });
};

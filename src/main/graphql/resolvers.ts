import { adaptResolver } from '@/main/adapters/';
import { makeGetCategoryController } from '@/main/factories';

export default {
  Query: {
    category: adaptResolver(makeGetCategoryController()),
  },
};

import {
  ResponseInterface,
  CreateProviderInterface,
  UpdateProviderInterface,
  ProviderApiResponseInterface
} from "interfaces";
import { createProviderByBusinessId, updateProviderByBusinessId } from "services";

export class ProviderController {
  async create(
    business_id: string,
    dataToCreate: CreateProviderInterface
  ): Promise<ResponseInterface<ProviderApiResponseInterface, CreateProviderInterface>> {
    const provider = await createProviderByBusinessId(business_id, dataToCreate);
    if (!provider.success) return { success: false, errors: provider.errors };

    return { success: true, result: provider.result };
  }

  async update(
    business_id: string,
    provider_id: string,
    dataToUpdate: UpdateProviderInterface
  ): Promise<ResponseInterface<ProviderApiResponseInterface, UpdateProviderInterface>> {
    const provider = await updateProviderByBusinessId(business_id, provider_id, dataToUpdate);
    if (!provider.success) return { success: false, errors: provider.errors };

    return { success: true, result: provider.result };
  }
}

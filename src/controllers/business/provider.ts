import {
  createProviderByBusinessId,
  deleteProviderByBusinessId,
  updateProviderByBusinessId
} from "@services/business/provider";
import { CreateProvider, Provider, UpdateProvider } from "@typescript/models/business/provider";
import { GeneralResponse } from "@typescript/others";

export class ProviderController {
  async create(business_id: string, dataToCreate: CreateProvider): Promise<GeneralResponse<Provider, CreateProvider>> {
    const provider = await createProviderByBusinessId(business_id, dataToCreate);
    if (!provider.success) return { success: false, errors: provider.errors };

    return { success: true, result: provider.result };
  }

  async update(
    business_id: string,
    provider_id: string,
    dataToUpdate: UpdateProvider
  ): Promise<GeneralResponse<Provider, UpdateProvider>> {
    const provider = await updateProviderByBusinessId(business_id, provider_id, dataToUpdate);
    if (!provider.success) return { success: false, errors: provider.errors };

    return { success: true, result: provider.result };
  }

  async delete(business_id: string, provider_id: string): Promise<GeneralResponse<void, void>> {
    const provider = await deleteProviderByBusinessId(business_id, provider_id);
    if (!provider.success) return { success: false, errors: provider.errors };

    return { success: true };
  }
}

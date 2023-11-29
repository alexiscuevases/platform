import {
  createWompiCardTokenization,
  createWompiSignature,
  createWompiTransaction,
  getWompiMerchant
} from "@services/services/wompi";
import { GeneralResponse } from "@typescript/others";
import {
  CreateWompiCardTokenization,
  CreateWompiTransaction,
  WompiMerchant,
  WompiTokenizedCard,
  WompiTransaction
} from "@typescript/services/wompi";

export class WompiController {
  async getMerchant(): Promise<GeneralResponse<WompiMerchant, any>> {
    const merchant = await getWompiMerchant();
    if (!merchant.success) return { success: false, errors: merchant.errors };
    return { success: true, result: merchant.result };
  }

  async createCardTokenization(
    dataToCreate: CreateWompiCardTokenization
  ): Promise<GeneralResponse<WompiTokenizedCard, any>> {
    const tokenization = await createWompiCardTokenization(dataToCreate);
    if (!tokenization.success) return { success: false, errors: tokenization.errors };
    return { success: true, result: tokenization.result };
  }

  async createTransaction(dataToCreate: CreateWompiTransaction): Promise<GeneralResponse<WompiTransaction, any>> {
    const merchant = await this.getMerchant();
    if (!merchant.success) return { success: false, errors: merchant.errors };

    const signature = await createWompiSignature(
      dataToCreate.reference,
      dataToCreate.amount_in_cents,
      dataToCreate.currency
    );

    const transaction = await createWompiTransaction({
      ...dataToCreate,
      acceptance_token: merchant.result.presigned_acceptance.acceptance_token,
      signature
    });
    if (!transaction.success) return { success: false, errors: transaction.errors };
    return { success: true, result: transaction.result };
  }

  async getTransaction() {}
}

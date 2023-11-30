import { apiResponseHandler } from "@helpers/apiResponseHandler";
import { getUrlParams } from "@helpers/getUrlParams";
import { ConnectMongo } from "@libs/mongoose";
import { BusinessModel } from "@models/business/business";
import { Business, CreateBusiness } from "@typescript/models/business";
import { ValidatorToCreateBusiness } from "@validators/models/business";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body: CreateBusiness = await request.json();
    const validation = ValidatorToCreateBusiness.validate(body);
    if (!validation.success) return apiResponseHandler({ status: 200, result: validation.errors });

    await ConnectMongo();

    const businessExists: Business = await BusinessModel.findOne({
      business_local_subdomain: body.business_local_subdomain
    });
    if (businessExists)
      return apiResponseHandler({
        status: 200,
        errors: {
          business_local_subdomain: "Subdominio en uso, por favor usar uno diferente"
        }
      });

    const business: Business = await BusinessModel.create(body);
    return apiResponseHandler({ status: 200, result: business });
  } catch (e: any) {
    return apiResponseHandler({ status: 500, errors: { GENERAL_ERROR: e.message } });
  }
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    await ConnectMongo();

    const business: Business[] = await BusinessModel.find(getUrlParams(request.url));
    return apiResponseHandler({ status: 200, result: business });
  } catch (e: any) {
    return apiResponseHandler({ status: 500, errors: { GENERAL_ERROR: e.message } });
  }
}

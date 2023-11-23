import { getUrlParams, apiResponseHandler } from "helpers";
import { CreateBusinessInterface, BusinessInterface } from "interfaces";
import { ConnectMongo } from "utilities";
import { BusinessModel } from "models";
import { NextRequest, NextResponse } from "next/server";
import { CreateBusinessValidator } from "validations";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body: CreateBusinessInterface = await request.json();
    const validation = CreateBusinessValidator.validate(body);
    if (!validation.success) return apiResponseHandler({ status: 200, result: validation.errors });

    await ConnectMongo();

    const businessExists: BusinessInterface = await BusinessModel.findOne({
      business_local_subdomain: body.business_local_subdomain
    });
    if (businessExists)
      return apiResponseHandler({
        status: 200,
        errors: {
          business_local_subdomain: "Subdominio en uso, por favor usar uno diferente"
        }
      });

    const business: BusinessInterface = await BusinessModel.create(body);
    return apiResponseHandler({ status: 200, result: business });
  } catch (e: any) {
    return apiResponseHandler({ status: 500, errors: { GENERAL_ERROR: e.message } });
  }
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    await ConnectMongo();

    const business: BusinessInterface[] = await BusinessModel.find(getUrlParams(request.url));
    return apiResponseHandler({ status: 200, result: business });
  } catch (e: any) {
    return apiResponseHandler({ status: 500, errors: { GENERAL_ERROR: e.message } });
  }
}

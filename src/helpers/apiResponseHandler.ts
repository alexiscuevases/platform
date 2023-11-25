import { GeneralErrors, GeneralResponse } from "@typescript/others";
import { NextResponse } from "next/server";

const commonApiHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type"
};

const successApiHeaders = {
  ...commonApiHeaders,
  "Content-Type": "application/json"
};

export const apiResponseHandler = async <Result, Errors>({
  result,
  status,
  errors
}: {
  result?: Result;
  status: number;
  errors?: GeneralErrors<Errors>;
}): Promise<NextResponse> => {
  const response: GeneralResponse<Result, Errors> = errors ? { success: false, errors } : { success: true, result };
  return NextResponse.json(response, {
    status,
    headers: errors ? commonApiHeaders : successApiHeaders
  });
};

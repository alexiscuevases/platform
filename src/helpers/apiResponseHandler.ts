import { ErrorsInterface, ResponseInterface } from "interfaces";
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
  errors?: ErrorsInterface<Errors>;
}): Promise<NextResponse> => {
  const response: ResponseInterface<Result, Errors> = errors ? { success: false, errors } : { success: true, result };
  return NextResponse.json(response, {
    status,
    headers: errors ? commonApiHeaders : successApiHeaders
  });
};

import { GeneralResponse } from "@typescript/others";
import { SchemaValidator } from "@utils/schemaValidator";
import { revalidateTag } from "next/cache";

const responseErrorHandler = (response: Response): GeneralResponse<any, any> => {
  return {
    success: false,
    errors: {
      GENERAL_ERROR: response.statusText
    }
  };
};

const fetchErrorHandler = (e: any): GeneralResponse<any, any> => {
  return {
    success: false,
    errors: {
      GENERAL_ERROR: e instanceof Error ? e.message : "An error occurred while processing request"
    }
  };
};

interface RevalidateOtherTag {
  baseValue: string;
  valuesToAdd: {
    name: string;
  }[];
}

export const fetchData = async <Result, Body>(
  url: string,
  method: string,
  body?: Body,
  extra?: {
    headers?: Record<string, string>;
    validator?: SchemaValidator<Body>;
    revalidateTags?: string[];
    revalidateOtherTags?: RevalidateOtherTag[];
    next?: NextFetchRequestConfig;
  }
): Promise<GeneralResponse<Result, Body>> => {
  try {
    if (extra?.validator && body) {
      const validation = extra.validator.validate(body);
      if (!validation.success) return { success: false, errors: validation.errors };
    }

    const response = await fetch(url, {
      method,
      headers: {
        ...(extra.headers ? extra.headers : {}),
        "Content-Type": "application/json"
      },
      body: body ? JSON.stringify(body) : null,
      next: extra?.next ? extra.next : null
    });

    if (!response.ok) return responseErrorHandler(response);
    const data = await response.json();

    if (data.success) {
      if (extra.revalidateTags) extra.revalidateTags.forEach(tag => revalidateTag(tag));
      if (extra.revalidateOtherTags)
        extra.revalidateOtherTags.forEach(tag => {
          let valueToAdd = "";
          tag.valuesToAdd.forEach(value => (valueToAdd = valueToAdd + `${value.name}_${data.result[value.name]}`));

          revalidateTag(`${tag.baseValue + valueToAdd}`);
        });
    }

    return data;
  } catch (e: any) {
    return fetchErrorHandler(e);
  }
};

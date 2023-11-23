"use server";

import cloudinary from "cloudinary";
import { getEnvironmentVariable } from "helpers";
import { ResponseInterface } from "interfaces";

cloudinary.v2.config({
  cloud_name: getEnvironmentVariable("NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME"),
  api_key: getEnvironmentVariable("CLOUDINARY_API_KEY"),
  api_secret: getEnvironmentVariable("CLOUDINARY_API_SECRET"),
  secure: true
});

interface ExtraDataInterface {
  folder: string;
}

export const uploadResource = async (
  formData: FormData,
  extraData: ExtraDataInterface
): Promise<ResponseInterface<any, any>> => {
  const resource = formData.get("resource") as File;
  const arrayBuffer = await resource.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);
  try {
    const result = await new Promise((resolve, reject) => {
      cloudinary.v2.uploader
        .upload_stream(extraData, (error, result) => {
          if (error) return reject(error);
          return resolve(result);
        })
        .end(buffer);
    });

    return { success: true, result };
  } catch (error: any) {
    return { success: false, errors: { GENERAL_ERROR: error.message } };
  }
};

export const deleteResource = async (public_id: string) => {
  try {
    const result = await new Promise((resolve, reject) => {
      cloudinary.v2.uploader.destroy(public_id, {}, (error, result) => {
        if (error) return reject(error);
        return resolve(result);
      });
    });

    return { success: true, result };
  } catch (error: any) {
    return { success: false, errors: { GENERAL_ERROR: error.message } };
  }
};

"use server";

import { fetchData } from "helpers";
import {
  CreateAuthenticationInterface,
  AuthenticationInterface,
  ResponseInterface,
  UpdateAuthenticationInterface,
  AuthenticationApiResponseInterface
} from "interfaces";
import { getSettings } from "settings";
import { CreateAuthenticationValidator, UpdateAuthenticationValidator } from "validations";

const API_ENDPOINT = `${getSettings("application").URLs.api}/authentication`;

export const createAuthentication = async (
  dataToCreate: CreateAuthenticationInterface
): Promise<ResponseInterface<AuthenticationApiResponseInterface, CreateAuthenticationInterface>> =>
  fetchData(API_ENDPOINT, "POST", dataToCreate, {
    validator: CreateAuthenticationValidator,
    revalidateTags: ["authentications"]
  });

export const updateAuthenticationById = async (
  authentication_id: string,
  dataToUpdate: UpdateAuthenticationInterface
): Promise<ResponseInterface<AuthenticationApiResponseInterface, UpdateAuthenticationInterface>> => {
  return fetchData(`${API_ENDPOINT}/${authentication_id}`, "PUT", dataToUpdate, {
    validator: UpdateAuthenticationValidator,
    revalidateTags: [`authentication-${authentication_id}`]
  });
};

export const getAuthenticationById = async (
  authentication_id: string
): Promise<ResponseInterface<AuthenticationApiResponseInterface, AuthenticationInterface>> =>
  fetchData(`${API_ENDPOINT}/${authentication_id}`, "GET", null, {
    next: { revalidate: 3600, tags: ["authentications", `authentication-${authentication_id}`] }
  });

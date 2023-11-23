"use server";

import { fetchData } from "helpers";
import {
  CreateUserInterface,
  ResponseInterface,
  UserInterface,
  ChangeUserPasswordInterface,
  UserApiResponseInterface
} from "interfaces";
import { getSettings } from "settings";
import { ChangeUserPasswordValidator, CreateUserValidator } from "validations";

const API_ENDPOINT = `${getSettings("application").URLs.api}/user`;

export const createUser = async (
  dataToCreate: CreateUserInterface
): Promise<ResponseInterface<UserApiResponseInterface, CreateUserInterface>> =>
  fetchData(API_ENDPOINT, "POST", dataToCreate, { validator: CreateUserValidator, revalidateTags: ["users"] });

export const changeUserPassword = async (
  user_id: string,
  dataToUpdate: ChangeUserPasswordInterface
): Promise<ResponseInterface<UserApiResponseInterface, ChangeUserPasswordInterface>> =>
  fetchData(`${API_ENDPOINT}/${user_id}`, "PUT", dataToUpdate, {
    validator: ChangeUserPasswordValidator,
    revalidateTags: [`user-${user_id}`]
  });

export const getUsers = async (
  dataToFind?: UserInterface
): Promise<ResponseInterface<UserApiResponseInterface[], UserInterface>> => {
  const queryParams = dataToFind ? new URLSearchParams(dataToFind as any).toString() : "";
  return fetchData(`${API_ENDPOINT}?${queryParams}`, "GET", null, {
    next: { revalidate: 3600, tags: ["users"] }
  });
};

export const getUserById = async (
  user_id?: string
): Promise<ResponseInterface<UserApiResponseInterface, UserInterface>> =>
  fetchData(`${API_ENDPOINT}/${user_id}`, "GET", null, {
    next: { revalidate: 3600, tags: ["users", `user-${user_id}`] }
  });

"use server";

import { getConfigs } from "@helpers/getConfigs";
import { fetchData } from "@helpers/fetchData";
import { ChangeUserPassword, CreateUser, User } from "@typescript/models/user";
import { GeneralResponse } from "@typescript/others";
import { ValidatorToChangeUserPassword, ValidatorToCreateUser } from "@validators/user";

const API_ENDPOINT = `${getConfigs("application").URLs.api}/user`;

export const createUser = async (dataToCreate: CreateUser): Promise<GeneralResponse<User, CreateUser>> =>
  fetchData(API_ENDPOINT, "POST", dataToCreate, { validator: ValidatorToCreateUser, revalidateTags: ["users"] });

export const changeUserPassword = async (
  user_id: string,
  dataToUpdate: ChangeUserPassword
): Promise<GeneralResponse<User, ChangeUserPassword>> =>
  fetchData(`${API_ENDPOINT}/${user_id}`, "PUT", dataToUpdate, {
    validator: ValidatorToChangeUserPassword,
    revalidateTags: [`user-${user_id}`]
  });

export const getUsers = async (dataToFind?: User): Promise<GeneralResponse<User[], User>> => {
  const queryParams = dataToFind ? new URLSearchParams(dataToFind as any).toString() : "";
  return fetchData(`${API_ENDPOINT}?${queryParams}`, "GET", null, {
    next: { revalidate: 3600, tags: ["users"] }
  });
};

export const getUserById = async (user_id?: string): Promise<GeneralResponse<User, User>> =>
  fetchData(`${API_ENDPOINT}/${user_id}`, "GET", null, {
    next: { revalidate: 3600, tags: ["users", `user-${user_id}`] }
  });

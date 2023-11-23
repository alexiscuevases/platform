"use server";

import { CookieListItem } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

export const cookie = async (dataToUpdate: CookieListItem) => cookies().set(dataToUpdate);

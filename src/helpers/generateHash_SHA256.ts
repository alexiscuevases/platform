import crypto from "crypto";

export const generateHash_SHA256 = (dataToHash: string) => {
  const hash = crypto.createHash("sha256");
  hash.update(dataToHash);
  return hash.digest("hex");
};

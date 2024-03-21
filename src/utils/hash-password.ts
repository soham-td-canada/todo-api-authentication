import argon2 from "argon2";

export default async function(password: string) {
  try {
    return await argon2.hash(password);
  } catch (error) {
      console.error("Error hashing password", error);
      throw error;
  }
}
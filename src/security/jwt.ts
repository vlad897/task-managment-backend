import bcrypt from "bcrypt";

export async function hashing(el: string): Promise<string> {
  const password: string = await bcrypt.hash(el, 5);
  return password;
}

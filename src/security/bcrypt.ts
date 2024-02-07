import bcrypt from "bcrypt";

export async function hashing(el: string): Promise<string> {
  const password: string = await bcrypt.hash(el, 5);
  return password;
}

export async function passwordChech(password: string, hashPassword: string) {
  const result = await bcrypt.compare(password, hashPassword);
  if (!result) {
    throw "Incorrect email or password";
  }
  return result;
}

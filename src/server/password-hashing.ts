import bcrypt from 'bcryptjs';

export async function hashPassword(password: string): Promise<string | never> {
  return await bcrypt.hash(password, 5);
}

export async function checkPassword(password: string, hash: string): Promise<boolean | never> {
  return await bcrypt.compare(password, hash);
}

import { verify } from 'argon2';

export const comparePassword = async (
  passwordDB: string,
  passwordToCompare: string
) => {
  const result = await verify(passwordDB, passwordToCompare);
  if (!result) throw new Error('password incorrect');
};

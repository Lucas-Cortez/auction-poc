export const wrapPassword = (password?: string) => {
  return password || (process.env.BCRYPT_GENERATED_PASSWORD as string);
};

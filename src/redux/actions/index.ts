export const SAVE_EMAIL = 'SAVE_EMAIL';

export const saveEmail = (email: string) => ({
  type: SAVE_EMAIL,
  payload: {
    email,
  },
});

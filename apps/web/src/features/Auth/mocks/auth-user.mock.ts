import TEXTS from '@shared/i18n';
import { MOCK_ACCOUNTS } from './auth-credentials.mock';

export const MOCK_USERS = MOCK_ACCOUNTS.map(({ user }) => ({ ...user }));

export async function mockLogin(userId: string) {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const user = MOCK_USERS.find((item) => item.id === userId);
  if (!user) {
    throw new Error(TEXTS.auth.userNotFound);
  }
  return { ...user };
}
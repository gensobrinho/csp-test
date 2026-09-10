import { TAuthUser } from "../types/TAuthUser";

export const MOCK_USERS: TAuthUser[] = [
  { id: '1', name: 'Ana Admin', role: 'admin' },
  { id: '2', name: 'Bruno Agilista', role: 'agilist' },
  { id: '3', name: 'Carla Dev', role: 'developer' },
];

export async function mockLogin(userId: string): Promise<TAuthUser> {
  await new Promise((r) => setTimeout(r, 300));
  const user = MOCK_USERS.find((u) => u.id === userId);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
}
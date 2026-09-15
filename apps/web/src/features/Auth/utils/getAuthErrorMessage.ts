import TEXTS from '@shared/i18n';
import { AuthError } from '../types/AuthError';

export function getAuthErrorMessage(error: unknown): string {
  return TEXTS.auth.errors[error instanceof AuthError ? error.code : 'unknown'];
}
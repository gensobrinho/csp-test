import type { ReactNode } from 'react';

export type TToastInput = {
  title: string;
  description?: string;
  icon?: ReactNode;
  delay?: number;
};

export type TToastItem = TToastInput & {
  id: string;
};

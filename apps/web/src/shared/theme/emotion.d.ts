import '@emotion/react';
import type { TTheme } from './TTheme';

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface Theme extends TTheme {}
}

import '@emotion/react';
import { TTheme } from './TTheme';

declare module '@emotion/react' {
  export interface Theme extends TTheme {}
}
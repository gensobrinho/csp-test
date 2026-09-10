import { SetCallback } from "../../../shared/store/store";
import { TDemo } from "../types/TDemo";

export interface IDemoInitialState {
    demoInfo: TDemo | null | undefined;
  }
  
  export const initialState: IDemoInitialState = {
    demoInfo: null,
  };
  
  const actions = (set: SetCallback<IDemoInitialState>) => ({
    setDemoInfo: (demoInfo: TDemo | null | undefined) =>
      set((state) => {
        state.demoInfo = demoInfo;
      }),
  
    resetDemoSlice: () => set(() => initialState),
  });
  
  export const slice = (set: SetCallback<IDemoInitialState>) => ({
    ...initialState,
    ...actions(set),
  });
  
  export type IDemoActions = ReturnType<typeof actions>;
  
  export default {
    slice,
    initialState,
  };
  
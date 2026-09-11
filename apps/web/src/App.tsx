import { useEffect } from "react";
import { IAuthActions, IAuthInitialState } from "./features/Auth";
import { useSliceSetter, useSliceState } from "./shared/hooks";
import { AppRouter } from "./_app/router/AppRouter";

function App() {
  const isHydrated = useSliceState<IAuthInitialState, 'isHydrated'>('isHydrated');
  const hydrateAuth = useSliceSetter<IAuthActions, 'hydrateAuth'>('hydrateAuth');

  useEffect(() => {
    hydrateAuth();
  }, [hydrateAuth]);

  if (!isHydrated) {
    return null;
  }

  return <AppRouter />;
}

export default App;

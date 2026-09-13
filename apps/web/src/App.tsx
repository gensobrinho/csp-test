import { BoxContent } from '@shared/components';
import TEXTS from '@shared/i18n';
import { usePersistSession } from './features/Auth/hooks/usePersistSession';
import { AppRouter } from './_app/router/AppRouter';

function App() {
  const { isLoading, error } = usePersistSession();

  if (isLoading) {
    return <BoxContent role="status" center pad={24}>{TEXTS.auth.restoringSession}</BoxContent>;
  }

  return (
    <>
      {error && <BoxContent role="alert" pad={16}>{error}</BoxContent>}
      <AppRouter />
    </>
  );
}

export default App;
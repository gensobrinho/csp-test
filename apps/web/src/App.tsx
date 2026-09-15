import { Spinner, BoxContent } from '@shared/components';
import TEXTS from '@shared/i18n';
import { usePersistSession } from './features/Auth/hooks/usePersistSession';
import { AppRouter } from './_app/router/AppRouter';

function App() {
  const { isLoading } = usePersistSession();

  if (isLoading) {
    return (
      <BoxContent center pad={24}>
        <Spinner size={28} label={TEXTS.auth.restoringSession} />
      </BoxContent>
    );
  }

  return <AppRouter />;
}

export default App;

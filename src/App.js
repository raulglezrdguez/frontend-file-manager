import AppRoot from './AppRoot';
import AppState from './context/AppState';

function App() {
  return (
    <AppState>
      <AppRoot />
    </AppState>
  );
}

export default App;

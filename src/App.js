import './App.css';
import ListGames from './components/listGames/listGames';
import CreateGame from './components/registerGame/registerGame';

function App() {
  
  return (
    <div className="App">
      <CreateGame />
      <ListGames />
    </div>
  );
}

export default App;

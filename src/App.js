import './App.css';
import ListGames from './components/listGames/listGames';
import CreateGame from './components/registerGame/registerGame';
import LoginManager from './components/loginManager/loginManager';
import GamePage from './components/gamePage/gamePage';


function App() {

  
  
  return (
    <div className="App">
      <LoginManager />
      <CreateGame />
      <ListGames />
      <GamePage />
    </div>
  );
}

export default App;

import './App.css';
import ListGames from './components/listGames/listGames';
import CreateGame from './components/registerGame/registerGame';
import LoginManager from './components/loginManager/loginManager';


function App() {

  
  
  return (
    <div className="App">
      <LoginManager />
      <CreateGame />
      <ListGames />
    </div>
  );
}

export default App;

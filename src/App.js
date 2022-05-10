import './App.css';
import { useState, useEffect } from "react"
import { db } from './firebase-config'
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore'

function App() {
  const [newTitle, setNewTitle] = useState("")
  const [newRate, setNewRate] = useState(0)
  const [newPlataform, setNewPlataform] = useState("")
  const [games, setGames] = useState([]);
  const gamesCollectionRef = collection(db, "games");

  const createGame = async () => {
    await addDoc(gamesCollectionRef, {title: newTitle, rate: Number(newRate), plataform: newPlataform})
  }

  const updateGame = async (id, rate) => {
    const userDoc = doc(db, "games", id)
    const newFields = { rate: rate + 1}
    await updateDoc(userDoc, newFields)
  }

  const deleteGame = async (id) => {
    const userDoc = doc(db, "games", id)
    await deleteDoc(userDoc);
  }

  useEffect(() => {

    const getGames = async () => {
      const data = await getDocs(gamesCollectionRef);
      setGames(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getGames();

  }, [])

  return (
    <div className="App">
      <input 
        placeholder='Titulo' 
        onChange={(event) => { 
          setNewTitle(event.target.value) 
        }} 
      />
      <input 
        type="number" 
        placeholder='Note' 
        onChange={(event) => { 
          setNewRate(event.target.value) 
        }} 
      />
      <input 
        placeholder='Plataforma'
        onChange={(event) => { 
          setNewPlataform(event.target.value) 
        }} 
      />

      <button onClick={createGame}>Adicionar jogo</button>
      {games.map((game) => {
        return (
          <div>
            {" "}
            <h1>Titulo: {game.title} </h1>
            <h1>Plataforma: {game.plataform} </h1>
            <h1>Nota: {game.rate} </h1>
            <button onClick={() => {updateGame(game.id, game.rate)}} >Increase</button>
            <button onClick={() => {deleteGame(game.id)}}> Excluir </button>
          </div>
        );
      })}
    </div>
  );
}

export default App;

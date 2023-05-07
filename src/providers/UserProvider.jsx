import { useContext, createContext, useState, useMemo, useEffect } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, db } from '../firebase-config';
import { collection, getDocs, doc, setDoc } from 'firebase/firestore';


const ReactUserContext = createContext(null)

export function UserContextWrapper(props) {

    const [user, setUser] = useState(null);
    const [user2, setUser2] = useState(null);

    const [games, setGames] = useState([]);

    const [gamesDB, setGamesDB] = useState([]);

    const register = async (newEmail, newPassword, newUsername) => {
        try {
            const temp = await createUserWithEmailAndPassword(auth, newEmail, newPassword);
            setUser(temp);
            await setDoc(doc(db, 'users', temp.user.uid, 'infos', 'infos'), { username: newUsername, totalGametime: 0 })
            setUser2({ username: newUsername, totalGametime: 0 })
        } catch (error) {
            console.log(error.message)
        }
    }

    const login = async (loginEmail, loginPassword) => {
        try {
            const temp = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
            setUser(temp);
            const data = await getDocs(collection(db, 'users', temp.user.uid, 'infos'));
            setUser2(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))[0]);
            console.log(temp)
            console.log(data)
        } catch (error) {
            console.log(error.message)
        }
    }

    const logout = async () => {
        await signOut(auth)
        setUser(null)
    }

    const userMngr = useMemo(() => {
        return { user, user2, games, gamesDB, logout, login, register, setGames }
    }, [user, user2, gamesDB, games, logout, login, register, setGames])


    useEffect(() => {
        async function fetchAllGames() {
            const data = await getDocs(collection(db, 'gamesDB'));
            console.log("data")
            setGamesDB(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }
        fetchAllGames();
    }, [])

    useEffect(() => {
        const getGames = async () => {
            if (user) {
                const data = await getDocs(collection(db, 'users', user.user.uid, 'games'));
                setGames(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            } else {
                setGames([])
            }
        };
        getGames();
    }, [user])

    return (
        <ReactUserContext.Provider value={userMngr}>{props.children}</ReactUserContext.Provider>
    )
}

export function useCurrentUser() {
    return useContext(ReactUserContext)
}
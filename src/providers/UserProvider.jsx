import { useContext, createContext, useState, useMemo, useEffect } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, db } from '../firebase-config';
import { addDoc, collection, getDocs, getDoc, doc, setDoc } from 'firebase/firestore';


const ReactUserContext = createContext(null)

export function UserContextWrapper(props) {
    const [registerEmail, setRegisterEmail] = useState("")
    const [registerPassword, setRegisterPassword] = useState("")

    const [user, setUser] = useState(null);
    const [user2, setUser2] = useState(null);

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
            console.log(gamesDB)
        } catch (error) {
            console.log(error.message)
        }
    }

    const logout = async () => {
        await signOut(auth)
        setUser(null)
    }

    const userMngr = useMemo(() => {
        return { user, user2, logout, login, register }
    }, [user, user2, logout, login, register])


    useEffect(() => {
        async function fetchData() {
            const data = await getDocs(collection(db, 'gamesDB'));
            console.log(data)
            setGamesDB(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            console.log(gamesDB)
        }
    }, [])

    return (
        <ReactUserContext.Provider value={userMngr}>{props.children}</ReactUserContext.Provider>
    )
}

export function useCurrentUser() {
    return useContext(ReactUserContext)
}
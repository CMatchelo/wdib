import { useContext, createContext, useState, useMemo } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase-config';


const ReactUserContext = createContext(null)

export function UserContextWrapper(props) {
    const [registerEmail, setRegisterEmail] = useState("")
    const [registerPassword, setRegisterPassword] = useState("")

    const [user, setUser] = useState(null);

    const register = async () => {
        try {
            const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
            console.log(user)
        } catch (error) {
            console.log(error.message)
        }
    }
    
    const login = async (loginEmail, loginPassword) => {
        console.log("login foi", loginEmail, loginPassword)
        try {
            const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
            setUser(user);
            console.log(user)
        } catch (error) {
            console.log(error.message)
        }
    }
    
    const logout = async () => {
        console.log("logout")
        await signOut(auth)
        setUser(null)
    }

    const userMngr = useMemo(() => {
        return { user, logout, login, register}
    }, [user, logout, login, register])

    return (
        <ReactUserContext.Provider value={userMngr}>{props.children}</ReactUserContext.Provider>
    )
}

export function useCurrentUser() {
    return useContext(ReactUserContext)
}
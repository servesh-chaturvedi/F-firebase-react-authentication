import { createContext, useState, useEffect, useContext } from "react"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, updatePassword, updateEmail } from "firebase/auth";
import app from "../firebase";

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [currentUser, setcurrentUser] = useState({})
    const [loading, setloading] = useState(true)
    const auth = getAuth(app);

    const signup = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }
    const logout = () => {
        return signOut(auth)
    }

    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email)
    }

    const update_email = (email) => {
        return updateEmail(auth.currentUser, email)
    }

    const update_password = (password) => {
        return updatePassword(auth.currentUser, password)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setcurrentUser(user)
            setloading(false)
        })
        return unsubscribe
    }, [auth])

    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
        update_password,
        update_email
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}

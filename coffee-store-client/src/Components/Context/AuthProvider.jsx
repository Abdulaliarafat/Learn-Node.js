import { createUserWithEmailAndPassword, deleteUser, signInWithEmailAndPassword } from "firebase/auth";
import React, { createContext } from 'react';
import { auth } from "../FIreBase/FireBase.init";

export const AuthContext=createContext(null);

const AuthProvider = ({children}) => {
   
    const createUser=(email,password)=>{
        return createUserWithEmailAndPassword(auth,email,password)
    }
    const signInUser=(email,password)=>{
        return signInWithEmailAndPassword(auth,email,password)
    }
    const userDelete=()=>{
        return deleteUser(auth.currentUser)
    }
   const userInfo={
        createUser,
        userDelete,
        signInUser
   }
    return (
     <AuthContext value={userInfo}>
        {children}
     </AuthContext>
    );
};

export default AuthProvider;
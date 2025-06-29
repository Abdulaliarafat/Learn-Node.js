import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth } from '../Firebase/firebase';
import { AuthContext } from './AuthContext';
// import axios from 'axios';

const googleProvider=new GoogleAuthProvider()

const AuthProvider = ({children}) => { 
    const [loading,setLoading]=useState(true)
    const [user,setUser]=useState(null)
    const createUser=(email,password)=>{
               setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }
    const signInUser=(email,password)=>{
        return signInWithEmailAndPassword(auth,email,password)
    }
    const signInGoogle=()=>{
        return signInWithPopup(auth,googleProvider)
    }
    const signOutUser=()=>{
        return signOut(auth)
    }
    useEffect(()=>{
        const unSubscribe=onAuthStateChanged(auth,currentUser=>{
             setUser(currentUser)
             setLoading(false)
            //  post cookies..
            //  if(currentUser?.email){
            //     const userData={email:currentUser?.email};
            //     axios.post('https://job-portal-server-seven-omega.vercel.app/jwt',userData,{
                    
            //         withCredentials:true
            //     })
            //     .then(res=>{
            //         console.log(res.data);
            //     })
            //     .catch(error=>{
            //         console.log(error)
            //     })
            //  }
             console.log('user in auth state',currentUser)
        })
        return ()=>{
            unSubscribe()
        }
    },[])
    const authInfo={
              user,
             loading,
          createUser,
          signInUser,
          signInGoogle,
          signOutUser,

    }
    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;
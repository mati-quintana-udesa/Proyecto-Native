import { useEffect, useState } from "react";
import { auth } from "../config";
import { getById, store } from '../dataBase/fireStoreService'
import { FIRESTORE_FOLDER } from '../dataBase/fireStoreFolders'

const useAuthentication = () => {
    const [user, setUser] = useState(undefined)

    useEffect( ()=>{
        auth.onAuthStateChanged((au)=>{
            if(au){
                console.log("Autenticado")
                if (!user) {
                    setUser({isLoggedIn: true, uid: au.uid, email: au.email})
                    console.log(au)
                    // getById(au.uid, FIRESTORE_FOLDER.USERS)
                    // .then(data => console.log(data))
                }
            }
            else{
                console.log("Sesion cerrada")
                setUser(undefined)
            }
        })
    })

    const register =  (newUser) => {
        auth.createUserWithEmailAndPassword(newUser.email, newUser.password)
            .then(credentials =>{
                console.log(credentials.user)
                store(credentials.user.uid,FIRESTORE_FOLDER.USERS,{uid:credentials.user.uid,...newUser})
                    .then(() =>{
                        auth.signOut()
                        .then()
                    })
            })
    }

    const login = async(userCredentials) => {
        await auth.signInWithEmailAndPassword(userCredentials.email, userCredentials.password)
    }

    const logOut= async() =>{
        await auth.signOut()
    }

    return {
        user,register,logOut, login 
    }
}

export default useAuthentication;

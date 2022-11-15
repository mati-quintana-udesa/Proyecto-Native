import { useEffect, useState } from "react";
import { auth } from "../config";
import { store } from '../dataBase/fireStoreService'
import { FIRESTORE_FOLDER } from '../dataBase/fireStoreFolders'

const useAuthentication = () => {
    const [user, setUser] = useState(undefined)

    useEffect( ()=>{
        auth.onAuthStateChanged((au)=>{
            if(au){
                console.log("Autenticado")
            }
            else{
                setUser(undefined)
            }
        })
    })

    const register = async (newUser) => {
        const credentials = await auth.createUserWithEmailAndPassword(newUser.email, newUser.password)
        console.log(credentials.user)
        await store(credentials.user.uid,FIRESTORE_FOLDER.USERS,{uid:credentials.user.uid,...newUser})
        setUser({uid:credentials.user.uid,...newUser})
    }
    return {
        user,register
    }
}

export default useAuthentication;

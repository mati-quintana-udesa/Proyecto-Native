import { View, Text, TextInput, Button } from 'react-native'
import {getAuth, createUserWhithEmailAndPassword} from "firebase/auth"
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'
import { auth } from '../firebase/config'





const Register = () => {
    const [name, onChangeName] = useState("")
    const [email, onChangeEmail] = useState("")
    const [password, onChangePassword] = useState("")
    function register(){
    auth.createUserWithEmailAndPassword(email,password)    
    .then(Credential => {console.log(Credential.user)})
    .catch(error => console.log(error))
}
    return (
        <View>
            <Text>Register </Text>

            <SafeAreaView>
                <View>
                    <Text>Nombre de usuario</Text>
                    <TextInput value={name} onChangeText={onChangeName} keyBoardType="default"/>
                </View>
                
                <View>
                    <Text>Email</Text>
                    <TextInput value={email} onChangeText={onChangeEmail} keyBoardType="default"/>
                </View>

                <View>
                    <Text>Password</Text>
                    <TextInput value={password} onChangeText={onChangePassword} keyBoardType="default"/>
                </View>
                <Button title='Registrar'onPress={register}/>
            </SafeAreaView>    

        </View>
    )
}

export default Register
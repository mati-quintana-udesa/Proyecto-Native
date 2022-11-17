import { View, Text, Alert, Button, SafeAreaView, TextInput } from 'react-native'
import authenticationConsumer from '../firebase/authentication/authenticationProvider'
import { useState } from 'react'





const Login = ({navigation}) => {
        const {login} = authenticationConsumer()
        
        const [email, onChangeEmail] = useState("")
        const [password, onChangePassword] = useState("")
        const userLogin = ()=>{
            login({email, password})
            .then(()=> console.log("Logueado"))
            .catch(error => console.log(error))
        }
        const handleOnPressRegister = ()=>{navigation.navigate("Register")} 
    return (
        <View>
        <Text>Login </Text>

        <SafeAreaView>
            <View>
                <Text>Email</Text>
                <TextInput value={email} onChangeText={onChangeEmail} keyBoardType="default" />
            </View>

            <View>
                <Text>Password</Text>
                <TextInput secureTextEntry={true} value={password} onChangeText={onChangePassword} keyBoardType="default" />
            </View>

            <Button title='Login' onPress={userLogin} />
            <Button title='Registrarme' onPress={handleOnPressRegister}/>
            {/* <Button title='Remember me' onPress={userRegister} /> */}
        </SafeAreaView>

    </View>
    )
}

export default Login
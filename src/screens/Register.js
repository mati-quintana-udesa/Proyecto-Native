import { View, Text, TextInput, Button, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'
import authenticationConsumer from '../firebase/authentication/authenticationProvider'





const Register = () => {
    const {register} = authenticationConsumer()
    const [name, onChangeName] = useState("")
    const [email, onChangeEmail] = useState("")
    const [password, onChangePassword] = useState("")
    const [bio, onChangeBio] = useState("")


    const validate = () => {
        if (name === "" && email === "" && password === "") {
            throw Error("Campos incompletos")
        }
    }

    async function userRegister() {
        try {
        validate()
        await register({name,email,password,bio})

    } catch(Error){alert(Error)}
    }
    return (
        <View>
            <Text>Register </Text>

            <SafeAreaView>
                <View>
                    <Text>Nombre de usuario</Text>
                    <TextInput value={name} onChangeText={onChangeName} keyBoardType="default" />
                </View>

                <View>
                    <Text>Email</Text>
                    <TextInput value={email} onChangeText={onChangeEmail} keyBoardType="default" />
                </View>

                <View>
                    <Text>Password</Text>
                    <TextInput secureTextEntry={true} value={password} onChangeText={onChangePassword} keyBoardType="default" />
                </View>
                <View>
                    <Text>Mini Bio</Text>
                    <TextInput value={bio} onChangeText={onChangeBio} keyboardType="default"/>
                </View>
                <Button title='Registrar' onPress={userRegister} />
            </SafeAreaView>

        </View>
    )
}

export default Register
import { View, Text, Alert, Button, SafeAreaView, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
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
        <View style={styles.container}>
        <Text style={styles.text}>Ya tenes cuenta? Logueate </Text>

        <SafeAreaView style={styles.container}>
            <View>
            <Text style={styles.text}>Email</Text>
                <TextInput style={styles.field} value={email} onChangeText={onChangeEmail} keyBoardType="default" />
            </View>

            <View>
                <Text style={styles.text}>Password</Text>
                <TextInput style={styles.field} secureTextEntry={true} value={password} onChangeText={onChangePassword} keyBoardType="default" />
            </View>

            <Button title='Login' onPress={userLogin}/>
            <Button title='Registrarme' onPress={handleOnPressRegister}/> 
            {/* <Button title='Remember me' onPress={userRegister} /> */}
        </SafeAreaView>

    </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor:"white"
    },
    field: {
        width: '40%',
        backgroundColor: "#E5E5E5",
        color: '#FFA400',
        padding: 10,
        marginVertical: 10,
        borderRadius:"4px"
    },
    button: {
        width: '100px',
        height:"32px",
        backgroundColor: "#E5E5E5",
        color:'black',
        borderRadius:"4px",
        marginVertical:10,
    },
    text: {
        color: '#FFA400',
        fontSize: 20,
        alignSelf:"center"
    }
})
export default Login
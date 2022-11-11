import {View, Text, Alert, Button} from 'react-native'

const Login = ({navigation}) =>{
    const handleOnPress = ()=>{navigation.navigate("Home")}    
    return(
        <View>
            <Text>Login </Text>
            <Button onPress={handleOnPress} title="Login" />
        </View>
    )
}

export default Login
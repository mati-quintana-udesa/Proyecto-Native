import {View, Text, Button} from 'react-native'

const Home = ({navigation}) =>{
    const handleOnPressLogin = ()=>{navigation.navigate("Login")}    
    const handleOnPressRegister = ()=>{navigation.navigate("Register")}    
    return(
        <View>
            <Text>Home </Text>
            <Button onPress={handleOnPressLogin} title="Login" />
            <Button onPress={handleOnPressRegister} title="Register" />
        </View>
    )
}

export default Home
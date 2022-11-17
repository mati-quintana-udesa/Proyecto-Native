import {View, Text, Button, StyleSheet} from 'react-native'

const Landing = ({navigation}) =>{
    const handleOnPressLogin = ()=>{navigation.navigate("Login")}    
    const handleOnPressRegister = ()=>{navigation.navigate("Register")}    
    return(
        <View>
            <Text>Landing </Text>
            <Button  onPress={handleOnPressLogin} title="Login" />
            <Button  onPress={handleOnPressRegister} title="Register" />
        </View>
    )
}

export default Landing
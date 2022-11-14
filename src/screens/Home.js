import {View, Text, Button, Alert} from 'react-native'

const Home = (navigation) =>{
    const handleOnPress = ()=>{navigation.navigate("Login")}    
    return(
        <View>
            <Text>Home </Text>
            <Button onPress={handleOnPress} title="Login" />
        </View>
    )
}

export default Home
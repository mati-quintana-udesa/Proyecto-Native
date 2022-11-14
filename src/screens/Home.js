import {View, Text, Button} from 'react-native'

const Home = () =>{
    const handleOnPress = ()=>{navigation.navigate("Login")}    
    return(
        <View>
            <Text>Home </Text>
            <Button onPress={handleOnPress} title="Login" />
        </View>
    )
}

export default Home
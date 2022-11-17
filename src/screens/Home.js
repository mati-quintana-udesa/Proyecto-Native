import {View, Text, Button} from 'react-native'

const Home = ({navigation}) =>{
    return(
        <View>
            <Text>Home </Text>
            <Button title='Crear nuevo posteo' onPress={()=>{navigation.navigate("Create-Post")}}/>
        </View>
    )
}

export default Home
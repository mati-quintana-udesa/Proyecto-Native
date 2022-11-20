import {View, Text, Button} from 'react-native'
import authenticationConsumer from '../firebase/authentication/authenticationProvider'

const Profile = () =>{
    const {logOut} = authenticationConsumer()
    return(
        <View>
            <Text>Profile </Text>
            <Text>Nombre: {"Pepe"} </Text>
            <Text>Email: {"pepe@gmail.com"} </Text>
            <Text>Biografia: {""} </Text>
            <Text>Foto de perfil </Text>
            <Text>Cantidad total de posteos publicados </Text>
            <Text>Borrar posteo, si estamos en el perfil propio  </Text>
            <Button title="Logout" onPress={logOut}/>
        </View>
    )
}

export default Profile
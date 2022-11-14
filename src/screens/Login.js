import { View, Text, Alert, Button } from 'react-native'
import { auth } from '../firebase/config';
// auth dejará disponibles métodos asincrónicos para registrar y loguear un usuario. Ambos requieren de los parámetros email y pass
//Cada método debe implementarse dentro de las funciones de login y registro de nuestro proyecto.

// DOCUMENTACION: https://docs.google.com/presentation/d/1ak9HzhCmmpAdmRBLJq6w-yv9BLXuc1ftGSLC-k5PpJo/edit?usp=sharing

//Registrar un usuario
//auth.createUserWithEmailAndPassword(email, pass)

//Logear un usuario
//auth.signInWithEmailAndPassword(email, pass)



const Login = ({ }) => {
    return (
        <View>
            <Text>Login </Text>
            {/* login(email, pass){
                auth.signInWithEmailAndPassword(email, pass)
                    .then((response) => {
                        this.setState({ loggedIn: true });
                    })
                    .catch(error => {
                        this.setState({ error: 'Credenciales inválidas.' })
                    })
            } */}

        </View>
    )
}

export default Login
import { View, Text } from 'react-native'
import { auth } from '../firebase/config';
// auth dejará disponibles métodos asincrónicos para registrar y loguear un usuario. Ambos requieren de los parámetros email y pass
//Cada método debe implementarse dentro de las funciones de login y registro de nuestro proyecto.

// DOCUMENTACION: https://docs.google.com/presentation/d/1ak9HzhCmmpAdmRBLJq6w-yv9BLXuc1ftGSLC-k5PpJo/edit?usp=sharing

//Registrar un usuario
// auth.createUserWithEmailAndPassword(email, pass)

//Logear un usuario
// auth.signInWithEmailAndPassword(email, pass)



const Register = () => {
    return (
        <View>
            <Text>Register </Text>
            {/* register(email, pass){
                auth.createUserWithEmailAndPassword(email, pass)
                    .then(response => {
                        this.setState({ registered: true });
                    })
                    .catch(error => {
                        this.setState({ error: 'Fallo en el registro.' })
                    })
            } */}

        </View>
    )
}

export default Register
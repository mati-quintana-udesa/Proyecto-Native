import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home'
import Login from '../screens/Login'
import Post from '../screens/Post';
import Profile from '../screens/Profile';
import Register from '../screens/Register';
import authenticationConsumer from '../firebase/authentication/authenticationProvider';



const Router = () => {
    const Stack = createNativeStackNavigator()
    const { user } = authenticationConsumer()
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {user ? (
                    <Stack.Group>
                        <Stack.Screen name="Profile" component={Profile} />
                        <Stack.Screen name="Post" component={Post} />
                    </Stack.Group>
                ) : (
                    <Stack.Group>
                        <Stack.Screen name="Home" component={Home} />
                        <Stack.Screen name="Register" component={Register} />
                        <Stack.Screen name="Login" component={Login} />
                    </Stack.Group>
                )}


            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Router


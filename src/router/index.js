import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home'
import Landing from '../screens/Landing'
import Login from '../screens/Login'
import Post from '../screens/Post/Post';
import Profile from '../screens/Profile';
import Register from '../screens/Register';
import authenticationConsumer from '../firebase/authentication/authenticationProvider';
import CreatePost from '../screens/Post/CreatePost';



const Router = () => {
    const Stack = createNativeStackNavigator()
    const { user } = authenticationConsumer()
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {user ? (
                    <Stack.Group>
                        <Stack.Screen name="Home" component={Home} />
                        <Stack.Screen name="Profile" component={Profile} />
                        <Stack.Screen name="Post" component={Post} />
                        <Stack.Screen name='Create-Post' component={CreatePost}/>
                    </Stack.Group>
                ) : (
                    <Stack.Group>
                        <Stack.Screen name="Landing" component={Landing} />
                        <Stack.Screen name="Register" component={Register} />
                        <Stack.Screen name="Login" component={Login} />
                    </Stack.Group>
                )}


            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Router


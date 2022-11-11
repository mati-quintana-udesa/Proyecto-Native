import { NavigationContainer, Stack } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home'
import Login from '../screens/Login'



const Router = () => {
    const Stack = createNativeStackNavigator()
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Home" component={Home} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Router
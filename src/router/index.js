import { NavigationContainer, Stack } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home'
import Login from '../screens/Login'
import Post from '../screens/Post';
import Profile from '../screens/Profile';
import Register from '../screens/Register';



const Router = () => {
    const Stack = createNativeStackNavigator()
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="Post" component={Post} />
                <Stack.Screen name="Profile" component={Profile} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Router

// ANDRES, COMO ESTAS? EN CLASE PUSIERON AL SISTEMA DE RUTAS ASI:

// class MainNavigation extends Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			loggedIn: false,
// 			registerError: '',
// 		};
// 	}

// 	render() {
// 		//Stack.Group funciona como React.Fragment y nos permite agrupar Screens.

// 		return (
// 			<NavigationContainer>
// 				<Stack.Navigator>
// 					<Stack.Screen options={{ headerShown: false }} name="Register" component={Register} />
// 					<Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
// 					<Stack.Screen options={{ headerShown: false }} name="Menu" component={Menu} />
// 				</Stack.Navigator>
// 			</NavigationContainer>
// 		);
// 	}
// }

// export default MainNavigation;

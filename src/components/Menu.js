import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import Home from "../screens/Home";
import Login from "../screens/Login";
import Register from "../screens/Register";
import CreatePost from "../screens/CreatePost";
import Search from "../screens/Search";
import MyProfile from "../screens/MyProfile";
import { auth, db } from "../firebase/config";

export default class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            error: null,
            loader: true,
        };
        this.handleLogin = this.handleLogin.bind(this)
    }

    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            // Para mantener logueado a un usuario
            if (user) {
                this.setState({
                    loggedIn: true,
                });
            } //IF
            this.setState({
                loader: false,
            });
        });
    } //Component

    handleRegister(email, password, username) {
        auth
            .createUserWithEmailAndPassword(email, password)
            .then((response) => {
                console.log(response);
                db.collection("users").add({
                    username: username,
                    createdAt: Date.now(),
                });
                alert("¡Usuario registrado!");
                response.user.updateProfile({
                    displayName: username,
                });
                this.setState({
                    loggedIn: true,
                });
            })
            .catch((error) => {
                console.log(error);
                if (
                    error ==
                    "Error: The email address is already in use by another account."
                ) {
                    alert("Este e-mail ya está registrado. Por favor, utilice otro.");
                }
                this.setState({
                    error: "Error en el registro.",
                });
            });
    } //Register

    handleLogin(email, password) {
        auth
            .signInWithEmailAndPassword(email, password)
            .then((response) => {
                console.log(response);
                alert("Iniciaste sesión.");
                this.setState({
                    loggedIn: true,
                });
            })
            .catch((error) => {
                console.log(error);
                alert("Error en el inicio de sesión.");
                this.setState({
                    error: "Error en el inicio de sesión.",
                });
            });
    } //Login

    handleLogout() {
        auth
            .signOut()
            .then(() => {
                this.setState({
                    loggedIn: false,
                });
                alert("Cerraste sesión.");
            })
            .catch((error) => {
                console.log(error);
                alert("Error en el deslogueo");
            });
    } //Logout

    render() {
        const Tab = createBottomTabNavigator();
        const Stack = createNativeStackNavigator();

        return (
            <NavigationContainer>
               


                    {this.state.loggedIn ? (
                         <Tab.Navigator
                         initialRouteName="Login"
                         screenOptions={({ route }) => ({
                             tabBarIcon: ({ focused, color, size }) => {
                                 let iconName;
     
                                 if (route.name === "Home") {
                                     iconName = focused ? "home" : "home-outline";
                                 } else if (route.name === "Publicar") {
                                     iconName = focused ? "add-circle" : "add-circle-outline";
                                 } else if (route.name === "Buscar") {
                                     iconName = focused ? "search" : "search-outline";
                                 } else if (route.name === "Mi perfil") {
                                     iconName = focused ? "person" : "person-outline";
                                 } else if (route.name === "Registrarme") {
                                     iconName = focused ? "person-add" : "person-add-outline";
                                 } else if (route.name === "Iniciar sesión") {
                                     iconName = focused ? "log-in" : "log-in-outline";
                                 }
     
     
                                 return <Ionicons name={iconName} size={size} color={color} />;
                             },
                             tabBarActiveTintColor: "white",
                             tabBarInactiveTintColor: "gray",
                         })}
                         tabBarOptions={{
                             activeBackgroundColor: "#CFF5E7",
                             inactiveBackgroundColor: "#59C1BD",
                             showLabel: false,
                         }}
                     >
                        <>
                            <Tab.Screen name="Home" options={{headerShown:false}}>
                                {(props) => (
                                    <Home
                                        {...props}
                                        loggedIn={this.state.loggedIn}
                                        loader={this.state.loader}
                                    />
                                )}
                            </Tab.Screen>
                            <Tab.Screen name="Publicar" options={{headerShown:false}}>
                                {(props) => <CreatePost {...props} />}
                            </Tab.Screen>
                            <Tab.Screen name="Buscar" options={{headerShown:false}}>
                                {(props) => (
                                    <Search
                                        {...props}
                                        loggedIn={this.state.loggedIn}
                                        loader={this.state.loader}
                                    />
                                )}
                            </Tab.Screen>
                            <Tab.Screen name="Mi perfil" options={{headerShown:false}}>
                                {(props) => (
                                    <MyProfile
                                        {...props}
                                        handleLogout={() => this.handleLogout()}
                                        loader={this.state.loader}
                                    />
                                )}
                            </Tab.Screen>
                        </>
                </Tab.Navigator>

                    ) : (
                        <Tab.Navigator
                         initialRouteName="Login"
                         screenOptions={({ route }) => ({
                             tabBarIcon: ({ focused, color, size }) => {
                                 let iconName;
     
                                 if (route.name === "Home") {
                                     iconName = focused ? "home" : "home-outline";
                                 } else if (route.name === "Publicar") {
                                     iconName = focused ? "add-circle" : "add-circle-outline";
                                 } else if (route.name === "Buscar") {
                                     iconName = focused ? "search" : "search-outline";
                                 } else if (route.name === "Mi perfil") {
                                     iconName = focused ? "person" : "person-outline";
                                 } else if (route.name === "Registrarme") {
                                     iconName = focused ? "person-add" : "person-add-outline";
                                 } else if (route.name === "Iniciar sesión") {
                                     iconName = focused ? "log-in" : "log-in-outline";
                                 }
     
     
                                 return <Ionicons name={iconName} size={size} color={color} />;
                             },
                             tabBarActiveTintColor: "white",
                             tabBarInactiveTintColor: "gray",
                         })}
                         tabBarOptions={{
                             activeBackgroundColor: "#CFF5E7",
                             inactiveBackgroundColor: "#59C1BD",
                             showLabel: false,
                         }}
                     >
                            <Tab.Screen name="Iniciar sesión" options={{headerShown:false}}>
                                {(props) => (
                                    <Login
                                        {...props}
                                        handleLogin={(email, password) =>
                                            this.handleLogin(email, password)
                                        }
                                        loader={this.state.loader}
                                    />
                                )}
                            </Tab.Screen>
                            <Tab.Screen name="Registrarme" options={{headerShown:false}}>
                                {(props) => (
                                    <Register
                                        {...props}
                                        handleRegister={(email, password, username) =>
                                            this.handleRegister(email, password, username)
                                        }
                                    />
                                )}
                            </Tab.Screen>
                            
                        </Tab.Navigator>
                    )}
            </NavigationContainer>
        ); // Return
    } // Render
} // Component

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    tabBar: {
        backgroundColor: "#ff1f5a",
    },
});

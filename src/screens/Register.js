import React, { Component } from "react";
import {Text, TextInput, TouchableOpacity,View, StyleSheet,} from "react-native";
import { auth, db } from "../firebase/config";
import { NavigationContainer } from "@react-navigation/native";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      checkPassword: "",
      error: "",
      users: [],
    };
  }

  componentDidMount() {
    db.collection("users").onSnapshot(
      (docs) => {
        let usersAux = [];
        docs.forEach((doc) => {
          usersAux.push(doc.data());
        });
        this.setState({
          users: usersAux,
        });
      } 
    ); 
    console.log(this.state.users);
  }

  validateUsername() {
    let filteredUsers = this.state.users.filter((user) => {
      return user.username == this.state.username;
    });
    if (filteredUsers.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  register() {
    if (
      this.state.email == "" ||
      this.state.password == "" ||
      this.state.username == ""
    ) {
      alert("Todos los campos son obligatorios.");
    } else if (!this.state.email.includes("@")) {
      alert("El formato de e-mail no es válido.");
    } else if (this.validateUsername()) {
      alert("Este nombre de usuario ya está en uso. Por favor, elija otro.");
    } else if (this.state.password.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres.");
    } else if (this.state.password !== this.state.checkPassword) {
      alert("Por favor, repita la misma contraseña.");
    } else {
      this.props.handleRegister(
        this.state.email,
        this.state.password,
        this.state.username
      );
    }
  } // Registrarlos

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>¿No tenes cuenta? ¡Registrate!</Text>
        </View>
        <TextInput
          style={styles.field}
          keyboardType="email-address"
          placeholder="Mail"
          onChangeText={(text) => this.setState({ email: text })}
        />
        <TextInput
          style={styles.field}
          keyboardType="default"
          placeholder="Nombre de usuario"
          onChangeText={(text) => this.setState({ username: text })}
        />
        <TextInput
          style={styles.field}
          keyboardType="default"
          placeholder="Contraseña"
          secureTextEntry={true}
          onChangeText={(text) => this.setState({ password: text })}
        />
        <TextInput
          style={styles.field}
          keyboardType="default"
          placeholder="Repetir contraseña"
          secureTextEntry={true}
          onChangeText={(text) => this.setState({ checkPassword: text })}
        />
        <TouchableOpacity
          style={
            this.state.email == "" ||
            this.state.password == "" ||
            this.state.username == "" ||
            this.state.checkPassword == ""
              ? styles.btnDisabled
              : styles.btn
          }
          onPress={() => this.register()}
          disabled={
            this.state.email == "" ||
            this.state.password == "" ||
            this.state.username == "" ||
            this.state.checkPassword == ""
              ? true
              : false
          }
        >
          <Text
            style={
              this.state.email == "" ||
              this.state.password == "" ||
              this.state.username == "" ||
              this.state.checkPassword == ""
                ? styles.btnText
                : null
            }
          >
            {" "}
            Registrarme{" "}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#CFF5E7",
    color: "#ff9f68",
    paddingTop: 20,
  },
  field: {
    width: "80%",
    backgroundColor: "#C9ADA7",
    textAlign: "center",
    padding: 7,
    marginTop: 5,
    borderRadius: 15,
  },
  btn: {
    backgroundColor: "#59C1BD",
    color: "white",
    textAlign: "center",
    padding: 7,
    marginTop: 15,
    borderRadius: 15,
    width: "80%",
  },
  btnDisabled: {
    backgroundColor: "#0D4C92",
    textAlign: "center",
    padding: 7,
    marginTop: 15,
    borderRadius: 15,
    width: "80%",
  },
  btnText: {
    color: "gray",
  },
  header: {
    backgroundColor: "#0D4C92",
    width: "100%",
    padding: 10,
  },
  title: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
  },
});

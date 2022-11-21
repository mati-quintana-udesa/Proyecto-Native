import React, { Component } from "react";
import {Text, TextInput, TouchableOpacity,View, StyleSheet, ActivityIndicator} from "react-native";
import { auth } from "../firebase/config";
import { NavigationContainer } from "@react-navigation/native";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loggedIn: false,
      error: "",
    };
  }

  login() {
    if (this.state.email == "" || this.state.password == "") {
      alert("Todos los campos son obligatorios");
    } else if (!this.state.email.includes("@")) {
      alert("El formato de e-mail NO es válido");
    } else {
      this.props.handleLogin(this.state.email, this.state.password);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.loader ? (
          <ActivityIndicator size="large" color="blue" />
        ) : (
          <>
            <View style={styles.header}>
              <Text style={styles.title}>
                ¡Bienvenido!
              </Text>
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
              placeholder="Contraseña"
              secureTextEntry={true}
              onChangeText={(text) => this.setState({ password: text })}
            />
            <TouchableOpacity
              onPress={() => this.login()}
              style={this.state.email == "" || this.state.password == ""
                      ? styles.btnDisabled
                      : styles.btn
                    }
              disabled={this.state.email == "" || this.state.password == ""
                        ? true
                        : false
                      }>
              <Text style={this.state.email == "" || this.state.password == ""
                      ? styles.btnText
                      : null
                    }> Ingresar </Text>
            </TouchableOpacity>
          </>
        )}
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
    backgroundColor: "white",
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
    backgroundColor: "gray",
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
    backgroundColor: "#59C1BD",
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

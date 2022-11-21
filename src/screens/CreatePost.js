import React, { Component } from "react";
import { auth, db } from "../firebase/config";
import MyCamera from "../components/MyCamera";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
} from "react-native";



export default class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.Camera;
    this.state = {
      comment: "",
      photo: "",
      showCamera: false,
    };
  } 



  handlePost() {
    db.collection("posts")
      .add({
        owner: auth.currentUser.displayName,
        description: this.state.comment,
        createdAt: Date.now(),
        likes: [],
        comments: [],
        photo: this.state.photo,
      })
      .then((response) => {
        console.log(response);
        alert("¡Posteo realizado!");
        this.setState({
          comment: "",
          photo: "",
          showCamera: true,
        });
        this.props.navigation.navigate("Home");
      }) 
      .catch((error) => {
        alert("No se pudo crear tu publicación.");
      });
  } 

  savePhoto(url) {
    this.setState({
      photo: url,
      showCamera: false,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.showCamera ? (
          <MyCamera onImageUpload={(url) => this.savePhoto(url)} />
        ) : (
          <>
            <Image source={{ uri: this.state.photo }} style={styles.image} />
            <TextInput
              style={styles.field}
              keyboardType="default"
              placeholder="¿En qué estás pensando?"
              multiline={true}
              numberOfLines={3}
              onChangeText={(text) => this.setState({ comment: text })}
              value={this.state.comment}
            />
            <TouchableOpacity
              style={this.state.comment == "" ? styles.btnDisabled : styles.btn}
              onPress={() => this.handlePost()}
              disabled={this.state.comment == "" ? true : false}
            >
              <Text style={this.state.comment == "" ? styles.btnText : null}>Publicar</Text>
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    color: "#ff9f68",
  },
  field: {
    color: "white",
    flex: 1,
    width: "90%",
    justifyContent: "center",
    padding: 10,
    marginTop: 15,
    borderRadius: 15,
    backgroundColor: "rgba(0, 0, 0, 0.247)",
  },
  btn: {
    backgroundColor: "#59C1BD",
    textAlign: 'center',
    padding: 7,
    margin: 10,
    borderRadius: 15,
    width: '90%',
  },
  btnDisabled: {
    backgroundColor: "gray",
    textAlign: 'center',
    padding: 7,
    margin: 10,
    borderRadius: 15,
    width: '90%',
  },
  btnText: {
    color: 'gray',
  },
  image: {
    marginTop: 15,
    height: 300,
    width: "90%",
    borderRadius: 12,
  },
});

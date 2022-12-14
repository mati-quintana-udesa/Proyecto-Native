import React, { Component } from "react";
import { auth, db } from "../firebase/config";
import firebase from "firebase";
import Ionicons from "react-native-vector-icons/Ionicons";
import {View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, } from "react-native";

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
    };
  } 

  onComment() {
    const posteoActualizar = db.collection("posts").doc(this.props.postId);

    if (this.state.comment == "") {
      alert("Por favor, escribí un comentario.");
    } else {
      posteoActualizar
        .update({
          comments: firebase.firestore.FieldValue.arrayUnion({
            id: Date.now(),
            email: auth.currentUser.email,
            owner: auth.currentUser.displayName,
            comment: this.state.comment,
          }),
        })
        .then(() => {
          this.setState({
            comment: "",
          });
        });
    } 
  } 

  render() {
    return (
      <View style={styles.modalView}>
        {this.props.comments.length != 0 ? (
          <FlatList
            data={this.props.comments}
            keyExtractor={(comment) => comment.id}
            renderItem={({ item }) => (
              <View style={styles.inline}>
                <View style={styles.inlineNear}>
                  <Text style={styles.commentBold}>{item.owner}</Text>
                  <Text style={styles.comment}>{item.comment}</Text>
                </View>
                {item.owner == auth.currentUser.displayName ? (
                  <TouchableOpacity
                    style={styles.closeModal}
                    onPress={() => {
                      this.props.deleteComment(item.id);
                    }}
                  >
                    <Ionicons name="trash" size="15px" color="red" />
                  </TouchableOpacity>
                ) : null}
              </View>
            )}
          />
        ) : (
          <Text style={styles.comment}>
            Aún no hay comentarios. 
          </Text>
        )}
        <TextInput
          style={styles.field}
          keyboardType="default"
          placeholder="Escribe lo que piensas..."
          placeholderTextColor="#d7d5d5"
          multiline={true}
          numberOfLines={3}
          onChangeText={(text) => this.setState({ comment: text })}
          value={this.state.comment}
        />
        <TouchableOpacity
          style={this.state.comment == "" ? styles.btnDisabled : styles.btn}
          onPress={() => this.onComment()}
          disabled={this.state.comment == "" ? true : false}
        >
          <Text>Comentar</Text>
        </TouchableOpacity>
      </View>
    );
  } 
} 

const styles = StyleSheet.create({
  image: {
    height: 200,
  },
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    padding: 10,
    margin: "auto",
    marginTop: 15,
    borderRadius: 15,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: "#0D4C92",
  },
  inline: {
    flexWrap: "wrap",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inlineNear: {
    flexWrap: "wrap",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  field: {
    color: "white",
    flex: 1,
    width: "100%",
    justifyContent: "center",
    padding: 10,
    marginTop: 15,
    borderRadius: 15,
    backgroundColor: "rgba(0, 0, 0, 0.247)",
  },
  comment: {
    maxWidth: 170,
    padding: 5,
    color: "black",
  },
  commentBold: {
    padding: 5,
    color: "black",
    fontWeight: "bold",
  },
  text: {
    color: "black",
    textAlign: "center",
  },
  btn: {
    backgroundColor: "#CFF5E7",
    color: "black",
    textAlign: "center",
    padding: 7,
    marginTop: 5,
    borderRadius: 15,
  },
  btnDisabled: {
    backgroundColor: "#0D4C92",
    textAlign: "center",
    padding: 7,
    marginTop: 5,
    borderRadius: 15,
  },
  closeModal: {
    alignSelf: "flex-end",
    padding: 10,
    marginTop: 2,
    marginBottom: 10,
    borderRadius: 4,
  },
  modalView: {
    color: "white",
    borderRadius: 10,
    width: "100%",
  },
}); 

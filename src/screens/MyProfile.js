import React, { Component } from "react";
import {View, Text, StyleSheet, TouchableOpacity, Modal, FlatList, ActivityIndicator, } from "react-native";
import { auth, db } from "../firebase/config";
import Post from "../components/Post";
import Ionicons from "react-native-vector-icons/Ionicons";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      showModal: false,
      loader: true,
    };
  } 

  componentDidMount() {
    db.collection("posts")
      .where("owner", "==", auth.currentUser.displayName)
      
      .onSnapshot(
        (docs) => {
          let postsAux = [];
          docs.forEach((doc) => {
            postsAux.push({
              id: doc.id,
              data: doc.data(),
            });
          }); 
          this.setState({
            posts: postsAux,
            loader: false,
          });
          console.log(this.state.posts);
        } 
      ); 
  } 

  addPostRedirect() {
    this.props.navigation.navigate("Publicar");
  }

  showModal() {
    this.setState({
      showModal: true,
    });
  } 

  closeModal() {
    this.setState({
      showModal: false,
    });
  } 

  render() {
    return (
      <>
        {this.state.loader ? (
          <ActivityIndicator size="large" color="blue" />
        ) : (
          <View style={styles.container}>
            <View style={styles.header}>
              <View style={styles.inline}>
                <Text style={styles.username}>
                  {auth.currentUser.displayName}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    {
                      this.state.showModal
                        ? this.closeModal()
                        : this.showModal();
                    }
                  }}
                >
                  <Ionicons
                    style={styles.icon}
                    name="information-circle-outline"
                    size="20px"
                    color="white"
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.handleLogout()}>
                  <Ionicons
                    style={styles.icon}
                    name="log-out-outline"
                    size="20px"
                    color="white"
                  />
                </TouchableOpacity>
              </View>{" "}
              {}
              {this.state.showModal ? (
                <>
                  <Modal
                    animationType="fade"
                    transparent={false}
                    visible={this.state.showModal}
                    style={styles.modal}
                  >
                    <Text style={styles.text}>
                      <Text style={styles.boldText}>E-mail:</Text>
                      <Text style={styles.paddingLeft}>
                        {auth.currentUser.email}
                      </Text>
                    </Text>
                    <Text style={styles.text}>
                      <Text style={styles.boldText}>
                        Última fecha de ingreso:
                      </Text>
                      <Text style={styles.paddingLeft}>
                        {auth.currentUser.metadata.lastSignInTime}
                      </Text>
                    </Text>
                    <Text style={styles.text}>
                      <Text style={styles.boldText}>Publicaciones:</Text>
                      <Text style={styles.paddingLeft}>
                        {this.state.posts.length}
                      </Text>
                    </Text>
                  </Modal>
                </>
              ) : null}
            </View>
            {}
            {this.state.posts.length > 0 ? (
              <FlatList
                showsHorizontalScrollIndicator={false}
                style={styles.flatlist}
                data={this.state.posts}
                keyExtractor={(post) => post.id.toString()}
                renderItem={({ item }) => <Post dataItem={item} />}
              />
            ) : (
              <View style={styles.noFlatlist}>
                <Text style={styles.textBlack}>
                  No tenés niguna publicación.
                </Text>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => this.addPostRedirect()}
                >
                  <Text>¡Creá tu primer posteo!</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      </>
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
  header: {
    backgroundColor: "#59C1BD",
    boxSizing: "border-box",
    width: "100%",
    padding: 10,
    position: "relative",
    zIndex: 0,
    flexDirection: "column",
    justifyContent: "space-around",
  },
  inline: {
    flexWrap: "wrap",
    alignItems: "space-between",
    flexDirection: "row",
    margin: 5,
    justifyContent: "space-between",
  },
  icon: {
    margin: 5,
  },
  flatlist: {
    overflow: "hidden",
    width: "100%",
    flex: 9,
    flexDirection: "column",
  },
  noFlatlist: {
    overflow: "hidden",
    width: "100%",
    flex: 9,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    backgroundColor: "#ffb703",
    color: "black",
    textAlign: "center",
    padding: 7,
    marginTop: 5,
    borderRadius: 15,
    width: "80%",
  },
  text: {
    color: "white",
    textAlign: "center",
    margin: 5,
  },
  textBlack: {
    color: "black",
    textAlign: "center",
    margin: 30,
  },
  username: {
    textAlign: "left",
    color: "white",
    fontWeight: "600",
    fontSize: 15,
    padding: 5,
  },
  modal: {
    border: "none",
    width: "100%",
    marginTop: 10,
    flexDirection: "column",
    justifyContent: "space-around",
  },
  boldText: {
    fontSize: "30",
    fontWeight: "bold",
  },
  paddingLeft: {
    paddingLeft: "5px",
  },
});

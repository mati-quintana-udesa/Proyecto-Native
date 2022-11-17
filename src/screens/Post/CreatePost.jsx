
import { useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View, TextInput } from "react-native";
import authenticationConsumer from "../../firebase/authentication/authenticationProvider";
import { FIRESTORE_FOLDER } from "../../firebase/dataBase/fireStoreFolders";
import { store } from "../../firebase/dataBase/fireStoreService";


export default function CreatePost() {
const {user} = authenticationConsumer()
const [descripcion, onChangeDescrpcion] = useState("")
function savePost(){
    const {uid, email} = user
    const newPost = {
        descripcion, createAt: (new Date().toISOString()), email
    }
    store(uid, FIRESTORE_FOLDER.POST, newPost ) 
        .then(response => {console.log(response); navigation.navigate("Home")})
}

  return (
    <View>
        <Text> Crea tu post </Text>
        <Text> Descripcion </Text>
        <TextInput value={descripcion} onChangeText={onChangeDescrpcion} keyBoardType="default" />
        <Button title="Guardar" onPress={savePost}/>
    </View>
  );
}



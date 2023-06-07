import React, { useState } from "react";
import {
  Modal,
  Text,
  Button,
  View,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";

const MyModal = ({ visible, setVisible, setTodos, todos }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={() => setVisible(false)}
    >
      <TouchableOpacity
        style={{
          flex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          justifyContent: "center",
          alignItems: "center",
        }}
        activeOpacity={1}
        onPress={() => setVisible(false)}
      >
        <View
          style={{
            backgroundColor: "white",
            width: 300,
            height: 300,
            borderRadius: 10,
            padding: 20,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 30, fontWeight: "bold", marginBottom: 20 }}>
            Add Todo
          </Text>
          <TextInput
            style={{
              marginBottom: 10,
              borderWidth: 1,
              borderColor: "black",
              borderRadius: 5,
              padding: 5,
              width: "100%",
            }}
            placeholder="Title"
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
          <TextInput
            style={{
              marginBottom: 10,
              borderWidth: 1,
              borderColor: "black",
              borderRadius: 5,
              padding: 5,
              width: "100%",
              height: 100,
            }}
            placeholder="Description"
            value={description}
            onChangeText={(text) => setDescription(text)}
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              width: "100%",
            }}
          >
            <Button
              onPress={() => {
                if (!title) {
                  ToastAndroid.show(
                    "Title cannot be empty",
                    ToastAndroid.SHORT
                  );
                  return;
                }
                if (!description) {
                  ToastAndroid.show(
                    "Description cannot be empty",
                    ToastAndroid.SHORT
                  );
                  return;
                }
                setTodos([
                  ...todos,
                  {
                    title: title,
                    description: description,
                    isDone: false,
                  },
                ]);
                setTitle("");
                setDescription("");
                setVisible(false);
              }}
              title="Add"
            />
            <Button onPress={() => setVisible(false)} title="Cancel" />
          </View>
        </View>
        <TouchableOpacity
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            padding: 10,
          }}
          onPress={() => setVisible(false)}
        >
          <Text style={{ fontSize: 20 }}>X</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export default MyModal;

import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Card, CheckBox } from "react-native-elements";
import { useState } from "react";
import { Button } from "@rneui/base";

export default function App() {
  const [todos, setTodos] = useState([
    {
      title: "Todo 1",
      description: "Description 1",
      isDone: false,
    },
    {
      title: "x",
      description: "x",
      isDone: false,
    },
  ]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <>
      <View style={styles.container}>
        <Text style={{ fontSize: 30, fontWeight: "bold", marginBottom: 20 }}>
          Todo App
        </Text>
        <ScrollView
          width="100%"
          contentContainerStyle={{ alignItems: "center" }}
          height="40%"
        >
          {todos.length > 0 ? (
            todos.map((todo) => (
              <Card
                style={{
                  marginBottom: 10,
                  borderRadius: 5,
                }}
              >
                <Card.Title
                  style={{
                    width: 300,
                  }}
                >
                  {todo.title}
                </Card.Title>
                <Card.Divider />
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <CheckBox
                    onPress={() => {
                      setTodos(
                        todos.map((item) => {
                          if (item.title === todo.title) {
                            return {
                              ...item,
                              isDone: !item.isDone,
                            };
                          }
                          return item;
                        })
                      );
                    }}
                    checked={todo.isDone}
                  />
                  <Text
                    style={{
                      textDecorationLine: todo.isDone ? "line-through" : "none",
                      color: todo.isDone ? "grey" : "black",
                    }}
                  >{todo.description}</Text>
                </View>
              </Card>
            ))
          ) : (
            <Text>No Todos</Text>
          )}
        </ScrollView>
        {/* 
        <ScrollView
          width="50%"
          contentContainerStyle={{ alignItems: "center" }}
          height="20%"
        >
          {todos.length > 0 ? (
            todos.map((todo) => (
              // render normally without cARD
              <View
                key={todo.title}
                style={{
                  borderWidth: 1,
                  borderColor: "black",
                  borderRadius: 5,
                  padding: 20,
                  marginBottom: 10,
                  width: "100%",
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "bold",
                    marginBottom: 10,
                  }}
                >
                  {todo.title}
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "bold",
                    marginBottom: 10,
                  }}
                >
                  {todo.description}
                </Text>
              </View>
            ))
          ) : (
            <Text>No Todos</Text>
          )}
        </ScrollView> */}

        <Text style={{ fontSize: 30, fontWeight: "bold", marginBottom: 20 }}>
          Add Todo
        </Text>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "space-between",
            width: "50%",
            marginTop: 20,
          }}
        >
          <StatusBar style="auto" />
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
          <Button
            onPress={() => {
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
            }}
            title="Add Todo"
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    marginTop: 200,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

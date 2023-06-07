import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Card, CheckBox, Header } from "react-native-elements";
import { useState } from "react";
import MyModal from "./components/MyModal";

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
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Header
        statusBarProps={{ barStyle: "light-content" }}
        centerComponent={{
          text: "Todo App",
          style: { color: "#fff", fontSize: 20, fontWeight: "bold" },
        }}
        containerStyle={{ backgroundColor: "#000" }}
        // end component add a plus button
        rightComponent={{
          icon: "add",
          color: "#fff",
          onPress: () => {
            setVisible(true);
          },
        }}
      />
      <StatusBar style="hidden" />
      <View style={styles.container}>
        <ScrollView
          width="100%"
          contentContainerStyle={{ alignItems: "center" }}
        >
          {todos.length > 0 ? (
            todos.map((todo) => (
              <Card
                key={todo.title}
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
                  >
                    {todo.description}
                  </Text>
                </View>
              </Card>
            ))
          ) : (
            <Text>No Todos</Text>
          )}
        </ScrollView>
      </View>
      <MyModal
        visible={visible}
        setVisible={setVisible}
        setTodos={setTodos}
        todos={todos}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Card, CheckBox, Header } from "react-native-elements";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";
import MyModal from "./components/MyModal";

export default function App() {

  
  const [todos, setTodos] = useState([]);
  const [visible, setVisible] = useState(false);

  const updateTodos = (todos) => {
    setTodos(todos);
    AsyncStorage.setItem('todos', JSON.stringify(todos));
  };
  
  useEffect(() => {
    AsyncStorage.getItem('todos').then((value) => {
      if (value) {
        updateTodos(JSON.parse(value));
      }
    });
  }, []);

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
        // Add a hamburger menu button to the left which has filters 
        leftComponent={{
          icon: "menu",
          color: "#fff",
          onPress: () => {
            // Add a menu to filter todos
          },
        }}
      />
      <StatusBar style="hidden" />
      <View style={styles.container}>
        {/* Add a single long View which shows total todos, completed and remaining */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            width: "100%",
            marginBottom: 10,
          }}
        >
          <Text>Total: {todos.length}</Text>
          <Text>
            Completed: {todos.filter((todo) => todo.isDone).length}
          </Text>
          <Text>
            Remaining: {todos.filter((todo) => !todo.isDone).length}
          </Text>
        </View>
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
                      updateTodos(
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
        setTodos={updateTodos}
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

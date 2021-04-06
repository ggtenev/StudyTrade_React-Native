import React from "react";
import { View, Text, StyleSheet, ScrollView, FlatList , TouchableOpacity} from "react-native";
import Card from "../components/BookCard";

export default function BuyResult({ navigation, route }) {
  const result = route.params.result;
  console.log(result);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Results",
      height: 120,
      headerStyle: {
        height: 90,
        backgroundColor: "white",
        shadowRadius: 0,
        shadowOffset: {
          height: 0,
        },
        elevation: 0,
      },
    });
  }, [navigation]);
  const books = result.map((b) => {
    return (
     
      <Card
      navigation={navigation}
        key={Math.random()}
        userID = {b.userID}
        title={b.title}
        author={b.author}
        condition={b.condition}
        url={b.url}

        onPress={() => navigation.navigate('Book',{
          book:b
        })}
      />
   
    );
  });
  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <View style={styles.container}>
        {books}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection:'row',
    justifyContent:'space-around',
    flexWrap:'wrap'
  },
});

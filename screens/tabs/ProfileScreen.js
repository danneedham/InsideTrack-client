//import liraries
import React, { Component } from "react";
import HorseComponent from "../../components/HorseComponent";
import { View, Text, StyleSheet, Button } from "react-native";
import FindUsers from "../../components/FindUsers";

// create a component
export default class ProfileScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <HorseComponent />
        <FindUsers />
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50"
  }
});

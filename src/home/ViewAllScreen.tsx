import React from "react";
import { View, FlatList, Image, Text, TouchableOpacity, StyleSheet, ListRenderItem } from "react-native";
import {  RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../App";
import { Place } from "./place";

type RouteProps = RouteProp<RootStackParamList, "ViewAll">;


export default function ViewAllScreen() {

  const route = useRoute<RouteProps>();

  const navigation = useNavigation();

  const items = route?.params?.places ?? []; 
  

const renderItem: ListRenderItem<Place> = ({ item }) => (
  <TouchableOpacity
    activeOpacity={0.85}
        onPress={() => navigation.navigate("Details", { place: item })}

    style={styles.card}
  >
    <Image
      source={{ uri: item.image.uri }}
      style={styles.image}
      resizeMode="cover"
    />

    <View style={styles.contentRow}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>

        <Text style={styles.location} numberOfLines={1}>
          {item.location}
        </Text>
      </View>

      {/* ⭐ Rating */}
      <View style={styles.rating}>
        <Text style={styles.ratingText}>⭐ {item.rating}</Text>
      </View>
    </View>
  </TouchableOpacity>
);


  return (
    <View style={{ padding: 16 }}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );

  
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },

  image: {
    height: 200,
    width: "100%",
  },

  contentRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#222",
  },

  location: {
    marginTop: 4,
    fontSize: 14,
    color: "#777",
  },

  rating: {
    backgroundColor: "#FFF4E5",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    marginLeft: 8,
  },

  ratingText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FF9800",
  },
});

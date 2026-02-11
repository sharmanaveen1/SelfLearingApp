import React, { useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  ListRenderItem,
} from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";

import { categories, places } from "./places";
import { Place } from "./place";
import PlaceCard from "./PlaceCard";
import { useNavigation } from "@react-navigation/native";





const HomeScreen = () =>{
  const [selectedCategory, setSelectedCategory] = useState("Most Viewed");
  const [search, setSearch] = useState("");
  const navigation = useNavigation();
  

  const filteredPlaces = useMemo(() => {
    return places.filter(
      (p) =>
        p.category === selectedCategory &&
        p.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [selectedCategory, search]);

  const renderCategory: ListRenderItem<string> = ({ item }) => {
    const isActive = item === selectedCategory;
    return (
      <TouchableOpacity
        onPress={() => setSelectedCategory(item)}
        style={[styles.categoryBtn, isActive && styles.activeCategory]}
      >
        <Text style={[styles.categoryText, isActive && styles.activeText]}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderPlace: ListRenderItem<Place> = ({ item }) => (
    <PlaceCard place={item} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hi, David 👋</Text>
          <Text style={styles.subText}>Explore the world</Text>
        </View>
        <Image
          source={{ uri: "https://randomuser.me/api/portraits/men/32.jpg" }}
          style={styles.avatar}
        />
      </View>

      <View style={styles.searchBox}>
        <Ionicons name="search" size={20} color="#999" />
        <TextInput
          placeholder="Search places"
          placeholderTextColor="#999"
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
        <Ionicons name="options-outline" size={20} color="#999" />
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Popular places</Text>
        <TouchableOpacity
          onPress={() =>{
           console.log("ViewAll clickitems:", places.length);

            navigation.navigate("ViewAll",  { places})
          }
           
         }
        >
        <Text style={{ fontWeight: "600" }}>View All</Text>
      </TouchableOpacity>
      </View>

      <FlatList
        data={categories}
        horizontal
        keyExtractor={(item) => item}
        renderItem={renderCategory}
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 6, marginBottom: 4 }} 
        contentContainerStyle={{ paddingBottom: 4 }}
      />

      <FlatList
        data={filteredPlaces}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={renderPlace}
        showsHorizontalScrollIndicator={false}
        style={{ flexGrow: 5 }}   // ⭐ IMPORTANT FIX
      />
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({
  container: {
    width:"100%",
    flex:1,
     flexDirection: "column",
    backgroundColor: "#F8F9FB",
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: 10,
  },
  greeting: { fontSize: 22, fontWeight: "700" },
  subText: { color: "#777", marginTop: 4 },
  avatar: { width: 45, height: 45, borderRadius: 25 },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 15,
    marginTop: 20,
    elevation: 2,
  },
  searchInput: { flex: 1, paddingVertical: 10, marginHorizontal: 8 },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 25,
  },
  sectionTitle: { fontSize: 18, fontWeight: "600" },
  viewAll: { color: "#4A80F0", fontWeight: "500" },

  categoryBtn: {
  paddingVertical: 15,     
  paddingHorizontal: 16,
  backgroundColor: "#eee",
  borderRadius: 20,
  marginRight: 10,
  alignSelf: "flex-start", 
},
  activeCategory: { backgroundColor: "#000", 
    alignSelf: "flex-start",

paddingVertical: 15,      
  paddingHorizontal: 16,
  borderRadius: 20,
  marginRight: 10,
  }, 
  categoryText: { color: "#555" },
  activeText: { color: "#fff" },
});


export default HomeScreen;

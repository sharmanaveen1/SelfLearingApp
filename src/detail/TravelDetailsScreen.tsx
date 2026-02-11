import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../App";


type RouteProps = RouteProp<RootStackParamList, "Details">;


function TravelDetailsScreen() {
  const route = useRoute<RouteProps>();
  const navigation = useNavigation();

  const { place } = route.params;
 
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Image Section */}
        <View style={styles.imageContainer}>
          <Image 
           source={{ uri: place.image.uri }}
          style={styles.heroImage} />

          {/* Top Icons */}
          <View style={styles.topIcons}>
            <TouchableOpacity style={styles.iconBtn} onPress={ ()=> navigation.goBack()}>
              <Ionicons name="chevron-back" size={22} color="#333" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconBtn}>
              <Ionicons name="bookmark-outline" size={20} color="#333" />
            </TouchableOpacity>
          </View>

          {/* Overlay Info Card */}
          <View style={styles.overlayCard}>
            <View>
              <Text style={styles.title}>{place.title}</Text>
              <View style={styles.locationRow}>
                <Ionicons name="location-outline" size={14} color="#ddd" />
                <Text style={styles.locationText}> {place.location}</Text>
              </View>
            </View>

            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.priceLabel}>Price</Text>
              <Text style={styles.price}>${place.price}</Text>
            </View>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabRow}>
          <Text style={[styles.tabText, styles.activeTab]}>Overview</Text>
          <Text style={styles.tabText}>Details</Text>
        </View>

        {/* Info Row */}
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Ionicons name="time-outline" size={18} color="#555" />
            <Text style={styles.infoText}> {place.duration}</Text>
          </View>

          <View style={styles.infoItem}>
            <Ionicons name="cloud" size={18} color="#555" />
            <Text style={styles.infoText}> {place.temperature}</Text>
          </View>

          <View style={styles.infoItem}>
            <Ionicons name="star" size={16} color="#555" />
            <Text style={styles.infoText}> {place.rating}</Text>
          </View>
        </View>

        {/* Description */}
        <Text style={styles.description}>{place.description}</Text>
      </ScrollView>

      {/* Bottom Button */}
      <TouchableOpacity style={styles.bookBtn}>
        <Text style={styles.bookText}>Book Now</Text>
        <Ionicons name="paper-plane-outline" size={18} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },

  imageContainer: {
    margin: 16,
    borderRadius: 34,
    overflow: "hidden",
  },

  heroImage: {
    width: "100%",
    height: 460,
  },

  topIcons: {
    position: "absolute",
    top: 25,
    left: 15,
    right: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  iconBtn: {
    backgroundColor: "#ffffffcc",
    padding: 8,
    borderRadius: 18,
  },

  overlayCard: {
    position: "absolute",
    bottom: 15,
    left: 15,
    right: 15,
    backgroundColor: "rgba(0,0,0,0.55)",
    borderRadius: 16,
    padding: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },

  locationText: {
    color: "#ddd",
    fontSize: 13,
  },

  priceLabel: {
    color: "#bbb",
    fontSize: 12,
  },

  price: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  tabRow: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 10,
  },

  tabText: {
    marginRight: 20,
    fontSize: 15,
    color: "#888",
    fontWeight: "600",
  },

  activeTab: {
    color: "#000",
    borderBottomWidth: 2,
    borderBottomColor: "#000",
    paddingBottom: 4,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 15,
  },

  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
    elevation: 2,
  },

  infoText: {
    fontSize: 13,
    color: "#333",
  },

  description: {
    marginHorizontal: 20,
    marginTop: 15,
    color: "#666",
    fontSize: 14,
    lineHeight: 20,
  },

  bookBtn: {
    flexDirection: "row",
    backgroundColor: "#111",
    margin: 20,
    paddingVertical: 16,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },

  bookText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default TravelDetailsScreen;

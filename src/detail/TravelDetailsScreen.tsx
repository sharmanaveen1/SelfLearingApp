import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@react-native-vector-icons/ionicons';
import { RootStackParamList } from '../../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NewsData } from '../home/place';

type RouteProps = RouteProp<RootStackParamList, 'Details'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Details'>;
export const formatDate = (dateString: string) => {
  const date = new Date(dateString.replace(' ', 'T'));

  const day = date.getDate();

  const month = date.toLocaleString('en-US', {
    month: 'short',
  }).toUpperCase(); // FEB

  const year = date.getFullYear();

  const time = date.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false, // 24-hour format
    timeZone: 'Asia/Kolkata',
  });

  return `${month} ${day}, ${year}, ${time} IST`;
};

function TravelDetailsScreen() {
  const route = useRoute<RouteProps>();
  const navigation = useNavigation<NavigationProp>();

  const { place } = route.params as { place: NewsData };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 🔥 IMAGE CARD */}
        <View style={styles.imageCard}>
          <Image
            source={{
              uri: place.image_url,
            }}
            style={styles.image}
          />

          {/* 🔹 Top Icons */}
          <View style={styles.topIcons}>
            <TouchableOpacity style={styles.circleBtn} onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={18} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.circleBtn}>
              <Ionicons name="bookmark-outline" size={18} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* 🔹 Bottom Info Overlay */}
          <View style={styles.overlayCard}>
            <View>
              <Text style={styles.placeTitle}>{place.title}</Text>
              <View style={styles.locationRow}>
                <Ionicons name="trending-up-sharp" size={14} color="#fff" />
                <Text style={styles.locationText}>{place.content}</Text>
              </View>
            </View>

            {/* <View>
              <Text style={styles.priceLabel}>Price</Text>
              <Text style={styles.price}>$230</Text>
            </View> */}
          </View>
        </View>

        {/* 🔥 CONTENT */}
        <View style={styles.content}>
          {/* Tabs */}
          <View style={styles.tabs}>
            <Text style={styles.activeTab}>Overview</Text>
            <Text style={styles.inactiveTab}>Details</Text>
          </View>

          {/* Info Row */}
          <View style={styles.infoRow}>
            <View style={styles.infoBox}>
              <Ionicons name="time-outline" size={14} />
              <Text style={styles.infoText}>{formatDate(place.pubDate)}</Text>
            </View>

            <View style={styles.infoBox}>
              <Image
                source={{
                  uri: `https://www.google.com/s2/favicons?sz=64&domain=${new URL(
                    place.source_url,
                  )}`,
                }}
                style={styles.sourceIcon}
              />

              <TouchableOpacity
                onPress={() => Linking.openURL(place.source_url)}
          >
                <Text style={styles.infoText}>{place.source_name}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Description */}
          <Text style={styles.description}>{place.description}</Text>
        </View>
      </ScrollView>

      {/* 🔥 FIXED BUTTON */}
      <TouchableOpacity style={styles.bookBtn}  onPress={() => Linking.openURL(place.link)}>
        <Text style={styles.bookText}>Read More</Text>
        <Ionicons name="paper-plane-outline" size={18} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },

  imageCard: {
    margin: 10,
    borderRadius: 24,
    overflow: 'hidden',
  },

  image: {
    width: '100%',
    height: 320,
  },

  topIcons: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  circleBtn: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 10,
    borderRadius: 30,
  },

  overlayCard: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 16,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  placeTitle: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },

  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },

  locationText: {
    color: '#fff',
    marginLeft: 4,
    fontSize: 10,
  },

  priceLabel: {
    color: '#ccc',
    fontSize: 12,
  },

  price: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },

  content: {
    paddingHorizontal: 16,
  },

  tabs: {
    flexDirection: 'row',
    marginTop: 10,
  },

  activeTab: {
    fontSize: 16,
    fontWeight: '700',
    marginRight: 20,
  },

  inactiveTab: {
    fontSize: 16,
    color: '#888',
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },

  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eaeaea',
    padding: 10,
    borderRadius: 10,
  },

  infoText: {
    marginLeft: 6,
  },

  description: {
    marginTop: 20,
    lineHeight: 22,
    color: '#666',
  },
  sourceIcon: {
    width: 18,
    height: 18,
    marginRight: 6,
    borderRadius: 4,
  },
  bookBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3983fc',
    margin: 16,
    padding: 16,
    borderRadius: 16,
  },

  bookText: {
    color: '#fff',
    fontWeight: '600',
    marginRight: 8,
  },
});

export default TravelDetailsScreen;

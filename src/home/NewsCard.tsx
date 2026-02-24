// components/PlaceCard.tsx
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useNavigation } from '@react-navigation/native';
import { NewsData } from './place';

interface Props {
  place: NewsData;
}

const NewsCard = ({ place }: Props) => {
  const [isFav, setIsFav] = useState(false);
  const navigation = useNavigation();

  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Details',{ place: place })}
      >
        <Image source={{ uri: place.image_url }} style={styles.cardImage} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.heartIcon}
        onPress={() => setIsFav(!isFav)}
        activeOpacity={0.8}
      >
        <Ionicons
          name={isFav ? 'heart' : 'heart-outline'}
          size={20}
          color={isFav ? '#FF4D4F' : '#fff'}
        />
      </TouchableOpacity>

      <View style={styles.cardOverlay}>
        <Text style={styles.placeTitle}>{place.title}</Text>

        <View style={styles.row}>
          <Ionicons name="calendar-outline" size={14} color="#fff" />
          <Text style={styles.placeCountry}>{place.pubDate}</Text>
        </View>

        {/* <View style={styles.row}>
          <Ionicons name="star" size={14} color="#FFD700" />
          <Text style={styles.rating}>{place.}</Text>
        </View> */}
      </View>
    </View>
  );
};

export default NewsCard;

const styles = StyleSheet.create({
  card: {
    width: 200,
    height: 230,
    borderRadius: 20,
    marginRight: 15,
    overflow: 'hidden',
  },
  cardImage: { width: '100%', height: '100%' },
  heartIcon: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 6,
    borderRadius: 20,
  },
  cardOverlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 15,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  placeTitle: { color: '#fff', fontSize: 14, fontWeight: '700' },
  placeCountry: { color: '#ddd', fontSize: 12, marginLeft: 4 },
  rating: { color: '#fff', marginLeft: 4, fontSize: 12 },
  row: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
});

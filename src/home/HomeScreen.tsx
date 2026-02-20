import React, { useEffect, useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  ListRenderItem,
  ActivityIndicator,
} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';

import { Place } from './place';
import PlaceCard from './NewsCard';
import { getNews } from '../api/searvices';
import Toast from 'react-native-toast-message';

const categories = ['business', 'sports', 'technology', 'health'];
const countries = ['in', 'us'];

//API DOC https://newsdata.io/documentation#react

const HomeScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('business');
  const [selectedCountry, setSelectedCountry] = useState('in');
  const [search, setSearch] = useState('');

  const [loading, setLoading] = useState(false);
  const [news, setNews] = useState<Place[]>([]);
  const [indiaNews, setIndiaNews] = useState<Place[]>([]);

  const fetchNews = async () => {
    try {
      setLoading(true);

      const [usData, indiaData] = await Promise.all([
        getNews('us', selectedCategory),
        getNews('in', selectedCategory),
      ]);

      setNews(usData.results || []);
      setIndiaNews(indiaData.results || []);
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, selectedCountry]);

  // 🔥 Search filter
  const filteredNews = useMemo(() => {
    return news.filter(item =>
      item.title?.toLowerCase().includes(search.toLowerCase()),
    );
  }, [news, search]);

  const renderCategory = React.useCallback(
    ({ item }: { item: string }) => {
      const isActive = item === selectedCategory;

      return (
        <TouchableOpacity
          onPress={() => setSelectedCategory(item)}
          style={[styles.categoryBtn, isActive && styles.activeCategory]}
        >
          <Text style={[styles.categoryText, isActive && styles.activeText]}>
            {item.toUpperCase()}
          </Text>
        </TouchableOpacity>
      );
    },
    [selectedCategory],
  );

  const renderPlace: ListRenderItem<Place> = ({ item }) => (
    <PlaceCard place={item} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={[{ key: 'main' }]}
        keyExtractor={item => item.key}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
        ListHeaderComponent={
          <>
            {/* HEADER */}
            <View style={styles.header}>
              <View>
                <Text style={styles.greeting}>Hi, David 👋</Text>
                <Text style={styles.subText}>Explore the world</Text>
              </View>
              <Image
                source={{
                  uri: 'https://randomuser.me/api/portraits/men/32.jpg',
                }}
                style={styles.avatar}
              />
            </View>

            {/* SEARCH */}
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

            {/* CATEGORY LIST */}
            <FlatList
              data={categories}
              horizontal
              keyExtractor={item => item}
              renderItem={renderCategory}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingVertical: 10, marginTop: 20 }}
            />

            {/* US NEWS */}
            <View style={styles.sectionHeader}>
              <Text style={styles.countrieTitle}>US NEWS</Text>
              <Text style={styles.subText}>View All</Text>
            </View>

            {loading ? (
              <ActivityIndicator size="small" />
            ) : (
              <FlatList
                data={filteredNews}
                horizontal
                keyExtractor={item => item.article_id}
                renderItem={renderPlace}
                showsHorizontalScrollIndicator={false}
              />
            )}

            {/* INDIA NEWS */}
            <View style={styles.sectionHeader}>
               <Text style={styles.countrieTitle}>INDIA NEWS</Text>
              <Text style={styles.subText}>View All</Text>
            </View>
          

            <FlatList
              data={indiaNews}
              horizontal
              keyExtractor={item => item.article_id}
              renderItem={renderPlace}
              showsHorizontalScrollIndicator={false}
            />
          </>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F8F9FB',
    paddingHorizontal: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 10,
  },
  greeting: { fontSize: 22, fontWeight: '700' },
  subText: { color: '#777', marginTop: 4 },
  avatar: { width: 45, height: 45, borderRadius: 25 },

  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginTop: 20,
    elevation: 2,
  },
  searchInput: { flex: 1, paddingVertical: 10, marginHorizontal: 8 },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  sectionTitle: { fontSize: 18, fontWeight: '600' },
  countrieTitle: { fontSize: 18, fontWeight: '600', marginVertical: 30 },

  viewAll: { color: '#4A80F0', fontWeight: '500' },

  categoryBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#eee',
    borderRadius: 20,
    marginRight: 10,
    alignSelf: 'flex-start',
  },

  activeCategory: {
    alignSelf: 'flex-start',
    backgroundColor: '#5b76fb',
  },
  categoryText: { color: '#555' },
  activeText: { color: '#fff' },
});

export default HomeScreen;

import React, { useEffect, useMemo, useState, useCallback } from 'react';
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
import Toast from 'react-native-toast-message';

import { Place } from './place';
import PlaceCard from './NewsCard';
import { getNews } from '../api/searvices';

const categories = ['business', 'sports', 'technology', 'health'];

const HomeScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('business');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  const [usNews, setUsNews] = useState<Place[]>([]);
  const [indiaNews, setIndiaNews] = useState<Place[]>([]);

  //  Memoized API call
  const fetchNews = useCallback(async () => {
    try {
      setLoading(true);

      const [usData, indiaData] = await Promise.all([
        getNews('us', selectedCategory),
        getNews('in', selectedCategory),
      ]);

      setUsNews(usData?.results ?? []);
      setIndiaNews(indiaData?.results ?? []);
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error?.message ?? 'Something went wrong',
      });
    } finally {
      setLoading(false);
    }
  }, [selectedCategory]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  //  Search filter for both lists
  const filteredUSNews = useMemo(() => {
    return usNews.filter(item =>
      item.title?.toLowerCase().includes(search.toLowerCase()),
    );
  }, [usNews, search]);

  const filteredIndiaNews = useMemo(() => {
    return indiaNews.filter(item =>
      item.title?.toLowerCase().includes(search.toLowerCase()),
    );
  }, [indiaNews, search]);

  const renderCategory = useCallback(
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
        data={[]}   // No fake data needed
        keyExtractor={(_, index) => index.toString()}
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
                placeholder="Search news"
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
              contentContainerStyle={{ paddingVertical: 15 }}
            />

            {/* US NEWS */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>US NEWS</Text>
              <Text style={styles.viewAll}>View All</Text>
            </View>

            {loading ? (
              <ActivityIndicator size="small" />
            ) : (
              <FlatList
                data={filteredUSNews}
                horizontal
                keyExtractor={item => item.article_id ?? Math.random().toString()}
                renderItem={renderPlace}
                showsHorizontalScrollIndicator={false}
                ListEmptyComponent={<Text>No news found</Text>}
              />
            )}

            {/* INDIA NEWS */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>INDIA NEWS</Text>
              <Text style={styles.viewAll}>View All</Text>
            </View>

            <FlatList
              data={filteredIndiaNews}
              horizontal
              keyExtractor={item => item.article_id ?? Math.random().toString()}
              renderItem={renderPlace}
              showsHorizontalScrollIndicator={false}
              ListEmptyComponent={<Text>No news found</Text>}
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

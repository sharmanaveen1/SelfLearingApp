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

import { NewsData } from './NewsData';
import { getNews } from '../api/searvices';
import { useNavigation } from '@react-navigation/native';
import NewsCard from './NewsCard';
import { Colors, Strings, typography } from '../theme';

const categories = [
  Strings.category.business,
  Strings.category.sports,
  Strings.category.technology,
  Strings.category.health,
];

const HomeScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState(Strings.category.business.toLowerCase());
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  const [usNews, setUsNews] = useState<NewsData[]>([]);
  const [indiaNews, setIndiaNews] = useState<NewsData[]>([]);
  const navigation = useNavigation();

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
        text1: Strings.common.error,
        text2: error?.message ?? Strings.errors.somethingWentWrong,
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
      const isActive = item.toLowerCase() === selectedCategory;

      return (
        <TouchableOpacity
          onPress={() => setSelectedCategory(item.toLowerCase())}
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

  const renderNews: ListRenderItem<NewsData> = ({ item }) => (
    <NewsCard place={item} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={[]}
        keyExtractor={(_, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
        ListHeaderComponent={
          <>
            {/* HEADER */}
            <View style={styles.header}>
              <View>
                <Text style={styles.greeting}>{Strings.home.greeting}</Text>
                <Text style={styles.subText}>{Strings.home.exploreWorld}</Text>
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
              <Ionicons name="search" size={20} color={Colors.textHint} />
              <TextInput
                placeholder={Strings.home.searchNews}
                placeholderTextColor={Colors.textHint}
                value={search}
                onChangeText={setSearch}
                style={styles.searchInput}
              />
              <Ionicons name="options-outline" size={20} color={Colors.textHint} />
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
              <Text style={styles.sectionTitle}>{Strings.home.usNews}</Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ViewAll', {
                    news: usNews,
                    title: Strings.home.usNews,
                  })
                }
              >
                <Text style={styles.viewAll}>{Strings.home.viewAll}</Text>
              </TouchableOpacity>
            </View>

            {loading ? (
              <ActivityIndicator size="small" color={Colors.primary} />
            ) : (
              <FlatList
                data={filteredUSNews}
                horizontal
                keyExtractor={item =>
                  item.article_id ?? Math.random().toString()
                }
                renderItem={renderNews}
                showsHorizontalScrollIndicator={false}
                ListEmptyComponent={<Text>{Strings.home.searchNews}</Text>}
              />
            )}

            {/* INDIA NEWS */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{Strings.home.indiaNews}</Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ViewAll', {
                    news: indiaNews,
                    title: Strings.home.indiaNews,
                  })
                }
              >
                <Text style={styles.viewAll}>{Strings.home.viewAll}</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              data={filteredIndiaNews}
              horizontal
              keyExtractor={item => item.article_id ?? Math.random().toString()}
              renderItem={renderNews}
              showsHorizontalScrollIndicator={false}
              ListEmptyComponent={<Text>{Strings.common.noNewsFound}</Text>}
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
    backgroundColor: Colors.background,
    paddingHorizontal: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 10,
  },
  greeting: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: Colors.textPrimary,
  },
  subText: {
    color: Colors.textTertiary,
    marginTop: 4,
    fontSize: typography.fontSize.base,
  },
  avatar: { width: 45, height: 45, borderRadius: 25 },

  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    paddingHorizontal: 15,
    marginTop: 20,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 8,
    color: Colors.textPrimary,
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    marginVertical: 20,
    color: Colors.textPrimary,
  },

  viewAll: {
    color: Colors.link,
    fontWeight: typography.fontWeight.medium,
  },

  categoryBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: Colors.border,
    borderRadius: 20,
    marginRight: 10,
    alignSelf: 'flex-start',
  },

  activeCategory: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.primary,
  },
  categoryText: {
    color: Colors.textSecondary,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
  },
  activeText: {
    color: Colors.white,
  },
});

export default HomeScreen;
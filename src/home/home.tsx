import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  const categories = ['All', 'Sports', 'Tech', 'Finance'];

  const filteredNews: ArrayLike<any> | null | undefined = []; // your US news
  const indiaNews = []; // your India news

  // ----------------------------
  // Category Item
  // ----------------------------
  const renderCategory = useCallback(
    ({ item }) => {
      const isActive = item === selectedCategory;

      return (
        <TouchableOpacity
          onPress={() => setSelectedCategory(item)}
          style={[
            styles.categoryBtn,
            isActive && styles.activeCategory,
          ]}
        >
          <Text
            style={[
              styles.categoryText,
              isActive && styles.activeText,
            ]}
          >
            {item}
          </Text>
        </TouchableOpacity>
      );
    },
    [selectedCategory]
  );

  // ----------------------------
  // News Card
  // ----------------------------
  const renderNewsCard = ({ item }) => {
    return (
      <View style={styles.card}>
        <Image
          source={{ uri: item.image_url }}
          style={styles.cardImage}
        />
        <Text style={styles.cardTitle} numberOfLines={2}>
          {item.title}
        </Text>
      </View>
    );
  };

  // ----------------------------
  // Main Vertical List Header
  // ----------------------------
  const ListHeader = () => (
    <>
      {/* Header */}
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

      {/* Search */}
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

      {/* Categories */}
      <FlatList
        data={categories}
        horizontal
        keyExtractor={(item) => item}
        renderItem={renderCategory}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 10 }}
      />

      {/* US NEWS */}
      <Text style={styles.sectionTitle}>US NEWS</Text>

      {loading ? (
        <ActivityIndicator size="small" />
      ) : (
        <FlatList
          data={filteredNews}
          horizontal
          keyExtractor={(item) => item.article_id}
          renderItem={renderNewsCard}
          showsHorizontalScrollIndicator={false}
        />
      )}

      {/* INDIA NEWS */}
      <Text style={styles.sectionTitle}>INDIA NEWS</Text>

      <FlatList
        data={indiaNews}
        horizontal
        keyExtractor={(item) => item.article_id}
        renderItem={renderNewsCard}
        showsHorizontalScrollIndicator={false}
      />
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={[{ key: 'main' }]}
        keyExtractor={(item) => item.key}
        ListHeaderComponent={ListHeader}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;


// =============================
// Styles
// =============================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
  },

  greeting: {
    fontSize: 18,
    fontWeight: '600',
  },

  subText: {
    color: '#777',
  },

  avatar: {
    width: 45,
    height: 45,
    borderRadius: 22,
  },

  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 10,
  },

  searchInput: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 8,
  },

  categoryBtn: {
    height: 36,
    paddingHorizontal: 16,
    backgroundColor: '#eee',
    borderRadius: 18,
    marginRight: 10,
    justifyContent: 'center',
  },

  activeCategory: {
    backgroundColor: '#000',
  },

  categoryText: {
    fontSize: 14,
  },

  activeText: {
    color: '#fff',
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 10,
  },

  card: {
    width: 200,
    marginRight: 12,
  },

  cardImage: {
    width: '100%',
    height: 140,
    borderRadius: 12,
  },

  cardTitle: {
    marginTop: 6,
    fontWeight: '500',
  },
});

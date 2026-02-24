import React, { useCallback } from 'react';
import {
  View,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  ListRenderItem,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList } from '../../App';
import { NewsData } from './place';
import Ionicons from '@react-native-vector-icons/ionicons';

type ViewAllRouteProp = RouteProp<RootStackParamList, 'ViewAll'>;

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'ViewAll'>;

export default function ViewAllScreen() {
  const route = useRoute<ViewAllRouteProp>();
  const navigation = useNavigation<NavigationProp>();

  const { news, title } = route.params;

  // ✅ Memoized renderItem
  const renderItem: ListRenderItem<NewsData> = useCallback(
    ({ item }) => (
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => navigation.navigate('Details', { place: item })}
        style={styles.card}
      >
        <Image
          source={{ uri: item.image_url }}
          style={styles.image}
          resizeMode="cover"
        />

        <View style={styles.contentRow}>
          <View style={styles.textContainer}>
            <Text style={styles.title} numberOfLines={2}>
              {item.title}
            </Text>

            <Text style={styles.source} numberOfLines={1}>
              {item.source_id}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    ),
    [navigation],
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Screen Title */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>{title}</Text>

        <View style={{ width: 50 }} />
      </View>
      <FlatList
        data={news}
        keyExtractor={item => item.article_id ?? item.link}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No news available</Text>
        }
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        windowSize={5}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
  },

  backText: {
    fontSize: 16,
    color: '#4A80F0',
    fontWeight: '600',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#F8F9FB',
  },

  screenTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginVertical: 16,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  image: {
    height: 200,
    width: '100%',
  },

  contentRow: {
    padding: 12,
  },

  textContainer: {
    flex: 1,
  },

  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222',
  },

  source: {
    marginTop: 6,
    fontSize: 13,
    color: '#777',
  },

  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    color: '#999',
    fontSize: 16,
  },
});

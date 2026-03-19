import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

// Standard TypeScript Props Interface
interface MenuRowProps {
  label: string;
  onPress: () => void;
}

// Defining the component as a regular function instead of React.FC
function MenuRow({ label, onPress }: MenuRowProps) {
  return (
    <TouchableOpacity
      style={styles.menuRow}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.menuText}>{label}</Text>
      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
  );
}
// Static Profile Data
const PROFILE_DATA = {
  name: 'Tyler Mason',
  email: 'tylermason309@gmail.com',
  avatar:
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
  isPublisher: false,
};

const ACCOUNT_SETTINGS = [
  { id: '1', label: 'Personal information' },
  { id: '2', label: 'Notifications' },
  { id: '3', label: 'Time spent' },
  { id: '4', label: 'Following' },
];

const HELP_SUPPORT = [
  { id: '5', label: 'Privacy policy' },
  { id: '6', label: 'Terms & Conditions' },
  { id: '7', label: 'FAQ & Help' },
];

function ProfileScreen() {
  const [avatarUri, setAvatarUri] = useState(PROFILE_DATA.avatar);

  const handleMenuPress = (label: string) => {
    console.log(label);
  };

  const requestCameraPermission = async () => {
    if (Platform.OS !== 'android') return true;

    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Camera Permission',
        message: 'We need access to your camera to take a profile picture',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  };

  const requestGalleryPermission = async () => {
    if (Platform.OS !== 'android') return true;

    const permission =
      Platform.Version >= 33
        ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
        : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

    const granted = await PermissionsAndroid.request(permission, {
      title: 'Storage Permission',
      message: 'We need access to your photos to choose a profile picture',
      buttonNeutral: 'Ask Me Later',
      buttonNegative: 'Cancel',
      buttonPositive: 'OK',
    });

    return granted === PermissionsAndroid.RESULTS.GRANTED;
  };

  const onSelectPhoto = async () => {
    Alert.alert('Update profile photo', 'Choose source', [
      {
        text: 'Camera',
        onPress: async () => {
          const hasPermission = await requestCameraPermission();
          if (!hasPermission) return;

          const result = await launchCamera({
            mediaType: 'photo',
            cameraType: 'back',
            saveToPhotos: true,
          });

          if (result.assets?.[0]?.uri) {
            setAvatarUri(result.assets[0].uri);
          }
        },
      },
      {
        text: 'Gallery',
        onPress: async () => {
          const hasPermission = await requestGalleryPermission();
          if (!hasPermission) return;

          const result = await launchImageLibrary({
            mediaType: 'photo',
          });

          if (result.assets?.[0]?.uri) {
            setAvatarUri(result.assets[0].uri);
          }
        },
      },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Profile Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>

          <View style={styles.avatarWrapper}>
            <Image source={{ uri: avatarUri }} style={styles.avatar} />
            <TouchableOpacity style={styles.editIconContainer} onPress={onSelectPhoto}>
              <Text style={styles.editIcon}>✎</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.userName}>{PROFILE_DATA.name}</Text>
          <Text style={styles.userEmail}>{PROFILE_DATA.email}</Text>

          {!PROFILE_DATA.isPublisher && (
            <TouchableOpacity>
              <Text style={styles.publisherAction}>Become a publisher</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Account Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Account settings</Text>
          {ACCOUNT_SETTINGS.map(item => (
            <MenuRow
              key={item.id}
              label={item.label}
              onPress={() => handleMenuPress(item.label)}
            />
          ))}
        </View>

        {/* Help & Support */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Help & Support</Text>
          {HELP_SUPPORT.map(item => (
            <MenuRow
              key={item.id}
              label={item.label}
              onPress={() => handleMenuPress(item.label)}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.logoutContainer}>
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

export default ProfileScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginBottom: 20,
    color: '#1a1a1a',
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 12,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#e3f2fd',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  editIcon: {
    color: '#2196f3',
    fontSize: 14,
  },
  userName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#222',
  },
  userEmail: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
  publisherAction: {
    fontSize: 16,
    color: '#4db6e1',
    fontWeight: '600',
    marginTop: 10,
  },
  section: {
    marginTop: 25,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    fontSize: 15,
    fontWeight: '600',
    color: '#9E9E9E',
    marginBottom: 12,
  },
  menuRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 5,
  },
  menuText: {
    fontSize: 18,
    color: '#333',
  },
  arrow: {
    fontSize: 25,
    color: '#7a7979',
  },
  greenArrow: {
    color: '#81C784',
  },
  logoutContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  logoutText: {
    fontSize: 16,
    color: '#e53935',
    fontWeight: '700',
  },
});

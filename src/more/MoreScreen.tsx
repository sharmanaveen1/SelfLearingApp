import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Colors, typography } from '../theme';

function MoreScreen() {
  const onExample1 = () => {
    Alert.alert('Example 1', 'Button 1 pressed');
  };

  const onExample2 = () => {
    Alert.alert('Example 2', 'Button 2 pressed');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>More</Text>
      <TouchableOpacity style={styles.button} onPress={onExample1}>
        <Text style={styles.buttonText}>Button 1</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onExample2}>
        <Text style={styles.buttonText}>Button 2</Text>
      </TouchableOpacity>
    </View>
  );
}

export default MoreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
  },
  title: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: 18,
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  buttonText: {
    color: Colors.white,
    fontWeight: typography.fontWeight.semibold,
    textAlign: 'center',
  },
});

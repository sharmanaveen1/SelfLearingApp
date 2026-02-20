//import React, { useState } from "react";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import CustomButton from '../views/CustomButton';

import { View, Text, TextInput, StyleSheet, StatusBar } from 'react-native';

const LoginScreen = () => {
  //const [phone, setPhone] = useState("");

  const onContinue = () => {
    // console.log("Phone number:", phone);
  };

  return (
    <SafeAreaProvider style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#D41473" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoStar}>★</Text>
        </View>

        <Text style={styles.title}>SIGN IN OR JOIN NOW</Text>
      </View>

      {/* Form Section */}
      <View style={styles.formContainer}>
        <Text style={styles.label}>ENTER YOUR PHONE NUMBER</Text>
        <Text style={styles.helperText}>
          we’ll send you a code and nothing else
        </Text>

        <TextInput
          style={styles.input}
          placeholder="phone number"
          placeholderTextColor="#999"
          keyboardType="phone-pad"
          // value={phone}
          //onChangeText={setPhone}
        />

        <CustomButton
          style={styles.button}
          title="Continue"
          onPress={onContinue}
        />

        <Text style={styles.termsText}>
          by signing in you agree to our{' '}
          <Text style={styles.link}>privacy policy</Text> and{' '}
          <Text style={styles.link}>terms of use</Text>
        </Text>
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    backgroundColor: '#5b76fb',
    paddingTop: 100,
    paddingBottom: 50,
    alignItems: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  logoCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#5b76fb',
    paddingVertical: 16,
    borderRadius: 28,
    alignItems: 'center',
    marginBottom: 20,
  },
  logoStar: {
    fontSize: 26,
    color: '#D41473',
  },
  title: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 1,
  },
  subtitle: {
    color: '#FFE3F1',
    fontSize: 14,
    marginTop: 6,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.5,
    color: '#111',
  },
  helperText: {
    fontSize: 13,
    color: '#555',
    marginTop: 4,
    marginBottom: 18,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    marginBottom: 24,
  },

  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
    textTransform: 'lowercase',
  },
  termsText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#666',
    lineHeight: 18,
  },
  link: {
    textDecorationLine: 'underline',
    color: '#333',
  },
});

export default LoginScreen;

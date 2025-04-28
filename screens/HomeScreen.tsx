// HomeScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, TextInput, Button, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
  const navigation = useNavigation();

  const [fullName, setFullName] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [address, setAddress] = useState('');
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const name = await AsyncStorage.getItem('fullName');
      const contact = await AsyncStorage.getItem('contactNo');
      const addr = await AsyncStorage.getItem('address');
      if (name) setFullName(name);
      if (contact) setContactNo(contact);
      if (addr) setAddress(addr);
    } catch (error) {
      console.log('Error loading profile:', error);
    }
  };

  const handleSaveProfile = async () => {
    try {
      await AsyncStorage.setItem('fullName', fullName);
      await AsyncStorage.setItem('contactNo', contactNo);
      await AsyncStorage.setItem('address', address);
      Alert.alert('Success', 'Profile saved successfully!');
      setShowProfile(false);
    } catch (error) {
      console.log('Error saving profile:', error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>🌐 AgroVerse</Text>
        <Text style={styles.subtitle}>Explore the World of Agriculture and Gardening</Text>

        {/* Profile Button */}
        <TouchableOpacity style={styles.profileButton} onPress={() => setShowProfile(!showProfile)}>
          <Icon name="user" size={30} color="#fff" />
        </TouchableOpacity>

        {/* Profile Section */}
        {showProfile && (
          <View style={styles.profileSection}>
            <Text style={styles.sectionTitle}>👤 Profile</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Full Name:</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Full Name"
                value={fullName}
                onChangeText={setFullName}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Contact No:</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Contact No"
                value={contactNo}
                onChangeText={setContactNo}
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Address:</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Address"
                value={address}
                onChangeText={setAddress}
                multiline
                numberOfLines={3}
              />
            </View>

            <Button title="Save Profile" onPress={handleSaveProfile} />
          </View>
        )}

        {/* Features Section */}
        <View style={styles.featuresContainer}>
          <View style={styles.featureRow}>
            <TouchableOpacity style={styles.featureButton} onPress={() => navigation.navigate('KrishiMitra')}>
              <Image source={require('../assets/Images/PowerWeeder/bc230.jpg')} style={styles.featureImage} />
              <Text style={styles.buttonText}>🌾 KrishiMitra</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.featureButton} onPress={() => navigation.navigate('AgroMart')}>
              <Image source={require('../assets/Images/PowerWeeder/bc230.jpg')} style={styles.featureImage} />
              <Text style={styles.buttonText}>🛒 AgroMart</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.featureRow}>
            <TouchableOpacity style={styles.featureButton} onPress={() => navigation.navigate('AgroRent')}>
              <Image source={require('../assets/Images/PowerWeeder/bc230.jpg')} style={styles.featureImage} />
              <Text style={styles.buttonText}>🚜 AgroRent</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.featureButton} onPress={() => navigation.navigate('AgriKart')}>
              <Image source={require('../assets/Images/PowerWeeder/bc230.jpg')} style={styles.featureImage} />
              <Text style={styles.buttonText}>🛍️ AgriKart</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.featureRow}>
            <TouchableOpacity style={styles.featureButton} onPress={() => navigation.navigate('ChatBot')}>
              <Icon name="comments" size={30} color="#fff" />
              <Text style={styles.buttonText}>🤖 ChatBot</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.featureButton} onPress={() => navigation.navigate('VideoTutorials')}>
              <Icon name="video-camera" size={30} color="#fff" />
              <Text style={styles.buttonText}>🎥 Tutorials</Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: '#e8f5e9',
    flexGrow: 1,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#33691e',
    textAlign: 'center',
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 18,
    color: '#558b2f',
    marginBottom: 20,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  profileButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: '#33691e',
    padding: 10,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  profileSection: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 20,
    borderRadius: 10,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 8,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#33691e',
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
  },
  featuresContainer: {
    marginTop: 20,
  },
  featureRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  featureButton: {
    backgroundColor: '#74b816',
    width: '48%',
    aspectRatio: 1,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 8,
  },
  featureImage: {
    width: 50,
    height: 50,
    marginBottom: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import axios from 'axios';
import { Alert } from 'react-native';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { FontAwesome5, Ionicons, MaterialIcons, Entypo } from '@expo/vector-icons';

export default function KrishiMitra() {
  const [crop, setCrop] = useState('');
  const [soil, setSoil] = useState('');
  const [weather, setWeather] = useState('');
  const [location, setLocation] = useState(null);

  // Requesting location permission and fetching location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is required for weather updates.');
        return;
      }
      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
    })();
  }, []);

  // Fetching weather data after location is available
  useEffect(() => {
    if (location) {
      const { latitude, longitude } = location.coords;
      const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API Key

      const fetchWeather = async () => {
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
          );
          setWeather(`Current Temperature: ${response.data.main.temp}°C`);
        } catch (error) {
          Alert.alert('Weather Error', 'Unable to fetch weather data.');
        }
      };

      fetchWeather();
    }
  }, [location]); // Runs when location is updated

  const handleGetRecommendations = () => {
    // Replace with API call to get crop advisory based on crop, soil, and weather inputs
    Alert.alert('Recommendation', 'AI-based crop advisory will be shown here.');
  };

  const handleUploadImage = () => {
    // Integrate image picker and detection model here
    Alert.alert('Upload', 'Image picker for pest/disease detection will be added.');
  };

  const handleViewPrices = () => {
    // Integrate crop price trend API here
    Alert.alert('Prices', 'Live crop prices will be displayed.');
  };

  const handleTranslate = () => {
    // Google Translate API integration here
    Alert.alert('Translate', 'Multi-language support will be here.');
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>🌾 KrishiMitra – Your Smart Farming Companion</Text>

        {/* AI Crop Advisory */}
        <FeatureCard title="🌱 AI Crop Advisory" icon={<FontAwesome5 name="seedling" size={20} color="#33691e" />}>
          <TextInput value={crop} onChangeText={setCrop} placeholder="Enter Crop Type" style={styles.input} />
          <TextInput value={soil} onChangeText={setSoil} placeholder="Enter Soil Type" style={styles.input} />
          <TextInput value={weather} onChangeText={setWeather} placeholder="Current Weather" style={styles.input} />
          <PrimaryButton text="Get Recommendations" onPress={handleGetRecommendations} />
        </FeatureCard>

        {/* Pest/Disease Detection */}
        <FeatureCard title="🪲 Pest/Disease Detection" icon={<MaterialIcons name="bug-report" size={22} color="#d32f2f" />}>
          <PrimaryButton text="Upload Plant Image" onPress={handleUploadImage} />
        </FeatureCard>

        {/* Seasonal Calendar */}
        <FeatureCard title="📅 Seasonal Crop Calendar" icon={<Ionicons name="calendar" size={20} color="#33691e" />}>
          <Text style={styles.description}>Sowing/harvesting tips based on season and region.</Text>
        </FeatureCard>

        {/* Weather */}
        <FeatureCard title="🌦️ Live Weather Updates" icon={<Ionicons name="cloud-outline" size={22} color="#039be5" />}>
          <Text style={styles.description}>Location-based real-time weather info.</Text>
          <PrimaryButton text="Check Weather" onPress={() => Alert.alert('Weather', 'Weather checked manually.')} />
          {weather && <Text style={styles.weather}>{weather}</Text>}
        </FeatureCard>

        {/* Prices */}
        <FeatureCard title="💹 Crop Price Trends" icon={<MaterialIcons name="trending-up" size={22} color="#2e7d32" />}>
          <Text style={styles.description}>See real-time mandi prices and trends.</Text>
          <PrimaryButton text="View Prices" onPress={handleViewPrices} />
        </FeatureCard>

        {/* Agri News */}
        <FeatureCard title="📰 Agri News Feed" icon={<Entypo name="news" size={20} color="#6d4c41" />}>
          <PrimaryButton text="Read Latest News" onPress={() => Alert.alert('News', 'Agri news coming soon.')} />
        </FeatureCard>

        {/* Chatbot */}
        <FeatureCard title="🤖 Chatbot Advisor" icon={<Ionicons name="chatbubbles" size={20} color="#5e35b1" />}>
          <PrimaryButton text="Talk to Chatbot" onPress={() => Alert.alert('Chatbot', 'AI chatbot in development.')} />
        </FeatureCard>

        {/* Voice Tips */}
        <FeatureCard title="🔊 Voice-Based Tips" icon={<Ionicons name="mic-outline" size={20} color="#00897b" />}>
          <PrimaryButton text="Play Advice" onPress={() => Alert.alert('Voice', 'Voice tips will play.')} />
        </FeatureCard>

        {/* Language Support */}
        <FeatureCard title="🌐 Language Support" icon={<Ionicons name="language" size={20} color="#3949ab" />}>
          <PrimaryButton text="Translate Content" onPress={handleTranslate} />
        </FeatureCard>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const FeatureCard = ({ title, icon, children }) => (
  <View style={styles.card}>
    <View style={styles.header}>
      {icon}
      <Text style={styles.cardTitle}>  {title}</Text>
    </View>
    {children}
  </View>
);

const PrimaryButton = ({ text, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f1f8e9',
    paddingBottom: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#33691e',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#558b2f',
  },
  input: {
    backgroundColor: '#eef8e9',
    padding: 10,
    marginVertical: 8,
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#7cb342',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  description: {
    color: '#555',
    fontSize: 14,
    marginBottom: 8,
  },
  weather: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
    color: '#039be5',
  },
});

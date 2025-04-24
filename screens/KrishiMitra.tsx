import { View, Text, StyleSheet, TextInput, Button, ScrollView, TouchableOpacity } from 'react-native';

export default function KrishiMitra() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🌾 KrishiMitra – Your Smart Farming Companion</Text>

      <View style={styles.section}>
        <Text style={styles.subtitle}>🌱 AI Crop Advisory</Text>
        <TextInput placeholder="Enter Crop Type" style={styles.input} />
        <TextInput placeholder="Enter Soil Type" style={styles.input} />
        <TextInput placeholder="Current Weather Conditions" style={styles.input} />
        <Button title="Get Recommendations" onPress={() => {}} />
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>🪲 Pest/Disease Detection</Text>
        <Button title="Upload Plant Image" onPress={() => {}} />
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>📅 Seasonal Crop Calendar</Text>
        <Text>Reminders, best sowing and harvesting times.</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>🌦️ Live Weather Updates</Text>
        <Text>Get real-time weather based on your location.</Text>
        <Button title="Check Weather" onPress={() => {}} />
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>💹 Crop Price Trends</Text>
        <Text>See current market rates of various crops.</Text>
        <Button title="View Prices" onPress={() => {}} />
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>📰 Agri News Feed</Text>
        <Text>Stay updated with the latest in agriculture.</Text>
        <Button title="Read News" onPress={() => {}} />
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>🤖 Chatbot Advisor</Text>
        <Button title="Talk to Chatbot" onPress={() => {}} />
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>🔊 Voice-Based Tips</Text>
        <Button title="Play Advice" onPress={() => {}} />
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>🌐 Language Support</Text>
        <Button title="Translate Content" onPress={() => {}} />
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f1f8e9',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#33691e',
    textAlign: 'center',
  },
  section: {
    marginTop: 25,
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#558b2f',
  },
  input: {
    backgroundColor: '#eef8e9',
    padding: 10,
    marginVertical: 8,
    borderRadius: 8,
  },
});

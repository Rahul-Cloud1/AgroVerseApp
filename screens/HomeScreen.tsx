import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🌐 AgroVerse</Text>
      <Text style={styles.subtitle}>Explore the World of Agriculture and Gardening</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('KrishiMitra')}>
        <Icon name="leaf" size={20} color="#fff" />
        <Text style={styles.buttonText}>🌾 KrishiMitra</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AgroMart')}>
        <Icon name="shopping-cart" size={20} color="#fff" />
        <Text style={styles.buttonText}>🛒 AgroMart</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AgroRent')}>
        <Icon name="tractor" size={20} color="#fff" />
        <Text style={styles.buttonText}>🚜 AgroRent</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AgriKart')}>
        <Icon name="shopping-basket" size={20} color="#fff" />
        <Text style={styles.buttonText}>🛍️ AgriKart</Text>
      </TouchableOpacity>

      {/* NEW FEATURES SECTION */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Gallery')}>
        <Icon name="image" size={20} color="#fff" />
        <Text style={styles.buttonText}>📸 Photo Gallery</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('VideoTutorials')}>
        <Icon name="video-camera" size={20} color="#fff" />
        <Text style={styles.buttonText}>🎥 Video Tutorials</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ChatBot')}>
        <Icon name="comments" size={20} color="#fff" />
        <Text style={styles.buttonText}>🤖 ChatBot Assistant</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: '#e8f5e9',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#33691e',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#558b2f',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#74b816',
    paddingVertical: 15,
    width: '100%',
    alignItems: 'center',
    borderRadius: 12,
    marginVertical: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 10,
    fontWeight: '600',
  },
});

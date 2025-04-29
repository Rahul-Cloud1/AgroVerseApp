import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';

const EQUIPMENT_LIST = [
  { 
    id: '1', 
    name: 'Stihl Bc 230', 
    price: 500, 
    image: require('../assets/Images/PowerWeeder/bc230.jpg'), 
    category: 'Tractors',
    description: 'High-performance power weeder ideal for small and medium farms.',
    moreImages: [
      require('../assets/Images/PowerWeeder/bc230.jpg'),
      require('../assets/Images/PowerWeeder/bc230.jpg'),
    ],
    videos: ['https://www.example.com/video1.mp4'],
  },
  { 
    id: '2', 
    name: 'Cub Cadet 750', 
    price: 600, 
    image: require('../assets/Images/PowerWeeder/ft750.png'), 
    category: 'Weeders', 
    description: 'Reliable and efficient weeder for tough soil conditions.',
    moreImages: [
      require('../assets/Images/PowerWeeder/ft750.png'),
      require('../assets/Images/PowerWeeder/ft750.png'),
    ],
    videos: ['https://www.example.com/video1.mp4'],
  },
  { 
    id: '3', 
    name: 'Stihl Mh 710', 
    price: 700, 
    image: require('../assets/Images/PowerWeeder/mh710.jpg'), 
    category: 'Mowers',
    description: 'Heavy-duty machine designed for deep tillage and soil preparation.',
    moreImages: [
      require('../assets/Images/PowerWeeder/mh710.jpg'),
      require('../assets/Images/PowerWeeder/mh710.jpg'),
    ],
    videos: ['https://www.example.com/video1.mp4'],
  },
  { 
    id: '4', 
    name: 'Husqvarna 545', 
    price: 750, 
    image: require('../assets/Images/PowerWeeder/tf5451.png'), 
    category: 'Sprayers',
    description: 'Powerful and compact weeder for efficient field operations.',
    moreImages: [
      require('../assets/Images/PowerWeeder/tf5451.png'),
      require('../assets/Images/PowerWeeder/tf5451.png'),
    ],
    videos: ['https://www.example.com/video1.mp4'],
  },
  { 
    id: '5', 
    name: 'Husqvarna 120', 
    price: 800, 
    image: require('../assets/Images/PowerWeeder/tf120.png'), 
    category: 'Tools',
    description: 'Compact and lightweight weeder, perfect for home gardens.',
    moreImages: [
      require('../assets/Images/PowerWeeder/tf120.png'),
      require('../assets/Images/PowerWeeder/tf120.png'),
    ],
    videos: ['https://www.example.com/video1.mp4'],
  },
  { 
    id: '6', 
    name: 'Sharpex 18 inch', 
    price: 300, 
    image: require('../assets/Images/LawnMowers/spx2.jpg'), 
    category: 'Mowers',
    description: 'Durable and efficient 18-inch manual lawn mower.',
    moreImages: [
      require('../assets/Images/LawnMowers/spx2.jpg'),
      require('../assets/Images/LawnMowers/spx2.jpg'),
    ],
    videos: ['https://www.example.com/video1.mp4'],
  },
];

const CATEGORIES = ['All', 'Tractors', 'Weeders', 'Mowers', 'Sprayers', 'Tools'];

export default function AgroRent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isRentingOwn, setIsRentingOwn] = useState(false);

  const [equipmentName, setEquipmentName] = useState('');
  const [equipmentCategory, setEquipmentCategory] = useState('');
  const [equipmentPrice, setEquipmentPrice] = useState('');
  const [equipmentDescription, setEquipmentDescription] = useState('');

  const filterEquipment = () => {
    return EQUIPMENT_LIST.filter(item => {
      const matchesQuery = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      return matchesQuery && matchesCategory;
    });
  };

  const handleBookNow = (name) => {
    Alert.alert('Booked!', `You've booked the ${name}.`);
  };

  const handleRentSubmit = () => {
    if (!equipmentName || !equipmentCategory || !equipmentPrice || !equipmentDescription) {
      Alert.alert('Please fill in all fields');
      return;
    }
    Alert.alert('Success', `Your equipment "${equipmentName}" is now listed!`);
    setEquipmentName('');
    setEquipmentCategory('');
    setEquipmentPrice('');
    setEquipmentDescription('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🚜 AgroRent Equipment Rentals</Text>

      <View style={styles.toggleGroup}>
        <TouchableOpacity
          style={[styles.toggleButton, !isRentingOwn && styles.toggleActive]}
          onPress={() => setIsRentingOwn(false)}>
          <Text style={styles.toggleText}>Book Equipment</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, isRentingOwn && styles.toggleActive]}
          onPress={() => setIsRentingOwn(true)}>
          <Text style={styles.toggleText}>Rent Your Equipment</Text>
        </TouchableOpacity>
      </View>

      {!isRentingOwn ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="Search equipment"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />

          <View style={styles.categories}>
            {CATEGORIES.map(cat => (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.categoryButton,
                  selectedCategory === cat && styles.categoryActive,
                ]}
                onPress={() => setSelectedCategory(cat)}>
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === cat && styles.categoryTextActive,
                  ]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <FlatList
            data={filterEquipment()}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Image source={item.image} style={styles.image} />
                <View style={styles.cardContent}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.price}>{item.price}</Text>
                  <TouchableOpacity
                    style={styles.bookBtn}
                    onPress={() => handleBookNow(item.name)}>
                    <Text style={styles.bookText}>Book Now</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </>
      ) : (
        <View style={styles.form}>
          <Text style={styles.formTitle}>Rent Out Your Equipment</Text>
          <TextInput
            style={styles.input}
            placeholder="Equipment Name"
            value={equipmentName}
            onChangeText={setEquipmentName}
          />
          <TextInput
            style={styles.input}
            placeholder="Category"
            value={equipmentCategory}
            onChangeText={setEquipmentCategory}
          />
          <TextInput
            style={styles.input}
            placeholder="Price per day (₹)"
            value={equipmentPrice}
            onChangeText={setEquipmentPrice}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={equipmentDescription}
            onChangeText={setEquipmentDescription}
          />
          <TouchableOpacity
            style={styles.uploadBtn}
            onPress={() => Alert.alert('Coming Soon', 'Image upload will be added soon.')}>
            <Text style={styles.uploadText}>Upload Image</Text>
          </TouchableOpacity>
          <Button title="Submit Listing" onPress={handleRentSubmit} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f6f8', padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#2e7d32' },

  toggleGroup: { flexDirection: 'row', marginBottom: 20, justifyContent: 'space-between' },
  toggleButton: {
    flex: 1,
    backgroundColor: '#c8e6c9',
    padding: 12,
    marginHorizontal: 5,
    borderRadius: 8,
    alignItems: 'center',
  },
  toggleActive: {
    backgroundColor: '#66bb6a',
  },
  toggleText: { color: '#fff', fontWeight: 'bold' },

  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderColor: '#ddd',
    borderWidth: 1,
  },

  categories: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 20 },
  categoryButton: {
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    margin: 4,
  },
  categoryActive: { backgroundColor: '#66bb6a' },
  categoryText: { color: '#555' },
  categoryTextActive: { color: '#fff', fontWeight: 'bold' },

  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  image: { width: 90, height: 90, borderRadius: 8, marginRight: 12 },
  cardContent: { flex: 1 },
  name: { fontSize: 16, fontWeight: '600' },
  price: { fontSize: 14, color: '#2e7d32', marginVertical: 4 },
  bookBtn: {
    backgroundColor: '#43a047',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  bookText: { color: '#fff', fontWeight: 'bold' },

  form: { backgroundColor: '#fff', padding: 20, borderRadius: 10, marginTop: 10 },
  formTitle: { fontSize: 18, fontWeight: 'bold', color: '#2e7d32', marginBottom: 12 },
  uploadBtn: {
    backgroundColor: '#81c784',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 12,
  },
  uploadText: { color: '#fff', fontWeight: 'bold' },
});

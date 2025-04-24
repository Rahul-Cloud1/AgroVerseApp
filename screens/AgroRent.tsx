import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, FlatList, TouchableOpacity, Image, Alert } from 'react-native';

const EQUIPMENT_LIST = [
  { id: '1', name: 'Tractor', category: 'Tractors', price: '₹1000/day', image: 'https://via.placeholder.com/150' },
  { id: '2', name: 'Power Weeder', category: 'Weeders', price: '₹500/day', image: 'https://via.placeholder.com/150' },
  { id: '3', name: 'Lawn Mower', category: 'Mowers', price: '₹700/day', image: 'https://via.placeholder.com/150' },
  { id: '4', name: 'Sprayer', category: 'Sprayers', price: '₹300/day', image: 'https://via.placeholder.com/150' },
  { id: '5', name: 'Earth Auger', category: 'Tools', price: '₹400/day', image: 'https://via.placeholder.com/150' },
];

export default function AgroRent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredEquipment, setFilteredEquipment] = useState(EQUIPMENT_LIST);
  const [isRentingOwn, setIsRentingOwn] = useState(false);
  const [equipmentName, setEquipmentName] = useState('');
  const [equipmentCategory, setEquipmentCategory] = useState('');
  const [equipmentPrice, setEquipmentPrice] = useState('');
  const [equipmentDescription, setEquipmentDescription] = useState('');
  const [equipmentImage, setEquipmentImage] = useState(null);

  // Filter equipment based on search query and category
  const filterEquipment = () => {
    const filtered = EQUIPMENT_LIST.filter(item => {
      const matchesQuery = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
      return matchesQuery && matchesCategory;
    });
    setFilteredEquipment(filtered);
  };

  // Handle equipment booking
  const handleBookNow = (equipmentName) => {
    Alert.alert('Booking Confirmation', `You have booked the ${equipmentName}.`, [
      { text: 'OK', onPress: () => console.log('Booked') },
    ]);
  };

  // Handle renting own equipment
  const handleRentOwnEquipment = () => {
    if (!equipmentName || !equipmentCategory || !equipmentPrice || !equipmentDescription) {
      Alert.alert('Error', 'Please fill out all the fields before submitting.');
      return;
    }

    Alert.alert('Rent Your Equipment', `Your ${equipmentName} is now available for rent!`, [
      { text: 'OK', onPress: () => console.log('Equipment rented') },
    ]);

    // Reset the form
    setEquipmentName('');
    setEquipmentCategory('');
    setEquipmentPrice('');
    setEquipmentDescription('');
    setEquipmentImage(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🚜 AgroRent – Equipment Rentals</Text>

      {/* Toggle Rent or Book Mode */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity style={[styles.toggleBtn, !isRentingOwn && styles.activeToggle]} onPress={() => setIsRentingOwn(false)}>
          <Text style={styles.toggleText}>Book Equipment</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.toggleBtn, isRentingOwn && styles.activeToggle]} onPress={() => setIsRentingOwn(true)}>
          <Text style={styles.toggleText}>Rent Your Equipment</Text>
        </TouchableOpacity>
      </View>

      {/* Search Input */}
      <TextInput
        style={styles.input}
        placeholder="Search Equipment"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <Button title="Search" onPress={filterEquipment} />

      {/* Category Filter */}
      <View style={styles.categoryFilter}>
        <Text style={styles.filterText}>Filter by Category:</Text>
        <TouchableOpacity onPress={() => setSelectedCategory('')} style={styles.categoryBtn}>
          <Text style={styles.categoryText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedCategory('Tractors')} style={styles.categoryBtn}>
          <Text style={styles.categoryText}>Tractors</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedCategory('Weeders')} style={styles.categoryBtn}>
          <Text style={styles.categoryText}>Weeders</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedCategory('Mowers')} style={styles.categoryBtn}>
          <Text style={styles.categoryText}>Mowers</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedCategory('Sprayers')} style={styles.categoryBtn}>
          <Text style={styles.categoryText}>Sprayers</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedCategory('Tools')} style={styles.categoryBtn}>
          <Text style={styles.categoryText}>Tools</Text>
        </TouchableOpacity>
      </View>

      {/* Display Either Renting or Booking */}
      {isRentingOwn ? (
        <View style={styles.rentSection}>
          <Text style={styles.rentTitle}>List Your Equipment for Rent</Text>
          
          {/* Equipment Rent Form */}
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
            placeholder="Price (₹)"
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
          
          {/* Image Upload Button (Currently a placeholder) */}
          <TouchableOpacity style={styles.uploadBtn} onPress={() => alert('Image upload feature coming soon')}>
            <Text style={styles.uploadBtnText}>Upload Equipment Image</Text>
          </TouchableOpacity>

          {/* Submit Button */}
          <Button title="List Equipment" onPress={handleRentOwnEquipment} />
        </View>
      ) : (
        <FlatList
          data={filteredEquipment}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.equipmentItem}>
              <Image source={{ uri: item.image }} style={styles.equipmentImage} />
              <View style={styles.equipmentDetails}>
                <Text style={styles.equipmentName}>{item.name}</Text>
                <Text style={styles.equipmentPrice}>{item.price}</Text>
                <TouchableOpacity
                  style={styles.bookBtn}
                  onPress={() => handleBookNow(item.name)}>
                  <Text style={styles.bookBtnText}>Book Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#e3f2fd' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#388E3C' },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  toggleBtn: {
    backgroundColor: '#388E3C',
    paddingVertical: 10,
    borderRadius: 5,
    width: '40%',
    alignItems: 'center',
  },
  activeToggle: {
    backgroundColor: '#43a047',
  },
  toggleText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  categoryFilter: { flexDirection: 'row', marginBottom: 20, justifyContent: 'space-between' },
  filterText: { fontSize: 16, color: '#388E3C' },
  categoryBtn: {
    backgroundColor: '#388E3C',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  categoryText: { color: '#fff', fontWeight: 'bold' },
  rentSection: { backgroundColor: '#fff', padding: 20, borderRadius: 10, marginTop: 30 },
  rentTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, color: '#388E3C' },
  uploadBtn: {
    backgroundColor: '#43a047',
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 20,
    alignItems: 'center',
  },
  uploadBtnText: { color: '#fff', fontWeight: 'bold' },
  equipmentItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  equipmentImage: { width: 100, height: 100, borderRadius: 8, marginRight: 15 },
  equipmentDetails: { flex: 1 },
  equipmentName: { fontSize: 18, fontWeight: 'bold' },
  equipmentPrice: { fontSize: 16, color: '#388E3C' },
  bookBtn: {
    backgroundColor: '#388E3C',
    paddingVertical: 8,
    borderRadius: 5,
    marginTop: 10,
  },
  bookBtnText: { color: '#fff', fontWeight: 'bold' },
});


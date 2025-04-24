import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput, FlatList, TouchableOpacity } from 'react-native';

const PRODUCTS = [
  { id: '1', name: 'Fertilizer X', category: 'Fertilizers', price: '₹500', image: 'https://via.placeholder.com/150' },
  { id: '2', name: 'Hybrid Seeds', category: 'Seeds', price: '₹300', image: 'https://via.placeholder.com/150' },
  { id: '3', name: 'Pesticide Y', category: 'Pesticides', price: '₹250', image: 'https://via.placeholder.com/150' },
  { id: '4', name: 'Water Pump Z', category: 'Tools', price: '₹1500', image: 'https://via.placeholder.com/150' },
  { id: '5', name: 'Tractor', category: 'Machinery', price: '₹50000', image: 'https://via.placeholder.com/150' },
];

export default function AgriKart() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState('');

  // Filter products based on search query and selected category
  const filterProducts = () => {
    const filtered = PRODUCTS.filter(item => {
      const matchesQuery = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
      return matchesQuery && matchesCategory;
    });
    setFilteredProducts(filtered);
  };

  const handleRequestQuote = (productName) => {
    alert(`Request for quote sent for ${productName}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛍️ AgriKart – Wholesale & B2B</Text>

      {/* Search Bar */}
      <TextInput
        style={styles.input}
        placeholder="Search Products"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <Button title="Search" onPress={filterProducts} />

      {/* Category Filter */}
      <View style={styles.categoryFilter}>
        <Text style={styles.filterText}>Filter by Category:</Text>
        <TouchableOpacity onPress={() => setSelectedCategory('')} style={styles.categoryBtn}>
          <Text style={styles.categoryText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedCategory('Fertilizers')} style={styles.categoryBtn}>
          <Text style={styles.categoryText}>Fertilizers</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedCategory('Seeds')} style={styles.categoryBtn}>
          <Text style={styles.categoryText}>Seeds</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedCategory('Pesticides')} style={styles.categoryBtn}>
          <Text style={styles.categoryText}>Pesticides</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedCategory('Machinery')} style={styles.categoryBtn}>
          <Text style={styles.categoryText}>Machinery</Text>
        </TouchableOpacity>
      </View>

      {/* Special Offers & Bulk Deals Section */}
      <View style={styles.offersSection}>
        <Text style={styles.subtitle}>Special Offers & Bulk Deals</Text>
        <Text>Check out our special deals for bulk purchases and B2B customers!</Text>
      </View>

      {/* Product Listings */}
      <FlatList
        data={filteredProducts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <View style={styles.productImageContainer}>
              <Text>🖼️</Text>
            </View>
            <View style={styles.productDetails}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productCategory}>{item.category}</Text>
              <Text style={styles.productPrice}>{item.price}</Text>
              <TouchableOpacity
                style={styles.requestBtn}
                onPress={() => handleRequestQuote(item.name)}
              >
                <Text style={styles.requestBtnText}>Request for Quote</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff3e0' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, color: '#388E3C' },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
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
  offersSection: { marginTop: 30 },
  subtitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#388E3C' },
  productItem: {
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
  productImageContainer: { width: 80, height: 80, backgroundColor: '#e3f2fd', borderRadius: 8, marginRight: 15, justifyContent: 'center', alignItems: 'center' },
  productDetails: { flex: 1 },
  productName: { fontSize: 18, fontWeight: 'bold' },
  productCategory: { fontSize: 14, color: '#7b7b7b' },
  productPrice: { fontSize: 16, color: '#388E3C' },
  requestBtn: {
    backgroundColor: '#43a047',
    paddingVertical: 8,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  requestBtnText: { color: '#fff', fontWeight: 'bold' },
});




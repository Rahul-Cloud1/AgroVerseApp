import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  Image,
  TextInput,
  Platform,
  UIManager,
  LayoutAnimation,
  Animated,
} from 'react-native';

// Updated mock data with 5 products under each category
const PRODUCTS = [
  // Power Weeders
  { id: '1', name: 'Stihl Bc 230', price: 500, image: '/Images/PowerWeeder/bc 230.jpg', category: 'Power Weeders' },
  { id: '2', name: 'Cub Cadet 750', price: 600, image: '/Images/PowerWeeder/ft 750.png', category: 'Power Weeders' },
  { id: '3', name: 'Stihl Mh 710', price: 700, image: '/Images/PowerWeeder/mh 710.jpg', category: 'Power Weeders' },
  { id: '4', name: 'Husqvarna 545', price: 750, image: '/Images/PowerWeeder/tf545.png', category: 'Power Weeders' },
  { id: '5', name: 'Husqvarna 120', price: 800, image: '/Images/PowerWeeder/Tf 120.png', category: 'Power Weeders' },

  // Seeds
  { id: '6', name: 'Seed Pack A', price: 300, image: '/Images/Seeds/seed-a.jpg', category: 'Seeds' },
  { id: '7', name: 'Tomato Seed B', price: 350, image: '/Images/Seeds/seed-b.jpg', category: 'Seeds' },
  { id: '8', name: 'Wheat Seed C', price: 250, image: '/Images/Seeds/seed-c.jpg', category: 'Seeds' },
  { id: '9', name: 'Corn Seed D', price: 300, image: '/Images/Seeds/seed-d.jpg', category: 'Seeds' },
  { id: '10', name: 'Rice Seed E', price: 400, image: '/Images/Seeds/seed-e.jpg', category: 'Seeds' },

  // Pesticides
  { id: '11', name: 'Pesticide A', price: 250, image: '/Images/Pesticides/pesticide-a.jpg', category: 'Pesticides' },
  { id: '12', name: 'Insecticide B', price: 300, image: '/Images/Pesticides/pesticide-b.jpg', category: 'Pesticides' },
  { id: '13', name: 'Herbicide C', price: 400, image: '/Images/Pesticides/pesticide-c.jpg', category: 'Pesticides' },
  { id: '14', name: 'Fungicide D', price: 350, image: '/Images/Pesticides/pesticide-d.jpg', category: 'Pesticides' },
  { id: '15', name: 'Weedicide E', price: 450, image: '/Images/Pesticides/pesticide-e.jpg', category: 'Pesticides' },

  // Tools
  { id: '16', name: 'Water Pump A', price: 1500, image: '/Images/Tools/water-pump.jpg', category: 'Tools' },
  { id: '17', name: 'Lawn Mower B', price: 2500, image: '/Images/Tools/lawn-mower.jpg', category: 'Tools' },
  { id: '18', name: 'Brush Cutter C', price: 3000, image: '/Images/Tools/brush-cutter.jpg', category: 'Tools' },
  { id: '19', name: 'Power Weeder D', price: 4500, image: '/Images/Tools/power-weeder.jpg', category: 'Tools' },
  { id: '20', name: 'Chain Saw E', price: 3500, image: '/Images/Tools/chain-saw.jpg', category: 'Tools' },
];


if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function AgroMart() {
  const [cart, setCart] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [cartVisible, setCartVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const addToCart = (item: any) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setCart([...cart, item]);
  };

  const showProductDetails = (item: any) => {
    setSelectedProduct(item);
    setModalVisible(true);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  // Filter products based on search query and selected category
  const filteredProducts = PRODUCTS.filter(item => {
    const matchesSearchQuery = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
    return matchesSearchQuery && matchesCategory;
  });

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛒 AgroMart – Agri Product Store</Text>

      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search Products"
        placeholderTextColor="#999"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Category Filter */}
      <View style={styles.categoryFilter}>
        <Text style={styles.filterText}>Filter by Category:</Text>
        <TouchableOpacity onPress={() => handleCategorySelect('')} style={styles.categoryBtn}>
          <Text style={styles.categoryText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleCategorySelect('Power Weeders')} style={styles.categoryBtn}>
          <Text style={styles.categoryText}>Power Weeder</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleCategorySelect('Seeds')} style={styles.categoryBtn}>
          <Text style={styles.categoryText}>Seeds</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleCategorySelect('Pesticides')} style={styles.categoryBtn}>
          <Text style={styles.categoryText}>Pesticides</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleCategorySelect('Tools')} style={styles.categoryBtn}>
          <Text style={styles.categoryText}>Tools</Text>
        </TouchableOpacity>
      </View>

      {/* Product List */}
      <FlatList
        data={filteredProducts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Animated.View style={styles.item}>
            <TouchableOpacity onPress={() => showProductDetails(item)}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.productInfo}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>₹{item.price}</Text>
                <TouchableOpacity style={styles.cartBtn} onPress={() => addToCart(item)}>
                  <Text style={styles.cartText}>Add to Cart</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buyNowBtn}>
                  <Text style={styles.buyNowText}>Buy Now</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </Animated.View>
        )}
      />

      {/* View Cart Button */}
      <TouchableOpacity style={styles.viewCart} onPress={() => setCartVisible(true)}>
        <Text style={styles.cartText}>🛒 View Cart ({cart.length})</Text>
      </TouchableOpacity>

      {/* Product Details Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>{selectedProduct?.name}</Text>
            <Image source={{ uri: selectedProduct?.image }} style={styles.modalImage} />
            <Text style={styles.modalText}>Price: ₹{selectedProduct?.price}</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeBtn}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Cart Modal */}
      <Modal visible={cartVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>🛍️ Your Cart</Text>
            {cart.map((item, idx) => (
              <Text key={idx} style={styles.modalText}>
                {item.name} - ₹{item.price}
              </Text>
            ))}
            <Text style={[styles.modalText, { fontWeight: 'bold' }]}>Total: ₹{total}</Text>
            <TouchableOpacity style={styles.checkoutBtn}>
              <Text style={styles.checkoutText}>Checkout</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setCartVisible(false)} style={styles.closeBtn}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fffde7' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  categoryFilter: { flexDirection: 'row', marginBottom: 20, justifyContent: 'space-between' },
  filterText: { fontSize: 16, color: '#388E3C' },
  categoryBtn: { padding: 10, backgroundColor: '#388E3C', borderRadius: 5 },
  categoryText: { color: '#fff', fontWeight: 'bold' },
  item: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  image: { width: 100, height: 100, borderRadius: 8, marginBottom: 10 },
  productInfo: { paddingLeft: 10 },
  name: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  price: { fontSize: 16, color: '#388E3C', marginBottom: 10 },
  cartBtn: {
    backgroundColor: '#43a047',
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  cartText: { color: '#fff', fontWeight: 'bold' },
  buyNowBtn: {
    backgroundColor: '#ff7043',
    paddingVertical: 10,
    borderRadius: 5,
  },
  buyNowText: { color: '#fff', fontWeight: 'bold' },
  viewCart: {
    backgroundColor: '#ff7043',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: { fontSize: 22, fontWeight: 'bold', color: '#388E3C' },
  modalImage: { width: 150, height: 150, borderRadius: 10, marginBottom: 15 },
  modalText: { fontSize: 18, color: '#555' },
  closeBtn: {
    marginTop: 20,
    backgroundColor: '#e53935',
    paddingVertical: 10,
    borderRadius: 10,
  },
  closeText: { color: '#fff', fontWeight: 'bold' },
  checkoutBtn: {
    backgroundColor: '#43a047',
    paddingVertical: 15,
    borderRadius: 10,
  },
  checkoutText: { color: '#fff', fontWeight: 'bold' },
});

export default AgroMart;

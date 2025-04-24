import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import KrishiMitra from './screens/KrishiMitra';
import AgroMart from './screens/AgroMart';
import AgroRent from './screens/AgroRent';
import AgriKart from './screens/AgriKart';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useState } from 'react';

const Stack = createNativeStackNavigator();

function CustomHeader({ title }: { title: string }) {
  return (
    <View style={styles.headerContainer}>
      <Icon name="leaf" size={30} color="#fff" />
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
}

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          header: () => <CustomHeader title={route.name} />,
        })}
      >
        <Stack.Screen name="Home">
          {(props) => (
            <HomeScreen {...props} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          )}
        </Stack.Screen>
        <Stack.Screen name="KrishiMitra" component={KrishiMitra} />
        <Stack.Screen name="AgroMart" component={AgroMart} />
        <Stack.Screen name="AgroRent" component={AgroRent} />
        <Stack.Screen name="AgriKart" component={AgriKart} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#6dbf8b',
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#6dbf8b',
    borderRadius: 8,
    padding: 10,
    margin: 10,
    backgroundColor: '#fff',
  },
  searchButton: {
    backgroundColor: '#6dbf8b',
    padding: 10,
    marginLeft: 10,
    borderRadius: 8,
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  bodyText: {
    fontSize: 16,
    color: '#333',
    margin: 10,
  },
  themeButton: {
    backgroundColor: '#6dbf8b',
    padding: 10,
    borderRadius: 8,
    position: 'absolute',
    top: 40,
    right: 20,
  },
  themeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

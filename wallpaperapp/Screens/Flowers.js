import React, { useState, useEffect } from 'react';
import { View, Image, FlatList, StyleSheet, Alert } from 'react-native';
import {Button, Text} from 'react-native-paper'
import axios from 'axios';
import ManageWallpaper ,{TYPE}from 'react-native-manage-wallpaper'; // Import only ManageWallpaper


const Flowers = () => {
  const [wallpapers, setWallpapers] = useState([]);

  const callback = res => {
    console.log('Response: ', res);
  };

  useEffect(() => {
    const fetchWallpapers = async () => {
      try {
        const response = await axios.get('https://pixabay.com/api/?key=46034412-16f974624ee16c8ab45277e70&q=flowers&image_type=photo&per_page=50');
        // Filter to include only JPG images
        const jpgImages = response.data.hits.filter(hit => hit.webformatURL.endsWith('.jpg'));
        setWallpapers(jpgImages); // Use filtered images
      } catch (error) {
        console.error('Error fetching wallpapers:', error);
      }
    };
    fetchWallpapers();
  }, []);

  const setAsWallpaper = async (url) => {
    try {
      await  ManageWallpaper.setWallpaper(
        {
          uri: url,
        },
        callback,
        TYPE.HOME,
      ); 
      Alert.alert('Wallpaper Set', 'Your wallpaper has been successfully set!');
    } catch (error) {
      console.error('Error setting wallpaper:', error);
      Alert.alert('Error', 'Failed to set wallpaper.');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={wallpapers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: item.webformatURL }} // Use webformatURL for image source
              style={styles.image}
            />
            <Button onPress={() => setAsWallpaper(item.webformatURL)} style={{backgroundColor:'#FEF2F2'}}>
              <Text>set as Wallpaper</Text>

              </Button>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#FFE1E1'
  },
  imageContainer: {
    marginBottom: 6,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 6,
  },
  
});

export default Flowers;

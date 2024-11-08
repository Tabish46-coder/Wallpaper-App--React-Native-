import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Dimensions, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';
import Video from 'react-native-video';
import { Button, Text } from 'react-native-paper';
import ManageWallpaper, { TYPE } from 'react-native-manage-wallpaper'; 

const Livewallpaper = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSettingWallpaper, setIsSettingWallpaper] = useState(false); 

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(
          'https://pixabay.com/api/videos/?key=46034412-16f974624ee16c8ab45277e70&q=live+wallpaper&per_page=20'
        );
        setVideos(response.data.hits);
      } catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  const setWallpaper = (url) => {
    setIsSettingWallpaper(true);
    ManageWallpaper.setWallpaper(
      { uri: url },
      () => {
        setIsSettingWallpaper(false);
        Alert.alert('Success', 'Wallpaper has been set successfully!');
      },
      TYPE.HOME
    );
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="tomato" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={videos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Video
              source={{ uri: item.videos.medium.url }} 
              style={styles.video}
              resizeMode="cover"
              repeat={true} 
              paused={false} 
              muted={true} 
              controls={false}
              onError={(error) => console.log('Video Error:', error)} 
            />
            <Button
              style={{backgroundColor:'#FEF2F2'}}
              onPress={() => setWallpaper(item.videos.medium.url)}
              disabled={isSettingWallpaper} 
            >
              <Text>Set as wallpaper</Text>

            </Button>
          </View>
        )}
      />
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#FFE1E1'
  },
  video: {
    width: width,
    height: height / 3,
    marginBottom: 5,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Livewallpaper;

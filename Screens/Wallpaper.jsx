import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import FastImage from 'react-native-fast-image';
import {API_KEY} from '../apiKey';

const URL = `https://pixabay.com/api/?key=${API_KEY}&q=wallpaper&image_type=photo&orientation=vertical&pretty=true&safesearch=true&per_page=200`;

const Wallpaper = ({navigation}) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get(URL);
      setImages(response.data.hits);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate('Display', {
          preview: item.webformatURL,
          wallpaper: item.largeImageURL,
        })
      }>
      <FastImage
        style={styles.image}
        source={{
          uri: item.webformatURL,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={images}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: Dimensions.get('window').width / 2 - 10,
    height: 300,
    margin: 5,
    borderRadius: 10,
  },
});

export default Wallpaper;

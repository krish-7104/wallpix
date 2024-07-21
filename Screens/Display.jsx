import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import ManageWallpaper, {TYPE} from 'react-native-manage-wallpaper';

const Display = ({route}) => {
  const callback = res => {
    console.log('Response: ', res);
  };
  const setWallpaper = () => {
    ManageWallpaper.setWallpaper(
      {
        uri: route.params.wallpaper,
      },
      callback,
      TYPE.HOME,
    );
  };
  return (
    <View>
      <TouchableOpacity
        onPress={setWallpaper}
        style={{
          backgroundColor: 'red',
          position: 'absolute',
          padding: 10,
          top: 10,
          right: 10,
          zIndex: 10,
        }}>
        <Text>Set</Text>
      </TouchableOpacity>
      <FastImage
        style={styles.image}
        source={{
          uri: route.params.preview,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
    </View>
  );
};

export default Display;

const styles = StyleSheet.create({
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Link } from "expo-router";
import { Dimensions, Image, ImageBackground, StyleSheet, TouchableOpacity, View } from "react-native";

let imagePath = require('../assets/images/main/andonggalbi_main.jpg');
const Stack = createNativeStackNavigator();

const { width, height } = Dimensions.get('window');
const FullscreenImage = () => {
  return (
    <View style={styles.container}>
      {/* 투명한 배경 이미지 레이어 */}
      <ImageBackground
        source={imagePath}
        style={styles.backgroundImageLayer}
        resizeMode="cover"
      />
      
      {/* 기존 컨텐츠 레이어 */}
      <Link href="/lang" asChild>
        <TouchableOpacity style={styles.touchableArea}>
          <Image
            style={styles.image}
            source={imagePath}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // View 컴포넌트가 화면 전체를 차지하도록 설정
  },
  backgroundImageLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.3, // 배경 이미지 투명도
  },
  touchableArea: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  image: {
    width: '100%', // 이미지 너비를 컨테이너의 100%로 설정
    height: '100%', // 이미지 높이를 컨테이너의 100%로 설정
    resizeMode: 'cover', // 화면에 꽉 차도록 이미지 크기 조절
  },
});

export default FullscreenImage;
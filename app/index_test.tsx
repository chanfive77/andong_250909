import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Dimensions, Image, StyleSheet, View } from "react-native";

let imagePath = require('../assets/images/main/andonggalbi_main.jpg');
const Stack = createNativeStackNavigator();

const { width, height } = Dimensions.get('window');
const FullscreenImage = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={imagePath} // 이미지의 URL을 입력하세요
        resizeMode="contain" // 또는 "contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // View 컴포넌트가 화면 전체를 차지하도록 설정
  },
  image: {
    width: '100%', // 이미지 너비를 컨테이너의 100%로 설정
    height: '100%', // 이미지 높이를 컨테이너의 100%로 설정
    resizeMode: 'cover', // 화면에 꽉 차도록 이미지 크기 조절
  },
});

export default FullscreenImage;



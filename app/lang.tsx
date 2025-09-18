import { Link, useRouter } from 'expo-router';
import { Image, ImageBackground, StyleSheet, View } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

const images = [
  { id: '1', source: require('../assets/images/lang/america_lang.jpg'), linkUrl: '/menu' as const, state: { lang: 'us' } },
  { id: '2', source: require('../assets/images/lang/china_lang.jpg'), linkUrl: '/menu' as const, state: { lang: 'cn' } },
  { id: '3', source: require('../assets/images/lang/japan_lang.jpg'), linkUrl: '/menu' as const, state: { lang: 'jp' } },
  { id: '4', source: require('../assets/images/lang/spain_lang.jpg'), linkUrl: '/menu' as const, state: { lang: 'sp' } },
  { id: '5', source: require('../assets/images/lang/thailand_lang.jpg'), linkUrl: '/menu' as const, state: { lang: 'tl' } },
  { id: '6', source: require('../assets/images/lang/indonesia_lang.jpg'), linkUrl: '/menu' as const, state: { lang: 'ins' } },
  { id: '7', source: require('../assets/images/lang/taipei_lang.jpg'), linkUrl: '/menu' as const, state: { lang: 'tp' } },
  { id: '8', source: require('../assets/images/lang/vietnam_lang.jpg'), linkUrl: '/menu' as const, state: { lang: 'vn' } },
  { id: '9', source: require('../assets/images/lang/france_lang.jpg'), linkUrl: '/menu' as const, state: { lang: 'fr' } },
  { id: '10', source: require('../assets/images/lang/india_lang.jpg'), linkUrl: '/menu' as const, state: { lang: 'ind' } },
  { id: '11', source: require('../assets/images/lang/mongolia_lang.jpg'), linkUrl: '/menu' as const, state: { lang: 'mg' } },
  { id: '12', source: require('../assets/images/lang/germany_lang.jpg'), linkUrl: '/menu' as const, state: { lang: 'gm' } },
];

const App = () => {
  const router = useRouter();

  const handleSwipeGesture = (event: any) => {
    if (event.nativeEvent.state === State.END) {
      const { translationX, velocityX } = event.nativeEvent;
      
      // 오른쪽으로 스와이프 감지 (translationX > 50 또는 velocityX > 500)
      if (translationX > 50 || velocityX > 500) {
        router.push('/');
      }
      // 왼쪽으로 스와이프 감지 (translationX < -50 또는 velocityX < -500)
      else if (translationX < -50 || velocityX < -500) {
        router.push('/menu?lang=kr');
      }
    }
  };

  return (
    <PanGestureHandler onHandlerStateChange={handleSwipeGesture}>
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={require('../assets/images/lang/language_bg.jpg')} // 이미지 파일 경로를 지정합니다.
          style={styles.backgroundImage}
          resizeMode="contain" // 이미지가 전체 화면을 덮도록 합니다. (cover, contain)
        >
      {/*<View style={styles.overlay}>
        <Text style={styles.text}>이것은 백그라운드 이미지 위의 텍스트입니다.</Text>
      </View>*/}

      {/* 국기 이미지 전체 래퍼 레이어 */}
      <View style={styles.flagsWrapper}>
        <View style={styles.imageTop}>
          <Link href={"/menu?lang=kr"}>
            <Image source={require('../assets/images/lang/korea_lang.jpg')} style={styles.image} />
          </Link>
        </View>
        <View style={styles.container}>
            {images.map((image) => (
              <View key={image.id} style={styles.imageWrapper}>
                <Link href={`${image.linkUrl}?lang=${image.state.lang}`}>
                <Image source={image.source} style={styles.image} />
                </Link>
              </View>
            ))}
        </View>
      </View>

        </ImageBackground>
      </View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1, // 화면 전체를 차지하도록 설정합니다.
    justifyContent: 'center', // 자식 요소들을 수직 중앙 정렬합니다.
    alignItems: 'center', // 자식 요소들을 수평 중앙 정렬합니다. 
    width: '100%',
    height: '100%',
    backgroundColor: '#3d3c3a',
  },
  flagsWrapper: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20, // 전체 국기 이미지 영역 패딩 (조정 가능)
    paddingTop: 50, // 상단 패딩 (조정 가능)
    paddingBottom: 30, // 하단 패딩 (조정 가능)
    paddingHorizontal: 15, // 좌우 패딩 (조정 가능)
  },
  overlay: {
    backgroundColor: 'rgba(209, 37, 37, 0.5)', // 배경 이미지 위에 텍스트를 더 잘 보이게 합니다.
    padding: 20,
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  container: {
    flexDirection: 'row', // 이미지를 가로로 배치
    flexWrap: 'wrap',    // 한 줄에 이미지가 꽉 차면 다음 줄로 넘어가기
    justifyContent: 'flex-start', // 시작점에 정렬
    alignItems: 'flex-start',    // 상단에 정렬
    padding: 5,
  },
  imageTop: {
    marginTop: 250,
    width: '25%', // 한 줄에 3개씩 배치하기 위한 너비 (예시)
    padding: 3,
    paddingVertical: 11,
    aspectRatio: 4.7/3.6, // 이미지 비율을 1:1로 유지 (정사각형으로)
  },
  imageWrapper: {
    width: '25%', // 한 줄에 3개씩 배치하기 위한 너비 (예시)
    padding: 3,
    paddingVertical: 11,
    aspectRatio: 4.7/3.6, // 이미지 비율을 1:1로 유지 (정사각형으로)
  },
  image: {
    flex: 1, // 부모의 너비를 모두 차지
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // 이미지가 잘리지 않고 꽉 차게 설정(cover, contain)
  },
});

export default App;
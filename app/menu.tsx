import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');


// 언어별 메뉴 이미지 배열 (각 언어당 4장)
const menuImagesByLanguage = {
  kr: [
    require('../assets/images/menu/kr_n1.jpg'),
    require('../assets/images/menu/kr_n2.jpg'),
    require('../assets/images/menu/kr_n3.jpg'),
    require('../assets/images/menu/kr_n4.jpg'),
    require('../assets/images/menu/kr_n5.jpg'),
  ],
  us: [
    require('../assets/images/menu/us_n1.jpg'),
    require('../assets/images/menu/us_n2.jpg'),
    require('../assets/images/menu/us_n3.jpg'),
    require('../assets/images/menu/us_n4.jpg'),
    require('../assets/images/menu/us_n5.jpg'),
  ],
  cn: [
    require('../assets/images/menu/cn_n1.jpg'),
    require('../assets/images/menu/cn_n2.jpg'),
    require('../assets/images/menu/cn_n3.jpg'),
    require('../assets/images/menu/cn_n4.jpg'),
    require('../assets/images/menu/cn_n5.jpg'),
  ],
  jp: [
    require('../assets/images/menu/jp_n1.jpg'),
    require('../assets/images/menu/jp_n2.jpg'),
    require('../assets/images/menu/jp_n3.jpg'),
    require('../assets/images/menu/jp_n4.jpg'),
    require('../assets/images/menu/jp_n5.jpg'),
  ],
  sp: [
    require('../assets/images/menu/sp_n1.jpg'),
    require('../assets/images/menu/sp_n2.jpg'),
    require('../assets/images/menu/sp_n3.jpg'),
    require('../assets/images/menu/sp_n4.jpg'),
    require('../assets/images/menu/sp_n5.jpg'),
  ],
  tl: [
    require('../assets/images/menu/tl_n1.jpg'),
    require('../assets/images/menu/tl_n2.jpg'),
    require('../assets/images/menu/tl_n3.jpg'),
    require('../assets/images/menu/tl_n4.jpg'),
    require('../assets/images/menu/tl_n5.jpg'),
  ],
  ins: [
    require('../assets/images/menu/ins_n1.jpg'),
    require('../assets/images/menu/ins_n2.jpg'),
    require('../assets/images/menu/ins_n3.jpg'),
    require('../assets/images/menu/ins_n4.jpg'),
    require('../assets/images/menu/ins_n5.jpg'),
  ],
  tp: [
    require('../assets/images/menu/tp_n1.jpg'),
    require('../assets/images/menu/tp_n2.jpg'),
    require('../assets/images/menu/tp_n3.jpg'),
    require('../assets/images/menu/tp_n4.jpg'),
    require('../assets/images/menu/tp_n5.jpg'),
  ],
  vn: [
    require('../assets/images/menu/vn_n1.jpg'),
    require('../assets/images/menu/vn_n2.jpg'),
    require('../assets/images/menu/vn_n3.jpg'),
    require('../assets/images/menu/vn_n4.jpg'),
    require('../assets/images/menu/vn_n5.jpg'),
  ],
  fr: [
    require('../assets/images/menu/fr_n1.jpg'),
    require('../assets/images/menu/fr_n2.jpg'),
    require('../assets/images/menu/fr_n3.jpg'),
    require('../assets/images/menu/fr_n4.jpg'),
    require('../assets/images/menu/fr_n5.jpg'),
  ],
  ind: [
    require('../assets/images/menu/ind_n1.jpg'),
    require('../assets/images/menu/ind_n2.jpg'),
    require('../assets/images/menu/ind_n3.jpg'),
    require('../assets/images/menu/ind_n4.jpg'),
    require('../assets/images/menu/ind_n5.jpg'),
  ],
  mg: [
    require('../assets/images/menu/mg_n1.jpg'),
    require('../assets/images/menu/mg_n2.jpg'),
    require('../assets/images/menu/mg_n3.jpg'),
    require('../assets/images/menu/mg_n4.jpg'),
    require('../assets/images/menu/mg_n5.jpg'),
  ],
  gm: [
    require('../assets/images/menu/gm_n1.jpg'),
    require('../assets/images/menu/gm_n2.jpg'),
    require('../assets/images/menu/gm_n3.jpg'),
    require('../assets/images/menu/gm_n4.jpg'),
    require('../assets/images/menu/gm_n5.jpg'),
  ],
} as const;

// 더블탭 + 핀치 줌 이미지 컴포넌트
const ZoomableImage = React.memo(({ source, onZoomChange }: { 
  source: any; 
  onZoomChange: (isZoomed: boolean) => void;
}) => {
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const savedTranslateX = useSharedValue(0);
  const savedTranslateY = useSharedValue(0);

  const updateZoomState = (zoomed: boolean) => {
    onZoomChange(zoomed);
  };

  // 더블탭으로 2배 확대/축소
  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd((event) => {
      'worklet';
      if (scale.value === 1) {
        // 확대: 탭한 위치를 중심으로 2배 확대
        const tapX = event.x;
        const tapY = event.y;
        
        // 이미지 중심에서 탭 위치까지의 거리 계산
        const centerX = width / 2;
        const centerY = width / 2;
        
        // 확대 후 탭한 위치가 중심에 오도록 translate 계산
        const newTranslateX = (centerX - tapX) * 1;
        const newTranslateY = (centerY - tapY) * 1;
        
        scale.value = withSpring(2, { damping: 15 });
        translateX.value = withSpring(newTranslateX, { damping: 15 });
        translateY.value = withSpring(newTranslateY, { damping: 15 });
        savedScale.value = 2;
        savedTranslateX.value = newTranslateX;
        savedTranslateY.value = newTranslateY;
        runOnJS(updateZoomState)(true);
      } else {
        // 축소: 즉시 원본 크기로 복구
        scale.value = withSpring(1, { damping: 15 });
        translateX.value = withSpring(0, { damping: 15 });
        translateY.value = withSpring(0, { damping: 15 });
        savedScale.value = 1;
        savedTranslateX.value = 0;
        savedTranslateY.value = 0;
        runOnJS(updateZoomState)(false);
      }
    });

  // 핀치 제스처로 확대/축소
  const pinch = Gesture.Pinch()
    .onStart(() => {
      'worklet';
      savedScale.value = scale.value;
    })
    .onUpdate((event) => {
      'worklet';
      const newScale = savedScale.value * event.scale;
      // 1배에서 3배까지 제한
      if (newScale >= 1 && newScale <= 3) {
        scale.value = newScale;
        runOnJS(updateZoomState)(newScale > 1);
      }
    })
    .onEnd(() => {
      'worklet';
      // 1.2배 미만이면 원본 크기로 복구
      if (scale.value < 1.3) {
        scale.value = withSpring(1, { damping: 15 });
        translateX.value = withSpring(0, { damping: 15 });
        translateY.value = withSpring(0, { damping: 15 });
        savedScale.value = 1;
        savedTranslateX.value = 0;
        savedTranslateY.value = 0;
        runOnJS(updateZoomState)(false);
      } else {
        savedScale.value = scale.value;
      }
    });

  // 팬 제스처로 확대된 이미지 드래그
  const pan = Gesture.Pan()
    .minDistance(0) // 제스처로 인식되기 위해 손가락이 이동해야 하는 최소 거리
    .activateAfterLongPress(10) //롱프레스 제스처가 발생한 후, Pan 제스처가 활성화되기까지의 시간(밀리초) *속도 향상에 중요해 보임
    .onStart(() => {
      'worklet';
      savedTranslateX.value = translateX.value;
      savedTranslateY.value = translateY.value;
      console.log('pan start');
    })
    .onUpdate((event) => {
      'worklet';
      if (scale.value > 1.2) {
        // 확대된 상태에서만 드래그 허용
        const imageWidth = width * scale.value;
        const imageHeight = width * scale.value; // 정사각형 이미지 가정
        
        // 드래그 경계 계산 - 이미지가 화면 밖으로 나가지 않도록
        //const maxTranslateX = Math.max(0, (imageWidth - width) / 2);
        //const maxTranslateY = Math.max(0, (imageHeight - width) / 2);
        
        const newTranslateX = savedTranslateX.value + event.translationX;
        const newTranslateY = savedTranslateY.value + event.translationY;
        
        // 부드러운 경계 제한
        //translateX.value = Math.max(-maxTranslateX, Math.min(maxTranslateX, newTranslateX));
        //translateY.value = Math.max(-maxTranslateY, Math.min(maxTranslateY, newTranslateY));

        translateX.value = newTranslateX;
        translateY.value = newTranslateY;
      }
      console.log('pan update');
    })
    .onEnd(() => {
      'worklet';
      savedTranslateX.value = translateX.value;
      savedTranslateY.value = translateY.value;
      console.log('pan end');
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  // 제스처 조합: 핀치와 팬은 동시에, 더블탭은 별도로
  const composed = Gesture.Simultaneous(
    Gesture.Exclusive(doubleTap, pan),
    pinch
  );

  return (
    <GestureDetector gesture={composed}>
      <Animated.View style={[styles.zoomableContainer, animatedStyle]}>
        <Image source={source} style={styles.menuImage} resizeMode="contain" />
      </Animated.View>
    </GestureDetector>
  );
});

const App = () => {
  const { lang } = useLocalSearchParams();
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [iconOpacity, setIconOpacity] = useState(0.3); // 아이콘 투명도 상태 (0.0 ~ 1.0)
  
  // 언어 파라미터에 따른 메뉴 이미지 배열 선택 (기본값: kr)
  const getMenuImages = () => {
    const langKey = Array.isArray(lang) ? lang[0] : lang;
    return menuImagesByLanguage[langKey as keyof typeof menuImagesByLanguage] || menuImagesByLanguage.kr;
  };

  const menuImages = getMenuImages();
  
  // 무한 스크롤을 위해 이미지 배열을 확장 (앞뒤에 복사본 추가)
  const infiniteImages = [
    menuImages[menuImages.length - 1], // 마지막 이미지를 맨 앞에
    ...menuImages,
    menuImages[0] // 첫 번째 이미지를 맨 뒤에
  ];

  // 스크롤 이벤트 핸들러
  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    
    // 실제 이미지 인덱스 계산 (복사본 제외)
    let realIndex = index - 1;
    if (realIndex < 0) realIndex = menuImages.length - 1;
    if (realIndex >= menuImages.length) realIndex = 0;
    
    setCurrentIndex(realIndex);
  };

  // 스크롤 끝났을 때 무한 스크롤 처리
  const handleScrollEnd = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    
    // 첫 번째 복사본(인덱스 0)에 있으면 마지막 실제 이미지로 이동
    if (index === 0) {
      scrollViewRef.current?.scrollTo({
        x: menuImages.length * width,
        animated: false
      });
    }
    // 마지막 복사본(인덱스 infiniteImages.length - 1)에 있으면 첫 번째 실제 이미지로 이동
    else if (index === infiniteImages.length - 1) {
      scrollViewRef.current?.scrollTo({
        x: width,
        animated: false
      });
    }
  };

  // 컴포넌트 마운트 시 첫 번째 실제 이미지 위치로 스크롤
  React.useEffect(() => {
    // 초기 currentIndex를 0으로 설정
    setCurrentIndex(0);
    
    // 스크롤 위치를 첫 번째 실제 이미지로 설정
    const timer = setTimeout(() => {
      scrollViewRef.current?.scrollTo({
        x: width, // 첫 번째 실제 이미지 위치 (인덱스 1)
        animated: false
      });
    }, 50); // 타이밍을 더 빠르게 조정
    
    return () => clearTimeout(timer);
  }, [lang]); // lang이 변경될 때도 실행

  // 홈으로 이동
  const goToHome = () => {
    router.push('/');
  };

  // 언어 선택 페이지로 이동
  const goToLanguage = () => {
    router.push('/lang');
  };

  // 이전 이미지로 이동 (왼쪽 화살표)
  const goToPrevious = () => {
    const currentScrollPosition = (currentIndex + 1) * width; // 현재 위치
    const targetScrollPosition = currentScrollPosition - width; // 이전 위치
    
    scrollViewRef.current?.scrollTo({
      x: targetScrollPosition,
      animated: true
    });
    
    // handleScrollEnd에서 무한 스크롤 처리가 자동으로 됨
  };

  // 다음 이미지로 이동 (오른쪽 화살표)
  const goToNext = () => {
    const currentScrollPosition = (currentIndex + 1) * width; // 현재 위치
    const targetScrollPosition = currentScrollPosition + width; // 다음 위치
    
    scrollViewRef.current?.scrollTo({
      x: targetScrollPosition,
      animated: true
    });
    
    // handleScrollEnd에서 무한 스크롤 처리가 자동으로 됨
  };

  // 줌 상태 변경 핸들러
  const handleZoomChange = (zoomed: boolean) => {
    setIsZoomed(zoomed);
    console.log('zoomed: ', zoomed);
  };

  // 아이콘 투명도 조정 함수
  const adjustIconOpacity = (opacity: number) => {
    // 0.0 ~ 1.0 범위로 제한
    const clampedOpacity = Math.max(0.0, Math.min(1.0, opacity));
    setIconOpacity(clampedOpacity);
  };

  // 아이콘 투명도 토글 함수 (예: 0.3 <-> 0.8)
  const toggleIconOpacity = () => {
    setIconOpacity(prevOpacity => prevOpacity <= 0.5 ? 0.8 : 0.3);
  };

  // 페이지네이션 도트 렌더링
  const renderPagination = () => {
    return (
      <View style={styles.paginationContainer}>
        {menuImages.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === currentIndex ? styles.paginationDotActive : null,
            ]}
          />
        ))}
      </View>
    );
  };
  
  return (
    <View style={styles.container}>
      {/* 오른쪽 상단 네비게이션 버튼들 */}
      <View style={styles.topNavigation}>
        <TouchableOpacity 
          style={styles.navButton} 
          onPress={goToHome}
          activeOpacity={0.7}
        >
          <MaterialIcons name="home" size={28} color="#ffffff" style={{ opacity: iconOpacity }} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navButton} 
          onPress={goToLanguage}
          activeOpacity={0.7}
        >
          <MaterialIcons name="language" size={28} color="#ffffff" style={{ opacity: iconOpacity }} />
        </TouchableOpacity>
        {/*}
        <TouchableOpacity 
          style={styles.navButton} 
          onPress={toggleIconOpacity}
          activeOpacity={0.7}
        >
          <MaterialIcons name="opacity" size={28} color="#ffffff" style={{ opacity: iconOpacity }} />
        </TouchableOpacity>
        */}
      </View>

      {/* 컨텐츠 레이어 */}
      <View style={styles.contentLayer}>
        {/*
        <View style={styles.overlay}>
          <Text style={styles.text}>선택언어: {lang} - 메뉴 이미지 갤러리</Text>
        </View>
        */}

        {/* 스와이프 가능한 이미지 갤러리 */}
        <View style={styles.galleryContainer}>
          <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            onMomentumScrollEnd={handleScrollEnd}
            scrollEventThrottle={16}
            style={styles.scrollView}
            scrollEnabled={!isZoomed}
            contentOffset={{ x: width, y: 0 }} // 초기 위치를 첫 번째 실제 이미지로 설정
          >
            {infiniteImages.map((image, index) => (
              <View key={index} style={styles.imageContainer}>
                <ZoomableImage source={image} onZoomChange={handleZoomChange} />
              </View>
            ))}
          </ScrollView>
          
          {/* 좌우 이동 화살표 */}
          <TouchableOpacity 
            style={styles.leftArrow} 
            onPress={goToPrevious}
            activeOpacity={0.7}
          >
            <MaterialIcons name="chevron-left" size={40} color="#ffffff" style={{ opacity: iconOpacity }} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.rightArrow} 
            onPress={goToNext}
            activeOpacity={0.7}
          >
            <MaterialIcons name="chevron-right" size={40} color="#ffffff" style={{ opacity: iconOpacity }} />
          </TouchableOpacity>
          
          {/* 페이지네이션 도트 */}
          {renderPagination()}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#3d3c3a', // 검은색 배경
  },
  contentLayer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  backgroundImage: {
    flex: 1, // 화면 전체를 차지하도록 설정합니다.
    justifyContent: 'center', // 자식 요소들을 수직 중앙 정렬합니다.
    alignItems: 'center', // 자식 요소들을 수평 중앙 정렬합니다. 
    width: '100%',
    height: '100%',
    opacity: 1,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // 배경 이미지 위에 텍스트를 더 잘 보이게 합니다.
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  galleryContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  imageContainer: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 0,
  },
  menuImage: {
    width: '100%',
    height: '100%',
    borderRadius: 0,
    backgroundColor: 'rgba(255, 255, 255, 0)',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 0,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: 'white',
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  zoomableContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topNavigation: {
    position: 'absolute',
    top: 50,
    right: 20,
    flexDirection: 'row',
    zIndex: 20,
  },
  navButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  leftArrow: {
    position: 'absolute',
    left: 20,
    top: '50%',
    transform: [{ translateY: -20 }],
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  rightArrow: {
    position: 'absolute',
    right: 20,
    top: '50%',
    transform: [{ translateY: -20 }],
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
});

export default App;
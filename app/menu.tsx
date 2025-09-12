import { useLocalSearchParams } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Dimensions, Image, ImageBackground, ScrollView, StyleSheet, View } from 'react-native';

const { width } = Dimensions.get('window');

// 언어별 배경 이미지 매핑
const backgroundImages = {
  kr: require('../assets/images/menu/kr_n1.jpg'),
  us: require('../assets/images/menu/us_n1.jpg'),
  cn: require('../assets/images/menu/cn_n1.jpg'),
  jp: require('../assets/images/menu/jp_n1.jpg'),
  sp: require('../assets/images/menu/sp_n1.jpg'),
  tl: require('../assets/images/menu/tl_n1.jpg'),
  ins: require('../assets/images/menu/ins_n1.jpg'),
  tp: require('../assets/images/menu/tp_n1.jpg'),
  vn: require('../assets/images/menu/vn_n1.jpg'),
  fr: require('../assets/images/menu/fr_n1.jpg'),
  ind: require('../assets/images/menu/ind_n1.jpg'),
  mg: require('../assets/images/menu/mg_n1.jpg'),
  gm: require('../assets/images/menu/gm_n1.jpg'),
} as const;

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

const App = () => {
  const { lang } = useLocalSearchParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  
  // 언어 파라미터에 따른 배경 이미지 선택 (기본값: kr)
  const getBackgroundImage = () => {
    const langKey = Array.isArray(lang) ? lang[0] : lang;
    return backgroundImages[langKey as keyof typeof backgroundImages] || backgroundImages.kr;
  };

  // 언어 파라미터에 따른 메뉴 이미지 배열 선택 (기본값: kr)
  const getMenuImages = () => {
    const langKey = Array.isArray(lang) ? lang[0] : lang;
    return menuImagesByLanguage[langKey as keyof typeof menuImagesByLanguage] || menuImagesByLanguage.kr;
  };

  const menuImages = getMenuImages();

  // 스크롤 이벤트 핸들러
  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    setCurrentIndex(index);
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
      {/* 배경 이미지 레이어 (투명도 적용) */}
      <ImageBackground
        source={getBackgroundImage()} // 파라미터에 따른 동적 이미지 로드
        style={styles.backgroundImageLayer}
        resizeMode="cover" // 이미지가 전체 화면을 덮도록 합니다. (cover, contain)
      />
      
      {/* 컨텐츠 레이어 (투명도 적용 안됨) */}
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
            scrollEventThrottle={16}
            style={styles.scrollView}
          >
            {menuImages.map((image, index) => (
              <View key={index} style={styles.imageContainer}>
                <Image source={image} style={styles.menuImage} resizeMode="contain" />
              </View>
            ))}
          </ScrollView>
          
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
  },
  backgroundImageLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.3, // 배경 이미지만 투명도 적용
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
});

export default App;
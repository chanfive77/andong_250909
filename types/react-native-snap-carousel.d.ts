declare module 'react-native-snap-carousel' {
  import { Component } from 'react';
  import { ViewStyle, ScrollViewProps } from 'react-native';

  export interface CarouselProps<T = any> {
    data: T[];
    renderItem: (info: { item: T; index: number }) => React.ReactElement;
    sliderWidth: number;
    itemWidth: number;
    layout?: 'default' | 'stack' | 'tinder';
    layoutCardOffset?: number;
    enableSnap?: boolean;
    snapOnAndroid?: boolean;
    enableMomentum?: boolean;
    decelerationRate?: number | 'fast' | 'normal';
    swipeThreshold?: number;
    activeSlideAlignment?: 'center' | 'end' | 'start';
    activeSlideOffset?: number;
    inactiveSlideScale?: number;
    inactiveSlideOpacity?: number;
    containerCustomStyle?: ViewStyle;
    contentContainerCustomStyle?: ViewStyle;
    slideStyle?: ViewStyle;
    scrollEnabled?: boolean;
    onSnapToItem?: (index: number) => void;
    onBeforeSnapToItem?: (index: number) => void;
    firstItem?: number;
    autoplay?: boolean;
    autoplayDelay?: number;
    autoplayInterval?: number;
    loop?: boolean;
    loopClonesPerSide?: number;
    vertical?: boolean;
    apparitionDelay?: number;
    hasParallaxImages?: boolean;
    lockScrollWhileSnapping?: boolean;
    lockScrollTimeoutDuration?: number;
    useScrollView?: boolean;
    callbackOffsetMargin?: number;
    shouldOptimizeUpdates?: boolean;
    removeClippedSubviews?: boolean;
  }

  export default class Carousel<T = any> extends Component<CarouselProps<T> & ScrollViewProps> {
    snapToItem(index: number, animated?: boolean, fireCallback?: boolean): void;
    snapToNext(animated?: boolean, fireCallback?: boolean): void;
    snapToPrev(animated?: boolean, fireCallback?: boolean): void;
    currentIndex: number;
  }

  export class ParallaxImage extends Component<any> {}
  export class Pagination extends Component<any> {}
}

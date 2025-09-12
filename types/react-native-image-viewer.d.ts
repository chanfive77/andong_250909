declare module 'react-native-image-viewer' {
  import { Component } from 'react';
  import { ViewStyle, ImageStyle } from 'react-native';

  export interface ImageInfo {
    url?: string;
    source?: any;
    width?: number;
    height?: number;
    freeHeight?: boolean;
    freeWidth?: boolean;
  }

  export interface ImageViewerProps {
    imageUrls?: ImageInfo[];
    enableImageZoom?: boolean;
    onShowModal?: (content?: any) => void;
    onCancel?: () => void;
    flipThreshold?: number;
    maxOverflow?: number;
    index?: number;
    failImageSource?: any;
    loadingRender?: () => React.ReactElement;
    onSaveToCamera?: (index?: number) => void;
    onChange?: (index?: number) => void;
    onMove?: (position?: any) => void;
    saveToLocalByLongPress?: boolean;
    onClick?: (onCancel?: () => void) => void;
    onDoubleClick?: (onCancel?: () => void) => void;
    onSave?: (url: string) => void;
    renderHeader?: (currentIndex?: number) => React.ReactElement;
    renderFooter?: (currentIndex?: number) => React.ReactElement;
    renderIndicator?: (currentIndex?: number, allSize?: number) => React.ReactElement;
    renderImage?: (props: any) => React.ReactElement;
    renderArrowLeft?: () => React.ReactElement;
    renderArrowRight?: () => React.ReactElement;
    onSwipeDown?: () => void;
    onScaleChange?: (scale: number) => void;
    backgroundColor?: string;
    enableSwipeDown?: boolean;
    swipeDownThreshold?: number;
    doubleClickInterval?: number;
    pageAnimateTime?: number;
    enablePreload?: boolean;
    useNativeDriver?: boolean;
    menus?: any;
    menuContext?: any;
    style?: ViewStyle;
    imageStyle?: ImageStyle;
  }

  export default class ImageViewer extends Component<ImageViewerProps> {}
}

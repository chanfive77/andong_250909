import { Stack } from "expo-router";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          animationDuration: 300,
        }}
      >
        <Stack.Screen 
          name="index" 
          options={{ 
            headerShown: false,
            animation: 'slide_from_left',
            animationDuration: 300
          }} 
        />
        <Stack.Screen 
          name="lang" 
          options={{ 
            headerShown: false,
            animation: 'slide_from_right',
            animationDuration: 300
          }} 
        />
        <Stack.Screen 
          name="menu" 
          options={{ 
            headerShown: false,
            animation: 'slide_from_right',
            animationDuration: 300
          }} 
        />
      </Stack>
    </GestureHandlerRootView>
  );
}

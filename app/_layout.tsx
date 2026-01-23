import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import Toast from "react-native-toast-message";

export default function RootLayout() {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" translucent={false} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
      </Stack>
      <Toast />
    </>
  );
}

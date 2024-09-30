import Colors from "@/constants/Colors";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack, useRouter, useSegments } from "expo-router";
import { Text, TouchableOpacity } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import * as SecureStore from "expo-secure-store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Ionicons } from "@expo/vector-icons";
const client = new QueryClient();
const CLERK_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });
  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // useEffect(() => {
  //   if (!isLoaded) return;
  //   const inAuthGroup = segments[0] === "(authenticated)";
  //   if (isSignedIn && !inAuthGroup) {
  //     router.replace("/(authenticated)/(tabs)/home");
  //   } else if (!isSignedIn) {
  //     router.replace("/");
  //   }
  //   console.log(isSignedIn);
  // }, [isSignedIn]);

  if (!loaded || !isLoaded) {
    return <Text>Loading</Text>;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="signUp"
        options={{
          headerTitle: "",
          headerBackTitle: "",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.background },
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          headerTitle: "",
          headerBackTitle: "",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.background },
        }}
      />
      <Stack.Screen
        name="verify/[phone]"
        options={{
          headerTitle: "",
          headerBackTitle: "",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.background },
        }}
      />
      <Stack.Screen
        name="(authenticated)/(tabs)"
        options={{
          headerTitle: "",
          headerBackTitle: "",
          headerShown: false,
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.background },
        }}
      />
      <Stack.Screen
        name="(authenticated)/crypto/[id]"
        options={{ title: "", headerLargeTitle: true }}
      />
      <Stack.Screen
        name="(authenticated)/(modals)/account"
        options={{
          title: "",
          headerTransparent: true,
          presentation: "transparentModal",
          animation: "fade",
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons name="close-outline" size={34} color={"#fff"} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
};

const RootLayoutNav = () => {
  return (
    <ClerkProvider publishableKey={CLERK_KEY!} tokenCache={tokenCache}>
      <QueryClientProvider client={client}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <InitialLayout />
        </GestureHandlerRootView>
      </QueryClientProvider>
    </ClerkProvider>
  );
};
export default RootLayoutNav;

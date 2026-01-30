import CustomButton from "@/component/Ui/CustomButton";
import * as Google from "expo-auth-session/providers/google";
import Constants from "expo-constants";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useEffect } from "react";
import { Dimensions, Image, Platform, Text, View } from "react-native";
import "../global.css";

WebBrowser.maybeCompleteAuthSession();

export default function Index() {
  const router = useRouter();

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: Constants.expoConfig?.extra?.googleClientId,
    scopes: ["profile", "email"],
    responseType: "token",
    useProxy: true,
  });

  // Handle Google response
  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      console.log("Access Token:", authentication?.accessToken);
      router.replace("/(tabs)/Home");
    }
  }, [response]);

  return (
    <View
      className="justify-center flex-1 p-5 bg-white"
      style={{ paddingTop: Platform.OS === "android" ? 30 : 0 }}
    >
      <View className="flex items-center justify-center pl-10">
        <Image
          source={require("../assets/welcomeLogo.png")}
          className="h-[280px] resize-contain"
          style={{ width: Dimensions.get("screen").width * 0.85 }}
        />
      </View>

      <Text className="mb-3 text-2xl font-bold text-center text-PRIMARY">Welcome to Ai Agent Assistant</Text>

      <Text className="text-base text-center text-Gray">
        Your Ultimate AI Personal Agent to make life easier.
      </Text>

      <View className="mt-[50px]">
        <CustomButton
          title="Get Started"
          className="p-4 bg-PRIMARY rounded-xl"
          textClassName="text-base font-semibold text-center text-WHITE"
          // onPress={() => promptAsync()}
          onPress={() => router.push("/(tabs)/Home")}
        />
      </View>
    </View>
  );
}

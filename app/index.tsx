import CustomButton from "@/component/Ui/CustomButton";
import { useRouter } from "expo-router";
import { Dimensions, Image, Platform, Text, View } from "react-native";
import "../global.css";

export default function Index() {
  const router = useRouter();

  // useEffect(() => {
  //   const getData = async () => {
  //     const isLogin = true;
  //     if (isLogin) {
  //       router.replace("./home");
  //     } else {
  //       router.replace("./login");
  //     }
  //   };
  //   setTimeout(() => {
  //     getData();
  //   }, 3000);
  // }, []);

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
        Your Ultimate AI Personal Agent to make life easier. Try it Today, Completely Free!
      </Text>
      <View className="mt-[50px]">
        <CustomButton title={"Get Started"} />
      </View>
    </View>
  );
}

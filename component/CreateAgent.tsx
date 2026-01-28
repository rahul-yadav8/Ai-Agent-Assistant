import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, View } from "react-native";
import CustomButton from "./Ui/CustomButton";

export default function CreateAgent() {
  const router = useRouter();

  return (
    <View className="flex-row h-[120px] bg-PRIMARY rounded-2xl">
      <Image source={require("../assets/agentGroup.png")} className="w-[200px] h-full resize-contain" />
      <View className="p-[10px] flex-1 gap-3">
        <Text className="text-base font-bold text-WHITE">Create Your Own Agent</Text>
        <CustomButton
          title="Create Now"
          className="p-2 rounded-md bg-WHITE"
          textClassName="text-base font-bold text-center text-PRIMARY"
          onPress={() => router.push("/create-agent")}
        />
      </View>
    </View>
  );
}

import AgentData from "@/component/AgentData";
import CreateAgent from "@/component/CreateAgent";
import { useNavigation } from "expo-router";
import { Settings } from "lucide-react-native";
import React, { useEffect } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

const Home = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Text style={{ fontSize: 18, fontWeight: "bold" }}>AI Agent Assistant</Text>,
      headerLeft: () => (
        <TouchableOpacity className="flex items-center flex-row gap-2 p-[5px] ml-4 rounded-[5px] bg-PRIMARY">
          <Text className="text-base font-bold text-WHITE">Pro</Text>
          <Image source={require("../../assets/diamond.png")} className="w-5 h-5" />
        </TouchableOpacity>
      ),
      headerTitleAlign: "center",
      headerRight: () => <Settings style={{ marginRight: 15 }} />,
    });
  }, [navigation]);

  return (
    <FlatList
      data={[]}
      renderItem={null}
      ListHeaderComponent={
        <View className="flex flex-col gap-3 p-4">
          <AgentData isFeature={true} />
          <CreateAgent />
          <AgentData isFeature={false} />
        </View>
      }
    />
  );
};

export default Home;

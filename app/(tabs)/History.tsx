import { AgentContext } from "@/context/AgentContext";
import { useRouter } from "expo-router";
import React, { useContext } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

const History = () => {
  const { createdAgentData } = useContext(AgentContext);
  const router = useRouter();

  return (
    <View className="flex-1 p-5">
      {createdAgentData.length === 0 ? (
        <View className="items-center justify-center flex-1">
          <Text className="text-lg text-gray-500">No agents created yet</Text>
        </View>
      ) : (
        <FlatList
          data={createdAgentData}
          keyExtractor={(index) => index.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="mb-3"
              onPress={() =>
                router.push({
                  pathname: "/chat",
                  params: {
                    agentName: item.agentName,
                    initialText: "",
                    initialPrompt: item.initialPrompt,
                  },
                })
              }
            >
              <View className="flex-row items-center p-4 bg-white shadow-sm rounded-2xl">
                <View className="items-center justify-center w-16 h-16 bg-LIGHT_GRAY rounded-2xl">
                  <Text className="text-3xl">{item.emoji || "🤖"}</Text>
                </View>

                <View className="flex-1 ml-4">
                  <Text className="text-[18px] font-bold mb-1" numberOfLines={1}>
                    {item.agentName}
                  </Text>
                  <Text className="text-base text-gray-600" numberOfLines={2} ellipsizeMode="tail">
                    {item.initialPrompt}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default History;

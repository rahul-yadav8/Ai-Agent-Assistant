import AgentData from "@/component/AgentData";
import CreateAgent from "@/component/CreateAgent";
import { AgentContext } from "@/context/AgentContext";
import { ArrowRight } from "lucide-react-native";
import React, { useContext } from "react";
import { Text, View } from "react-native";

const Explore = () => {
  const { createdAgentData } = useContext(AgentContext);

  return (
    <View className="p-5">
      <CreateAgent />

      {/* my agents */}
      <View className="flex-col gap-1 my-4">
        <Text className="text-2xl font-bold">My Agent/Assistant</Text>
        {createdAgentData.map((item, index) => (
          <View
            key={index}
            className="flex-row items-center justify-between p-4 border border-LIGHT_GRAY bg-WHITE rounded-xl"
          >
            <View className="flex-row gap-4">
              <Text className="text-2xl">{item.emoji}</Text>
              <Text className="text-[19px] font-medium">{item.agentName}</Text>
            </View>
            <ArrowRight />
          </View>
        ))}
      </View>

      {/* feature agents */}
      <View>
        <Text className="text-2xl font-bold">Featured Agent</Text>
        <AgentData isFeature={true} />
      </View>
    </View>
  );
};

export default Explore;

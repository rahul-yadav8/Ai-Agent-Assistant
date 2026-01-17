import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface Agent {
  id: number;
  name: string;
  desc: string;
  image: string;
  initialText: string;
  prompt: string;
  type: string;
  featured: boolean;
}

interface AgentCardProps {
  agent: Agent;
}

export default function AgentCard({ agent }: AgentCardProps) {
  return (
    <View>
      <TouchableOpacity className="min-h-[180px] rounded-[15px] bg-WHITE relative overflow-hidden">
        <View className="p-4">
          <Text className="text-[20px] font-bold text-BLACK">{agent.name}</Text>
          <Text className="text-Gray mt-[2px] text-sm" numberOfLines={2}>
            {agent.desc}
          </Text>
        </View>
        <View className="absolute bottom-0 right-0">
          <Image source={agent.image} className="w-[100px] h-[100px] resize-contain" />
        </View>
      </TouchableOpacity>
    </View>
  );
}

import React from "react";
import { Image, Text, View } from "react-native";

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
    <View className="min-h-[200px] rounded-2xl bg-WHITE relative overflow-hidden">
      <View className="p-4">
        <Text className="text-[20px] font-bold">{agent.name}</Text>
        <Text className="text-Gray mt-[2px] text-sm" numberOfLines={2}>
          {agent.desc}
        </Text>
      </View>
      <View className="absolute bottom-0 right-0">
        {/* @ts-ignore */}
        <Image source={agent.image} className="w-[120px] h-[120px] resize-contain" />
      </View>
    </View>
  );
}

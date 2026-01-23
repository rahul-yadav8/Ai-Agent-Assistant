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

export default function NonFeatureAgent({ agent }: AgentCardProps) {
  return (
    <View className="min-h-[200px] rounded-2xl bg-WHITE relative overflow-hidden">
      <View className=""></View>
      <View className="p-4">
        {/* @ts-ignore */}
        <Image source={agent.image} className="w-[80px] h-[80px] resize-contain rounded-md" />
        <Text className="text-[20px] font-bold" numberOfLines={2}>
          {agent.name}
        </Text>
        <Text className="text-Gray mt-[2px] text-sm" numberOfLines={2}>
          {agent.desc}
        </Text>
      </View>
    </View>
  );
}

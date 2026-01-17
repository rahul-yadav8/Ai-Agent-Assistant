import { agents } from "@/shared/AgentList";
import React from "react";
import { FlatList, View } from "react-native";
import AgentCard from "./AgentCard";

export default function AgentData() {
  return (
    <View>
      <FlatList
        data={agents.filter((agent) => agent.featured)}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className="flex-1 p-1">
            <AgentCard agent={item} />
          </View>
        )}
      />
    </View>
  );
}

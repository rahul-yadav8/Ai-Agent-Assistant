import { agents } from "@/shared/AgentList";
import React from "react";
import { FlatList, View } from "react-native";
import AgentCard from "./AgentCard";
import NonFeatureAgent from "./NonFeatureAgent";

export default function AgentData({ isFeature }: { isFeature: boolean }) {
  const filteredAgent = agents.filter((item) => item.featured === isFeature);

  return (
    <View>
      <FlatList
        data={filteredAgent}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        columnWrapperStyle={{ gap: 10 }}
        renderItem={({ item }) => (
          <View className="flex-1">
            {isFeature ? <AgentCard agent={item} /> : <NonFeatureAgent agent={item} />}
          </View>
        )}
      />
    </View>
  );
}
